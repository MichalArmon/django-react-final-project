import { useEffect } from "react";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Form from "../form/Form";
import useForm from "../../hooks/useForm";
import EditUser from "../../models/EditUser";
import initialEditUserData from "../../initialData/initialEditUserData";
import { useUser } from "../../providers/UserProvider";

function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleGetOneUser, handleEditUser } = useUser();

  const submitEditUser = async (formData) => {
    try {
      await handleEditUser(id, formData);
      navigate("/admin/users");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const { handleChange, handleSubmit, errors, formDetails, setFormDetails } =
    useForm(initialEditUserData, EditUser, submitEditUser);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await handleGetOneUser(id);

        setFormDetails({
          username: user.username || "",
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          bio: user.profile?.bio || "",
          city: user.profile?.city || "",
          age: user.profile?.age || "",
          experience_years: user.profile?.experience_years || "",
          role: user.profile?.role || "",
        });
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    getUserDetails();
  }, [id]);

  return (
    <Form onSubmit={handleSubmit} title="Edit User">
      <Grid item xs={12} md={6}>
        <TextField
          label="Username"
          name="username"
          value={formDetails.username}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          name="firstName"
          value={formDetails.firstName}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          name="lastName"
          value={formDetails.lastName}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formDetails.email}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Bio"
          name="bio"
          value={formDetails.bio}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.bio)}
          helperText={errors.bio}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="City"
          name="city"
          value={formDetails.city}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.city)}
          helperText={errors.city}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formDetails.age}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.age)}
          helperText={errors.age}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Experience years"
          name="experience_years"
          type="number"
          value={formDetails.experience_years}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.experience_years)}
          helperText={errors.experience_years}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          label="Role"
          name="role"
          value={formDetails.role}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.role)}
          helperText={errors.role}
        >
          <MenuItem value="user">User</MenuItem>

          <MenuItem value="author">Author</MenuItem>

          <MenuItem value="editor">Editor</MenuItem>

          <MenuItem value="manager">Manager</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" fullWidth>
          Update User
        </Button>
      </Grid>
    </Form>
  );
}

export default EditUserForm;
