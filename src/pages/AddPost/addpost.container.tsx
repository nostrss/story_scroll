import { useIonAlert } from '@ionic/react';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { firebaseDb, storage } from '../../firebase';
import AddPostUI from './addpost.presenter';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { parse } from 'node-html-parser';

function AddPostContainer() {
  const [isProgress, setIsProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const [isText, setIsText] = useState('');
  const quillRef = useRef();
  const userUid = useSelector((state: any) => state.storyScroll.authData.uid);
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const { isLogin } = useSelector((state: any) => state.storyScroll.authData);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // @ts-ignore
    const range = quillRef.current?.getEditor().getSelection()?.index;

    // @ts-ignore
    let quill = quillRef.current?.getEditor();

    input.onchange = async () => {
      if (input.files === null) return;

      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const imageId = uuidv4();

      const storageRef = ref(storage, imageId);
      const uploadTask = uploadBytesResumable(
        storageRef,
        formData.get('file') as File
      );

      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes;
          setIsProgress(progress);
          setShowLoading(true);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
        },
        async () => {
          // Handle successful uploads on complete

          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            quill?.insertEmbed(range, 'image', downloadURL);
          });
          setIsProgress(0);
          setShowLoading(false);
        }
      );
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  const onClickSave = async () => {
    if (isText === '' || isText === '<p><br></p>') {
      presentAlert({
        header: 'No Text',
        message: 'Please write something.',
        buttons: ['OK'],
      });
      return;
    }
    const postId = uuidv4();

    const textData = parse(isText).text;
    const images = parse(isText).querySelectorAll('img');
    const imageData = images.map(
      // @ts-ignore
      (image) => image.rawAttrs.match(/https?:\/\/[^\s"]+/)[0]
    );

    await setDoc(doc(firebaseDb, 'posts', postId), {
      text: isText,
      plainText: textData,
      createdAt: new Date(),
      author: userUid,
      postId: postId,
      images: imageData,
    });
    setIsText('');
    history.push(`/post/${postId}`);
  };

  useEffect(() => {
    if (!isLogin) {
      history.push('/login');
    }
  }, [isLogin, history]);

  return (
    <AddPostUI
      isProgress={isProgress}
      isText={isText}
      setIsText={setIsText}
      modules={modules}
      formats={formats}
      quillRef={quillRef}
      showLoading={showLoading}
      setShowLoading={setShowLoading}
      onClickSave={onClickSave}
    />
  );
}

export default AddPostContainer;
