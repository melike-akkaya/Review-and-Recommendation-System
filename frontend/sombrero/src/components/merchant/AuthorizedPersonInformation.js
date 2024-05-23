import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { editAuthorizedPerson } from "../../services/MerchantService";
import { Alert } from "../alert/Alert";
import { fetchCountries, useLocalStorageUser } from "../../commonMethods";

export function AuthorizedPersonInformation(authorizedPerson) {
  const [countries, setCountries] = useState([]);
  const [initialAuthorizedPerson, setInitialAuthorizedPerson] = useState(
    authorizedPerson.initialAuthorizedPerson
  );
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const user = useLocalStorageUser();
  const isEditable = initialAuthorizedPerson.id === user.id;

  useEffect(() => {
    fetchCountries(setCountries);
  }, []);

  useEffect(() => {
    if (countries.length != 0) {
      const defaultCountryIndex = countries.findIndex(
        (country) => country.label === initialAuthorizedPerson.country
      );
      setInitialAuthorizedPerson((prevState) => ({
        ...prevState,
        country:
          defaultCountryIndex !== -1
            ? countries[defaultCountryIndex].value
            : countries[0].value,
      }));
    }
  }, [countries]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    if (isValid) {
      setInitialAuthorizedPerson((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleCountryChange = (event) => {
    setInitialAuthorizedPerson((prevState) => ({
      ...prevState,
      country: event.target.value,
    }));
  };

  const handleSave = () => {
    if (
      !initialAuthorizedPerson.authorizedPersonName ||
      !initialAuthorizedPerson.authorizedPersonSurname ||
      !initialAuthorizedPerson.email
    ) {
      setOpenError(true);
      return;
    }

    editAuthorizedPerson(initialAuthorizedPerson.id, initialAuthorizedPerson)
      .then(() => {
        setOpenSuccess(true);
      })
      .catch(() => {
        setOpenError(true);
      });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Authorized Person Information"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  name="authorizedPersonName"
                  value={initialAuthorizedPerson.authorizedPersonName}
                  onChange={handleInputChange}
                  label="First name"
                  readOnly={!isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  name="authorizedPersonSurname"
                  value={initialAuthorizedPerson.authorizedPersonSurname}
                  onChange={handleInputChange}
                  label="Last name"
                  readOnly={!isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  name="email"
                  value={initialAuthorizedPerson.email}
                  onChange={handleInputChange}
                  label="Email address"
                  readOnly={!isEditable}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Country</InputLabel>
                <Select
                  value={initialAuthorizedPerson.country}
                  onChange={handleCountryChange}
                  label="Country"
                  variant="outlined"
                  readOnly={!isEditable}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {isEditable && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleSave}>
              Save details
            </Button>
          </CardActions>
        )}
      </Card>

      <Alert
        open={openSuccess}
        onClose={handleCloseSuccess}
        severity="success"
        message="Saved successfully!"
      />
      <Alert
        open={openError}
        onClose={handleCloseError}
        severity="error"
        message="Saving failed! Please make sure fields are not empty."
      />
    </form>
  );
}
