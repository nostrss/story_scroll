import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import DOMPurify from 'dompurify';

interface IUseParams {
  postId: string;
}

export default function PostContainer() {
  const [isPostData, setIsPostData] = useState<DocumentData | undefined>();
  const { postId } = useParams<IUseParams>();

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(isPostData?.text),
          }}
        ></IonText>
      </IonContent>
    </IonPage>
  );
}
