import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firebaseDb } from '../../firebase';

export default function PostListContainer() {
  const [isPostList, setIsPostList] = useState<object[]>([]);

  const fetchPostList = async () => {
    let tmpList: object[] = [];
    const querySnapshot = await getDocs(collection(firebaseDb, 'posts'));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
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

  console.log(isPostList);

  return (
    <div>
      {isPostList.map((post: any) => (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{post?.text}</IonCardContent>
        </IonCard>
      ))}
    </div>
  );
}
