import {
  IonContent,
  IonGrid,
  IonHeader,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseDb } from '../../firebase';
import PostItem from './PostItem/postItem';

export default function PostListContainer() {
  const [isPostList, setIsPostList] = useState<object[]>([]);
  const [, setIsLoading] = useState(false);

  const fetchPostList = async () => {
    setIsLoading(true);
    let tmpList: object[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'posts'));
    querySnapshot.forEach((doc) => {
      tmpList = [...tmpList, doc.data()];
    });
    setIsPostList(tmpList);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      await fetchPostList();
    };
    fetchPost();
  }, []);

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      fetchPostList();
      event.detail.complete();
    }, 2000);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonGrid>
          <IonRow>
            {isPostList?.map((postData: any) => (
              // @ts-ignore
              <PostItem key={uuidv4()} postData={postData} />
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
