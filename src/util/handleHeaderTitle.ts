export const handleHeaderTitle = (pathname: string) => {
  switch (pathname) {
    case '/tab1':
      return 'Home';
    case '/tab2':
      return 'Write';
    case '/tab3':
      return 'My';
    case '/join':
      return 'Join';
    default:
      return 'Home';
  }
};
