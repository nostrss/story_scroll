import { useSelector } from 'react-redux';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

export default function MyContainer() {
  const { displayName, userEmail, isLogin } = useSelector(
    (state: any) => state.storyScroll.authData
  );

  const auth = getAuth();
  const history = useHistory();

  const onClickLogout = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLogin ? (
          <>
            <IonItem>
              <IonLabel>
                <p>UserName</p>
                <h1>{displayName}</h1>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Email</p>
                <h1>{userEmail}</h1>
              </IonLabel>
            </IonItem>
            <IonButton expand='block' type='button' onClick={onClickLogout}>
              Log out
            </IonButton>
          </>
        ) : (
          <>
            <IonButton expand='block' href='/story_scroll/signup'>
              Sign up with email
            </IonButton>
            <IonButton fill='outline' expand='block' href='/story_scroll/login'>
              Log In with email
            </IonButton>
          </>
        )}
      </IonContent>
    </>
  );
}
