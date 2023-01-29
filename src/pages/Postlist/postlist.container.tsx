import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
} from '@ionic/react';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseDb } from '../../firebase';
import { useHistory } from 'react-router-dom';

export default function PostListContainer() {
  const [isPostList, setIsPostList] = useState<object[]>([]);
  const history = useHistory();

  const fetchPostList = async () => {
    console.log('fetchPostList 실행됨');
    let tmpList: object[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'posts'));
    querySnapshot.forEach((doc) => {
      tmpList = [...tmpList, doc.data()];
    });
    setIsPostList(tmpList);
  };

  useEffect(() => {
    const fetchPost = async () => {
      await fetchPostList();
    };
    fetchPost();
  }, []);

  const onClickListItem = (postId: string) => {
    history.push(`/post/${postId}`);
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      fetchPostList();
      event.detail.complete();
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {isPostList.map((post: any) => (
          <IonCard key={uuidv4()} onClick={() => onClickListItem(post.postId)}>
            <img src={post?.images[0]} alt='' />
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{post?.text}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
