import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
import JoinPresenter from './join.presenter';

export default function JoinContainer() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isUserNameValid, setIsUserNameValid] = useState<boolean>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>();
  const [isPasswordlValid, setIsPasswordValid] = useState<boolean>();

  const onChangeUserName = ({ detail }: { detail: { value: string } }) => {
    setUserName(detail.value);

    const value = detail.value;
    setIsUserNameValid(undefined);

    if (value === '') return;

    validateStringLength(value, 0, 20)
      ? setIsUserNameValid(true)
      : setIsUserNameValid(false);
  };

  /**
   * email 유효성 검사 함수
   * @param email
   * @returns
   */

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
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

  const validateStringLength = (
    inputString: string,
    min: number,
    max: number
  ) => {
    return inputString.length > min && inputString.length < max;
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

  const onSubmitCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    }
  };

  return (
    <JoinPresenter
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
    />
  );
}
