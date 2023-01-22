import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/react';

// import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { ListData } from '../mokup-data/data';
// import { PackingInfiniteGrid } from '@egjs/react-infinitegrid';

const Card = ({ item }: any) => {
  return (
    <div>
      <IonCard>
        <img src={item.image} />
        <IonCardHeader>
          <IonCardTitle>Card Title</IonCardTitle>
          <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more,
          nothing less.
        </IonCardContent>
      </IonCard>
    </div>
  );
};

const Tab1: React.FC = () => {
  let data = ListData;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab fdsafs1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <PackingInfiniteGrid
          gap={5}
          onRequestAppend={() => {
            data = [...data, ...ListData];
          }}
        > */}
        {data.map((item, index) => (
          <Card key={index} item={item} />
        ))}
        {/* </PackingInfiniteGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
