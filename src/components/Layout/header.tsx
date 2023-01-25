import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { handleHeaderTitle } from '../../util/handleHeaderTitle';

export default function Header() {
  const { pathname } = useLocation();

  const HIDDEN_HEADER_PATHS = ['/addpost'];

  console.log(HIDDEN_HEADER_PATHS.includes(pathname));

  return (
    <IonHeader hidden={HIDDEN_HEADER_PATHS.includes(pathname)}>
      <IonToolbar>
        <IonTitle>{handleHeaderTitle(pathname)}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
