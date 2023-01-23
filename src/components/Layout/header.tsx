import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { handleHeaderTitle } from '../../util/handleHeaderTitle';

export default function Header() {
  let { pathname } = useLocation();

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{handleHeaderTitle(pathname)}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
