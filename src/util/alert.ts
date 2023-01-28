interface AlertParams {
  errorMessage: string;
  alertCase: string;
}

export const presentAlertData = ({ errorMessage, alertCase }: AlertParams) => {
  switch (alertCase) {
    case 'signup':
      return {
        header: 'Oops!',
        message: errorMessage,
        buttons: ['OK'],
      };
    case 'signin':
      return {
        header: 'Oops!',
        message: errorMessage,
        buttons: ['OK'],
      };
    default:
      return {
        header: 'Oops!',
        message: errorMessage,
        buttons: ['OK'],
      };
  }
};
