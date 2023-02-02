import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonText,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { deleteDoc, doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import DOMPurify from 'dompurify';

interface IUseParams {
  postId: string;
}

export default function PostContainer() {
  const [isPostData, setIsPostData] = useState<DocumentData | undefined>();
  const { postId } = useParams<IUseParams>();
  const [present] = useIonActionSheet();
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
      setIsPostData(postData);
    };
    fetchPostData();
  }, [postId]);

  const onClickEllips = () => {
    present({
      header: 'Options',
      buttons: [
        {
          text: 'Edit',
          handler: onClickEdit,
        },
        {
          text: 'Delete',
          handler: onClickDelete,
        },
        { text: 'Cancel', role: 'cancel' },
      ],
    });
  };

  const onClickEdit = () => {
    history.push(`/post/edit/${postId}`);
  };

  const onClickDelete = async () => {
    await deleteDoc(doc(firebaseDb, 'posts', postId));
    history.push(`/home`);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
          <IonButtons slot='primary'>
            <IonButton onClick={onClickEllips}>
              <IonIcon
                slot='icon-only'
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(isPostData?.text),
          }}
        ></IonText>
      </IonContent>
    </>
  );
}
