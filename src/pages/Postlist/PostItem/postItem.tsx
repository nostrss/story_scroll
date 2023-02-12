import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import parse from 'node-html-parser';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

export const TextContents = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

export default function PostItem({ postData }: any) {
  const history = useHistory();

  //@ts-ignore
  if (!postData) return;

  const imgList = parse(postData.text)
    .querySelectorAll('img')
    .map((el: any) => el.rawAttributes.src);

  const plainText = parse(postData.text).text;

  const onClickListItem = (postId: string) => {
    history.push(`/post/${postId}`);
  };

  return (
    <IonCard onClick={() => onClickListItem(postData.postId)}>
      {imgList[0] && <IonImg src={imgList[0]} alt='' />}
      {/* <img src={imgList[0]} alt='' /> */}
      {plainText && (
        <IonCardContent>
          <TextContents>{plainText}</TextContents>
        </IonCardContent>
      )}
    </IonCard>
  );
}
