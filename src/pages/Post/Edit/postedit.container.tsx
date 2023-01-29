import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { firebaseDb, storage } from '../../../firebase';
import { v4 as uuidv4 } from 'uuid';
import PostEditUI from './postedit.presenter';
import { useIonAlert } from '@ionic/react';
import { parse } from 'node-html-parser';

interface IUseParams {
  postId: string;
}

export default function PostEditContainer() {
  const { postId } = useParams<IUseParams>();
  const [isProgress, setIsProgress] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const quillRef = useRef();
  const [isText, setIsText] = useState('');
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const fetchPost = async (
    firebaseDb: any,
    firebaseColID: string,
    firebaseDocID: string
  ) => {
    const postData = await getDoc(
      doc(firebaseDb, firebaseColID, firebaseDocID)
    );
    return postData.data();
  };

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await fetchPost(firebaseDb, 'posts', postId);
      setIsText(postData?.text);
    };
    fetchPostData();
  }, [postId]);

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

  const onClickUpdate = async () => {
    if (isText === '' || isText === '<p><br></p>') {
      presentAlert({
        header: 'No Text',
        message: 'Please write something.',
        buttons: ['OK'],
      });
      return;
    }

    const textData = parse(isText).text;

    const images = parse(isText).querySelectorAll('img');
    const imageData = images.map(
      // @ts-ignore
      (image) => image.rawAttrs.match(/https?:\/\/[^\s"]+/)[0]
    );

    const updateRef = doc(firebaseDb, 'posts', postId);
    await updateDoc(updateRef, {
      text: isText,
      plainText: textData,
      images: imageData,
    });
    history.push(`/post/${postId}`);
  };

  return (
    <PostEditUI
      isProgress={isProgress}
      isText={isText}
      setIsText={setIsText}
      modules={modules}
      formats={formats}
      quillRef={quillRef}
      showLoading={showLoading}
      setShowLoading={setShowLoading}
      onClickUpdate={onClickUpdate}
    />
  );
}
