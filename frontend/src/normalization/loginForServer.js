const loginUserToServer = (userDetails) => {
  return {
    username: userDetails.username || userDetails.email,
    password: userDetails.password,
  };
};

export default loginUserToServer;
