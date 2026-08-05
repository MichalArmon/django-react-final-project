const userToServer = (userDetails) => {
  const email = userDetails.email.trim().toLowerCase();
  return {
    username: email,
    password: userDetails.password,
    email: email,
    first_name: userDetails.firstName,
    last_name: userDetails.lastName,
    profile: {
      bio: userDetails.bio,
      city: userDetails.city,
      age: Number(userDetails.age),
      experience_years: Number(userDetails.experience_years),
      role: userDetails.role,
    },
  };
};

export default userToServer;
