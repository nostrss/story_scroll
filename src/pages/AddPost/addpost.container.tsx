import { useIonAlert } from '@ionic/react';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { firebaseDb, storage } from '../../firebase';
import AddPostUI from './addpost.presenter';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

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
            quill?.insertEmbed(range.index, 'image', downloadURL);
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

  /**
   * @description 게시글 저장 함수
   * @returns
   */

  const onClickSave = async () => {
    /**
     * @description 게시글이 비어있는지 확인
     */
    if (isText === '' || isText === '<p><br></p>') {
      presentAlert({
        header: 'No Text',
        message: 'Please write something.',
        buttons: ['OK'],
      });
      return;
    }

    const postId = uuidv4();

    await setDoc(doc(firebaseDb, 'posts', postId), {
      text: isText, // 게시글 원본
      createdAt: new Date(), // 게시글 작성 시간
      author: userUid, // 게시글 작성자 uid
      postId: postId, // 게시글 id
    });
    setIsText('');
    history.push(`/post/${postId}`);
  };

  useEffect(() => {
    if (!isLogin) {
      presentAlert({
        header: 'Please Login',
        message: 'Move to Login Page.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              history.push('/login');
            },
          },
        ],
      });
      return;
    }
  }, []);

  return (
    <>
      {isLogin && (
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
      )}
    </>
  );
}

export default AddPostContainer;
