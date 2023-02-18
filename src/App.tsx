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
import Header from './components/Layout/header';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import MyContainer from './pages/My/my.container';
import { useDispatch } from 'react-redux';
import { getUserData } from './redux/slice';
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
            <>
              <Route exact path='/post/edit/:postId'>
                <IonPage>
                  <PostEditContainer />
                </IonPage>
              </Route>
              <Route exact path='/post/:postId'>
                <IonPage>
                  <PostContainer />
                </IonPage>
              </Route>
              <Route exact path='/login'>
                <IonPage>
                  <SignupContainer />
                </IonPage>
              </Route>
              <Route exact path='/signup'>
                <IonPage>
                  <SignupContainer />
                </IonPage>
              </Route>
              <Route exact path='/home'>
                <IonPage>
                  <PostListContainer />
                </IonPage>
              </Route>
              <Route exact path='/addpost'>
                <IonPage>
                  {/* @ts-ignore */}
                  <AddPostContainer />
                </IonPage>
              </Route>
              <Route exact path='/my'>
                <IonPage>
                  <MyContainer />
                </IonPage>
              </Route>
              <Route exact path='/'>
                <Redirect to='/home' />
              </Route>
            </>
          </IonRouterOutlet>

          <IonTabBar slot='bottom'>
            {/* <WrapperTabbar> */}
            <IonTabButton tab='home' href='/home'>
              <IonIcon icon={homeOutline} />
            </IonTabButton>
            <IonTabButton tab='addpost' href='/addpost'>
              <IonIcon icon={addCircleOutline} />
            </IonTabButton>
            <IonTabButton tab='my' href='/my'>
              <IonIcon icon={personCircleOutline} />
            </IonTabButton>
            {/* </WrapperTabbar> */}
          </IonTabBar>
          {/* <TabBar /> */}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}
export default App;
