import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Form from "../form/Form";
import { useUser } from "../../providers/UserProvider";

const emptyUserData = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  city: "",
  age: "",
  experience_years: "",
  role: "",
};

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleGetOneUser, handleEditUser } = useUser();

  const [formDetails, setFormDetails] = useState(emptyUserData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true);
        setError("");

        const user = await handleGetOneUser(id);

        setFormDetails({
          username: user.username ?? "",
          firstName: user.first_name ?? "",
          lastName: user.last_name ?? "",
          email: user.email ?? "",
          bio: user.profile?.bio ?? "",
          city: user.profile?.city ?? "",
          age: user.profile?.age ?? "",
          experience_years: user.profile?.experience_years ?? "",
          role: user.profile?.role ?? "",
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load user.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [id, handleGetOneUser]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormDetails((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError("");

      await handleEditUser(id, formDetails);

      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      setError("Failed to update user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 6 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit} title="Edit User">
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <TextField
            label="Username"
            name="username"
            value={formDetails.username}
            onChange={handleChange}
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
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="First name"
            name="firstName"
            value={formDetails.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Last name"
            name="lastName"
            value={formDetails.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Bio"
            name="bio"
            value={formDetails.bio}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="City"
            name="city"
            value={formDetails.city}
            onChange={handleChange}
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
            fullWidth
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Role"
            name="role"
            value={formDetails.role}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="editor">Editor</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </Button>
        </Grid>
      </Form>

      <Button
        variant="text"
        onClick={() => navigate("/admin/users")}
        sx={{ mt: 2 }}
      >
        Back to users
      </Button>
    </>
  );
}

export default EditUser;
