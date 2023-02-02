import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
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
import styled from '@emotion/styled';

export const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
`;

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

  // useIonViewWillEnter(() => {
  //   const fetchPost = async () => {
  //     await fetchPostList();
  //   };
  //   fetchPost();
  // });

  const onClickListItem = (postId: string) => {
    history.push(`/post/${postId}`);
  };

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
        {isPostList.map((post: any) => (
          <IonCard key={uuidv4()} onClick={() => onClickListItem(post.postId)}>
            <CardImage src={post?.images[0]} alt='' />
            {/* <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader> */}
            <IonCardContent>{post?.plainText}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </>
  );
}
