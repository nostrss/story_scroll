import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
import { validateEmail, validateStringLength } from '../../util/validate';
import { useHistory, useLocation } from 'react-router-dom';
import SignUpUI from './signup.presenter';
import { useIonAlert } from '@ionic/react';

export default function SignupContainer() {
  const history = useHistory();
  const { pathname } = useLocation();
  let isSignUp = pathname === '/signup';
  // const auth = getAuth();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isUserNameValid, setIsUserNameValid] = useState<boolean>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPasswordlValid, setIsPasswordValid] = useState<boolean>();

  const [presentAlert] = useIonAlert();

  const onChangeUserName = ({ detail }: { detail: { value: string } }) => {
    setUserName(detail.value);

    const value = detail.value;
    setIsUserNameValid(undefined);

    if (value === '') return;

    validateStringLength(value, 1, 20)
      ? setIsUserNameValid(true)
      : setIsUserNameValid(false);
  };

  const onChangeEmail = ({ detail }: { detail: { value: string } }) => {
    setEmail(detail.value);

    const value = detail.value;
    setIsEmailValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null
      ? setIsEmailValid(true)
      : setIsEmailValid(false);
  };

  const onChangePassword = ({ detail }: { detail: { value: string } }) => {
    setPassword(detail.value);

    const value = detail.value;
    setIsPasswordValid(undefined);

    if (value === '') return;

    validateStringLength(value, 8, 20)
      ? setIsPasswordValid(true)
      : setIsPasswordValid(false);
  };

  const onSubmitCreateUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser !== null) {
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
        setUserName('');
        setEmail('');
        setPassword('');
        history.push('/tab1');
      }
    } catch (error) {
      if (error instanceof Error) {
        presentAlert({
          header: 'Oops!',
          message: error.message,
          buttons: ['OK'],
        });
      }
    }
  };

  const onSubmitLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      history.push('/tab1');
    } catch (error) {
      if (error instanceof Error) {
        presentAlert({
          header: 'Oops!',
          message: error.message,
          buttons: ['OK'],
        });
      }
    }
  };

  const onSubmitAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      onSubmitCreateUser();
    } else {
      onSubmitLogin();
    }
  };

  return (
    <SignUpUI
      userName={userName}
      email={email}
      password={password}
      onChangeUserName={onChangeUserName}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmitCreateUser={onSubmitCreateUser}
      isUserNameValid={isUserNameValid}
      isEmailValid={isEmailValid}
      isPasswordlValid={isPasswordlValid}
      isSignUp={isSignUp}
      onSubmitAuth={onSubmitAuth}
    />
  );
}
