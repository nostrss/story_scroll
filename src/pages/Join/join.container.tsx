import { useState } from 'react';
import JoinPresenter from './join.presenter';

export default function JoinContainer() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // detail type

  const onChangeUserName = ({ detail }: { detail: { value: string } }) => {
    setUserName(detail.value);
  };

  const onChangeEmail = ({ detail }: { detail: { value: string } }) => {
    setEmail(detail.value);
  };

  const onChangePassword = ({ detail }: { detail: { value: string } }) => {
    setPassword(detail.value);
  };

  const onSubmitJoinData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <JoinPresenter
      userName={userName}
      email={email}
      password={password}
      onChangeUserName={onChangeUserName}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      onSubmitJoinData={onSubmitJoinData}
    />
  );
}
