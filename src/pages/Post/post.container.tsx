import { useIonActionSheet } from '@ionic/react';
import { deleteDoc, doc, DocumentData, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { firebaseDb } from '../../firebase';
import parse from 'node-html-parser';
import PostUI from './post.presenter';

interface IUseParams {
  postId: string;
}

export default function PostContainer() {
  /**
   * post data 원본
   */
  const [isPostData, setIsPostData] = useState<DocumentData | undefined>();
  /**
   * scroll data
   */
  const [scrollData, setScrollData] = useState<any>([]);
  const [isSegment, setIsSegment] = useState<string>('scroll');
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

  const onClickSegment = (event: any) => {
    setIsSegment(event.target.value);
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
      //@ts-ignore
      const img = parse(el)
        .querySelector('img')
        ?.rawAttrs.match(/https?:\/\/[^\s"]+/)[0];
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
    <PostUI
      onClickEllips={onClickEllips}
      isSegment={isSegment}
      onClickSegment={onClickSegment}
      isPostData={isPostData}
      scrollData={scrollData}
    />
  );
}
