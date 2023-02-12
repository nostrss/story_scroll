import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
} from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import DOMPurify from 'dompurify';
import ScrollPost from './ScrollPost/scrollPost';

export default function PostUI({
  onClickEllips,
  isSegment,
  onClickSegment,
  isPostData,
  scrollData,
}: any) {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
          <IonSegment value={isSegment} onIonChange={onClickSegment}>
            <IonSegmentButton value='scroll'>Scroll</IonSegmentButton>
            <IonSegmentButton value='simple'>Simple</IonSegmentButton>
          </IonSegment>
          <IonButtons slot='primary'>
            <IonButton onClick={onClickEllips}>
              <IonIcon
                slot='icon-only'
                ios={ellipsisHorizontal}
                md={ellipsisVertical}
              ></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* <IonList>
        <IonItem>
          <IonLabel>Default Toggle</IonLabel>
          <IonToggle
            slot='end'
            checked={isToggle}
            onIonChange={onClickToggle}
          ></IonToggle>
        </IonItem>
      </IonList> */}
      <IonContent>
        {isSegment === 'scroll' ? (
          <ScrollPost scrollData={scrollData} />
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
