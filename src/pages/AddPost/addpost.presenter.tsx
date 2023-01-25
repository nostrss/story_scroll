import {
  IonContent,
  IonHeader,
  IonPage,
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

export default function AddPostUI({
  isProgress,
  isText,
  setIsText,
  modules,
  formats,
  quillRef,
  showLoading,
  onClickSave,
}: any) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
          <IonTitle>Add Post</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={onClickSave}>Save</IonButton>
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
          theme='snow'
          value={isText}
          onChange={setIsText}
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
      </IonContent>
    </IonPage>
  );
}
