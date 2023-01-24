import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useMemo, useRef, useState } from 'react';
import { storage } from '../../firebase';
import AddPostUI from './addpost.presenter';

export default function AddPostContainer() {
  const [attachment, setAttachment] = useState('');
  const [file, setFile] = useState<File>();
  const [isProgress, setIsProgress] = useState(0);
  const [isFileUrl, setIsFileUrl] = useState('');
  const [isText, setIsText] = useState('');
  const quillRef = useRef();
  let attachmentUrl = '';

  const onFileChange = (event: any) => {
    const {
      target: { files },
    } = event;
    const formData = new FormData();
    formData.append('file', files[0]);
    setFile(formData.get('file') as File);

    const reader = new FileReader();
    reader.onloadend = (finishedEvent: any) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(formData.get('file') as File);
  };

  const onClickUpload = async () => {
    if (file) {
      const storageRef = ref(storage, file.name);
      // await uploadBytes(storageRef, file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setIsProgress(progress);
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
        },
        async () => {
          // Handle successful uploads on complete
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsFileUrl(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // how to fix getEidtor type error
    // @ts-ignore
    const range = quillRef.current?.getEditor().getSelection()?.index;

    // @ts-ignore
    let quill = quillRef.current?.getEditor();

    input.onchange = () => {
      if (input.files === null) return;

      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      setFile(formData.get('file') as File);

      const reader = new FileReader();
      reader.onloadend = (finishedEvent: any) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
        attachmentUrl = result;
        quill?.insertEmbed(range, 'image', attachmentUrl);
      };
      reader.readAsDataURL(formData.get('file') as File);
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

  return (
    <AddPostUI
      attachment={attachment}
      isProgress={isProgress}
      onFileChange={onFileChange}
      onClickUpload={onClickUpload}
      isText={isText}
      setIsText={setIsText}
      modules={modules}
      formats={formats}
      quillRef={quillRef}
    />
  );
}
