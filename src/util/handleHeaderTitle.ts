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
    case '/addpost':
      return 'Add Post';
    default:
      return 'Home';
  }
};
