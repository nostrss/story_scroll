export const handleHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case '/my':
      return 'My';
    case '/signup':
      return 'Sign Up';
    case '/login':
      return 'Log In';
    case '/addpost':
      return 'Add Post';
    case 'home':
      return 'Home';
    default:
      return 'Home';
  }
};
