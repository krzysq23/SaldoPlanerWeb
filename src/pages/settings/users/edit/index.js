import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNotify } from "layouts/Notify";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftButton from "components/SoftButton";

import FormField from "layouts/FormField";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

// Schemas for form and form feilds
import validations from "../schemas/validations";
import form from "../schemas/form";
import initialValues from "../schemas/initialValues";

import clientService from "services/admin/clientService";

function EditUser() {

  const { userId } = useParams();
  const { values } = breakpoints;
  const navigate = useNavigate();
  const { showError } = useNotify();
  const { formId, formField, errors } = form;
  const { id, userName, login, email, password, roles } = formField;
  const currentValidation = validations;
  const [disabledButton, setDisabledButton] = useState(false);

  const handleSubmit = (values, actions) => {
    clientService
          .editlient(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Zmodyfikowano użytkownika.");
            navigate("/settings/users");
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <SoftBox mb={3} p={1}>
              <SoftTypography
                variant={window.innerWidth < values.sm ? "h3" : "h2"}
                textTransform="none"
                fontWeight="bold"
              >
                Edycja użytkownika
              </SoftTypography>
            </SoftBox>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
            {({ values, errors, touched, isSubmitting, setValues, setFieldValue }) => {
              useEffect(() => {
                clientService
                  .getClientById(userId)
                  .then((data) => {
                    setValues({
                      id: data.id || "",
                      userName: data.userName || "",
                      login: data.login || "",
                      email: data.email || "",
                      password: "****",
                      roles: data.roles || [],
                    });
                  })
                  .catch((err) => {
                    showError(err.message);
                    setDisabledButton(true);
                  });
              }, [userId, setValues, setFieldValue]);

              return (

              <Form id={formId} autoComplete="off">
                <Card sx={{ overflow: "visible" }}>
                  <SoftBox p={2} lineHeight={1}>
                    <SoftTypography variant="h6" fontWeight="medium">
                      Edycja
                    </SoftTypography>
                    <SoftTypography variant="button" fontWeight="regular" color="text">
                      Edytuj dane użytkownika.
                    </SoftTypography>
                    <Divider />

                    <input
                      type="hidden"
                      value={userId}
                      name={id.name}
                    />
                    
                    <input
                      type="hidden"
                      name={password.name}
                    />

                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <FormField
                        type={userName.type}
                        label={userName.label}
                        name={userName.name}
                        placeholder={userName.placeholder}
                        error={errors.userName && touched.userName}
                        success={values.userName.length > 0 && !errors.userName}
                      />
                    </SoftBox>

                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <FormField
                        type={login.type}
                        label={login.label}
                        name={login.name}
                        placeholder={login.placeholder}
                        error={errors.login && touched.login}
                        success={values.login.length > 0 && !errors.login}
                      />
                    </SoftBox>

                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <FormField
                        type={email.type}
                        label={email.label}
                        name={email.name}
                        placeholder={email.placeholder}
                        error={errors.email && touched.email}
                        success={values.email.length > 0 && !errors.email}
                      />
                    </SoftBox>

                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      justifyContent="flex-end"
                      height="100%"
                    >
                      <SoftBox mb={1} ml={0.5} mt={3} lineHeight={0} display="inline-block">
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Role
                        </SoftTypography>
                      </SoftBox>
                      <SoftSelect
                        options={[
                          { value: "USER", label: "USER" },
                          { value: "ADMIN", label: "ADMIN" },
                        ]}
                        isMulti
                        name={roles.name}
                        value={(values.roles || []).map(role => ({ value: role, label: role }))}
                        onChange={(selectedOptions) =>
                          setFieldValue(
                            "roles",
                            selectedOptions.map(option => option.value)
                          )
                        }
                        placeholder={roles.placeholder}
                        error={errors.roles && touched.roles}
                        success={values.roles.length > 0 && !errors.roles}
                      />
                    </SoftBox>

                    <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                      <SoftBox mr={1}>
                        <Link to="/settings/users">
                          <SoftButton color="light">Anuluj</SoftButton>
                        </Link>
                      </SoftBox>
                      <SoftButton
                            disabled={isSubmitting || disabledButton}
                            type="submit"
                            variant="gradient"
                            color="info"
                          >
                        Zapisz
                      </SoftButton>
                    </SoftBox>
                  </SoftBox>
                </Card>
              </Form>
              );
            }}
            </Formik>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default EditUser;