import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonLoading,
  IonButtons,
  IonButton,
  IonBackButton,
} from '@ionic/react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostEditUI({
  isProgress,
  isText,
  setIsText,
  modules,
  formats,
  quillRef,
  showLoading,
  onClickUpdate,
}: any) {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
          <IonTitle>Edit</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={onClickUpdate}>Update</IonButton>
          </IonButtons>
        </IonToolbar>
        {isProgress > 0 && <IonProgressBar value={isProgress} />}
      </IonHeader>
      <IonContent>
        <IonLoading
          isOpen={showLoading}
          message={'Uploading...'}
          duration={5000}
        />
        <ReactQuill
          style={{ height: '100%' }}
          theme='snow'
          value={isText}
          // defaultValue={isText}
          onChange={setIsText}
          modules={modules}
          formats={formats}
          ref={quillRef}
          placeholder='Write something...'
        />
      </IonContent>
    </>
  );
}
