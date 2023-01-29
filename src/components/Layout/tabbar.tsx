import { IonIcon, IonTabBar, IonTabButton } from '@ionic/react';
import {
  addCircleOutline,
  homeOutline,
  personCircleOutline,
} from 'ionicons/icons';

export default function TabBar() {
  return (
    <IonTabBar slot='bottom'>
      <IonTabButton tab='home' href='/home'>
        <IonIcon icon={homeOutline} />
        {/* <IonLabel>Home</IonLabel> */}
      </IonTabButton>
      <IonTabButton tab='addpost' href='/addpost'>
        <IonIcon icon={addCircleOutline} />
        {/* <IonLabel>Add</IonLabel> */}
      </IonTabButton>
      <IonTabButton tab='my' href='/my'>
        <IonIcon icon={personCircleOutline} />
        {/* <IonLabel>My</IonLabel> */}
      </IonTabButton>
    </IonTabBar>
  );
}
