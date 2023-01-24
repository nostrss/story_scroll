export const handleHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case '/tab1':
      return 'Home';
    case '/tab2':
      return 'Write';
    case '/my/:userId':
      return 'My';
    case '/signup':
      return 'Sign Up';
    case '/login':
      return 'Log In';
    default:
      return 'Home';
  }
};
