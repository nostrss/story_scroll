import {
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddPostUI({
  attachment,
  isProgress,
  onFileChange,
  onClickUpload,
  isText,
  setIsText,
  modules,
  formats,
  quillRef,
}: any) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <label htmlFor='upload'>업로드</label>
          <input
            id={'upload'}
            type='file'
            accept='image/*'
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          {attachment && (
            <div>
              <img src={attachment} width='50px' height='50px' alt='' />
              {/* <button onClick={onClearAttachment}>Clear</button> */}
            </div>
          )}
        </IonItem>
        <button onClick={onClickUpload}>Upload</button>
        {isProgress > 0 && isProgress}
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
