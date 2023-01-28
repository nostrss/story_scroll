import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isPostList.map((post: any) => (
          <IonCard key={uuidv4()} onClick={() => onClickListItem(post.postId)}>
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
