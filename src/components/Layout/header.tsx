import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { handleHeaderTitle } from '../../util/handleHeaderTitle';

export default function Header() {
  const { pathname } = useLocation();
  const HIDDEN_HEADER_PATHS = ['/addpost', '/post', '/edit'];

  const isHidden = () => {
    const result =
      HIDDEN_HEADER_PATHS.filter((path) => pathname.includes(path)).length > 0;
    return result;
  };

  return (
    <IonHeader hidden={isHidden()}>
      <IonToolbar>
        <IonTitle>{handleHeaderTitle(pathname)}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
