import { IonCard, IonCardContent, IonCol, IonImg } from '@ionic/react';
import parse from 'node-html-parser';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

export const TextContents = styled.p`
  width: 100%;
  height: 42px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

export const Image = styled(IonImg)`
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center center;
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
    <IonCol size='12' sizeXl='2' sizeLg='3' sizeMd='4' sizeSm='6' sizeXs='12'>
      <IonCard onClick={() => onClickListItem(postData.postId)}>
        {imgList[0] && <Image src={imgList[0]} alt='' />}
        {/* <img src={imgList[0]} alt='' /> */}
        {plainText && (
          <IonCardContent>
            <TextContents>{plainText}</TextContents>
          </IonCardContent>
        )}
      </IonCard>
    </IonCol>
  );
}
