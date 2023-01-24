import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonToast,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  addCircleOutline,
  personCircleOutline,
  homeOutline,
} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
// import JoinContainer from './pages/Signup/signup.container';
import Header from './components/Layout/header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import MyContainer from './pages/My/my.container';
import { useDispatch } from 'react-redux';
import { getUserData } from './redux/slice';
// import LoginContainer from './pages/Login/login.container';
import SignupContainer from './pages/Signup/signup.container';
setupIonicReact();

function App() {
  const auth = getAuth();
  const [present] = useIonToast();
  const dispatch = useDispatch();

  const presentToast = (message: string) => {
    present({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'secondary',
    });
  };

  useEffect(() => {
    const onAuthChange = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const userData = {
            uid: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
          };
          dispatch(getUserData(userData));
          presentToast(`Welcome! ${user.displayName}`);
        } else {
          // User is signed out
          const userData = {
            uid: '',
            userEmail: '',
            displayName: '',
          };
          dispatch(getUserData(userData));
        }
      });
    };
    onAuthChange();
  }, []);

  return (
    <IonApp>
      <IonReactRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/login'>
              <SignupContainer />
            </Route>
            <Route exact path='/signup'>
              <SignupContainer />
            </Route>
            <Route exact path='/tab1'>
              <Tab1 />
            </Route>
            <Route exact path='/tab2'>
              <Tab2 />
            </Route>
            <Route path='/my/:userId'>
              <MyContainer />
            </Route>
            <Route exact path='/'>
              <Redirect to='/tab1' />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='tab1' href='/tab1'>
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab='tab2' href='/tab2'>
              <IonIcon icon={addCircleOutline} />
              <IonLabel>Write</IonLabel>
            </IonTabButton>
            <IonTabButton tab='my' href='/my/:userId'>
              <IonIcon icon={personCircleOutline} />
              <IonLabel>My</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
