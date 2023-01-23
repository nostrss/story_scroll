import styled from '@emotion/styled';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
} from '@ionic/react';

const CustomBtn = styled(IonButton)`
  width: 100%;
`;

export default function JoinPresenter({
  userName,
  email,
  password,
  onChangeUserName,
  onChangeEmail,
  onChangePassword,
  onSubmitJoinData,
}: any) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form action='' onSubmit={onSubmitJoinData}>
          <IonList>
            <IonItem>
              <IonLabel>Username : </IonLabel>
              <IonInput
                onIonChange={onChangeUserName}
                placeholder='Username'
                type='text'
                value={userName}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Email : </IonLabel>
              <IonInput
                onIonChange={onChangeEmail}
                placeholder='Email'
                type='email'
                value={email}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Password : </IonLabel>
              <IonInput
                onIonChange={onChangePassword}
                placeholder='Password'
                type='password'
                value={password}
              />
            </IonItem>
          </IonList>
          <CustomBtn type='submit'>Join</CustomBtn>
        </form>
      </IonContent>
    </IonPage>
  );
}
