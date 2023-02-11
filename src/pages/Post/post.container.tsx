import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonActionSheet,
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import { deleteDoc, doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import DOMPurify from 'dompurify';
import parse from 'node-html-parser';

interface IUseParams {
  postId: string;
}

export default function PostContainer() {
  const [isPostData, setIsPostData] = useState<DocumentData | undefined>();
  const [scrollData, setScrollData] = useState<any>([]);
  const [isToggle, setIsToggle] = useState<boolean>(true);
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

  const onClickToggle = () => {
    setIsToggle(!isToggle);
  };

  /**
   * data parsing 하기
   * [{
   * img : 'url'
   * text : [text1, text2, text3]
   * },....]
   *
   */

  const parsingPostData = (postData: DocumentData | undefined) => {
    if (!postData) return;
    const markingImg = postData.replaceAll(/<img[^>]*>/g, '😍$&');

    const pageData = markingImg.split('😍');
    const data: any = [];

    pageData.forEach((el: string) => {
      const text = parse(el).text;
      const img = parse(el).querySelector('img')?.rawAttrs;
      (text || img) && data.push({ text, img });
    });

    setScrollData(data);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      const postData = await fetchPost(firebaseDb, 'posts', postId);
      setIsPostData(postData);
    };
    fetchPostData();
  }, [postId]);

  useEffect(() => {
    parsingPostData(isPostData?.text);
  }, [isPostData]);

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
      <IonList>
        <IonItem>
          <IonLabel>Default Toggle</IonLabel>
          <IonToggle
            slot='end'
            checked={isToggle}
            onIonChange={onClickToggle}
          ></IonToggle>
        </IonItem>
      </IonList>
      <IonContent>
        {isToggle ? (
          <IonText>토글 On</IonText>
        ) : (
          <IonText
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(isPostData?.text),
            }}
          ></IonText>
        )}
      </IonContent>
    </>
  );
}
