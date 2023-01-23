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
  IonNote,
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
  onSubmitCreateUser,
  isUserNameValid,
  isEmailValid,
  isPasswordlValid,
}: any) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form action='' onSubmit={onSubmitCreateUser}>
          <IonList>
            <IonItem
              className={`${isUserNameValid && 'ion-valid'} ${
                isUserNameValid === false && 'ion-invalid'
              }`}
            >
              <IonLabel>Username : </IonLabel>
              <IonInput
                onIonChange={onChangeUserName}
                placeholder='Max 20 characters'
                type='text'
                value={userName}
                maxlength={20}
                required
              />
              <IonNote slot='error'>Max 20 characters</IonNote>
            </IonItem>
            <IonItem
              className={`${isEmailValid && 'ion-valid'} ${
                isEmailValid === false && 'ion-invalid'
              }`}
            >
              <IonLabel>Email : </IonLabel>
              <IonInput
                onIonChange={onChangeEmail}
                placeholder='Enter a valid email'
                type='email'
                value={email}
                required
              />
              <IonNote slot='error'>Invalid email</IonNote>
            </IonItem>
            <IonItem
              className={`${isPasswordlValid && 'ion-valid'} ${
                isPasswordlValid === false && 'ion-invalid'
              }`}
            >
              <IonLabel>Password : </IonLabel>
              <IonInput
                onIonChange={onChangePassword}
                placeholder='Min 8 characters, max 20 characters'
                type='password'
                value={password}
                maxlength={20}
                required
              />
              <IonNote slot='error'>
                Min 8 characters, max 20 characters
              </IonNote>
            </IonItem>
          </IonList>
          <CustomBtn
            type='submit'
            disabled={!(isUserNameValid && isEmailValid && isPasswordlValid)}
          >
            Join
          </CustomBtn>
        </form>
      </IonContent>
    </IonPage>
  );
}
