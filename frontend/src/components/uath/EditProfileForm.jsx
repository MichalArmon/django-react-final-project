import { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import useForm from "../../hooks/useForm";
import EditProfile from "../../models/EditProfile";
import initialEditProfileData from "../../initialData/initialEditProfileData";
import { useUser } from "../../providers/UserProvider";

function EditProfileForm() {
  const navigate = useNavigate();

  const { handleGetMyProfile, handleEditMyProfile } = useUser();

  const submitEditProfile = async (formData) => {
    try {
      await handleEditMyProfile(formData);
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    formDetails,
    setFormDetails,
  } = useForm(initialEditProfileData, EditProfile, submitEditProfile);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUser = await handleGetMyProfile();

        setFormDetails({
          firstName: currentUser.first_name || "",
          lastName: currentUser.last_name || "",
          email: currentUser.email || "",
          bio: currentUser.profile?.bio || "",
          city: currentUser.profile?.city || "",
          age: currentUser.profile?.age || "",
          experience_years: currentUser.profile?.experience_years || "",
          role: currentUser.profile?.role || "",
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    loadProfile();
  }, []);

  return (
    <Form
      title="Edit Profile"
      onSubmit={handleSubmit}
      onReset={handleReset}
      submitText="Update Profile"
      to="/"
    >
      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          name="firstName"
          value={formDetails.firstName}
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          name="lastName"
          value={formDetails.lastName}
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formDetails.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Bio"
          name="bio"
          value={formDetails.bio}
          onChange={handleChange}
          error={Boolean(errors.bio)}
          helperText={errors.bio}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="City"
          name="city"
          value={formDetails.city}
          onChange={handleChange}
          error={Boolean(errors.city)}
          helperText={errors.city}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formDetails.age}
          onChange={handleChange}
          error={Boolean(errors.age)}
          helperText={errors.age}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Experience years"
          name="experience_years"
          type="number"
          value={formDetails.experience_years}
          onChange={handleChange}
          error={Boolean(errors.experience_years)}
          helperText={errors.experience_years}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Role"
          name="role"
          value={formDetails.role}
          disabled
          helperText="Only an administrator can change your role"
          fullWidth
        />
      </Grid>
    </Form>
  );
}

export default EditProfileForm;
