import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  addCircleOutline,
  personCircleOutline,
  homeOutline,
} from 'ionicons/icons';
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
import AddPostContainer from './pages/AddPost/addpost.container';
import PostListContainer from './pages/Postlist/postlist.container';
import PostContainer from './pages/Post/post.container';
import PostEditContainer from './pages/Post/Edit/postedit.container';
setupIonicReact();

function App() {
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const onAuthChange = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
          };
          dispatch(getUserData(userData));
        } else {
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
  }, [auth, dispatch]);

  return (
    <IonApp>
      <IonReactRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <IonTabs>
          <IonRouterOutlet>
            <IonPage>
              <Route exact path='/post/edit/:postId'>
                <PostEditContainer />
              </Route>
              <Route exact path='/post/:postId'>
                <PostContainer />
              </Route>
              <Route exact path='/login'>
                <SignupContainer />
              </Route>
              <Route exact path='/signup'>
                <SignupContainer />
              </Route>
              <Route exact path='/home'>
                <PostListContainer />
              </Route>
              <Route exact path='/addpost'>
                <AddPostContainer />
              </Route>
              <Route exact path='/my'>
                <MyContainer />
              </Route>
              <Route exact path='/'>
                <Redirect to='/home' />
              </Route>
            </IonPage>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/home'>
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab='addpost' href='/addpost'>
              <IonIcon icon={addCircleOutline} />
            </IonTabButton>
            <IonTabButton tab='my' href='/my'>
              <IonIcon icon={personCircleOutline} />
            </IonTabButton>
          </IonTabBar>
          {/* <TabBar /> */}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
