import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotify } from "layouts/Notify";

import PropTypes from 'prop-types';

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

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

import FormField from "layouts/FormField";

// Schemas for form and form feilds
import validations from "pages/finance/categories/schemas/validations";
import form from "pages/finance/categories/schemas/form";
import initialValues from "pages/finance/categories/schemas/initialValues";
import { typeOptions, colorOptions, iconOptions } from "pages/finance/categories/schemas/options";

import authService from "services/auth/authService";
import categoryService from "services/category/categoryService";

function CategoryForm({ category = null }) {

  const { values } = breakpoints;
  const isEdit = category != null;
  const categoryIdValue = !isEdit ? 0 : category.id;
  const userIdValue = authService.getUserId();
  const title = isEdit ? "Edycja kategori" : "Nowa kategoria";
  const navigate = useNavigate();
  const { showError } = useNotify();
  const { formId, formField, errors } = form;
  const { categoryId, userId, name, type, color, icon } = formField;

  const handleSubmit = (values, actions) => {
    categoryService
          .addCategory(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Utworzono użytkownika.");
            navigate("/finance/categories");
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
                {title}
              </SoftTypography>
            </SoftBox>
            </Grid>  
          </Grid>
          <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Formik
              initialValues={initialValues}
              validationSchema={validations}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                  setFieldValue(categoryId.name, categoryIdValue);
                  setFieldValue(userId.name, userIdValue);
                }, [categoryIdValue, userIdValue, setFieldValue])

              return (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ overflow: "visible" }}>
                    <SoftBox p={2} lineHeight={1}>
                      <SoftTypography variant="h6" fontWeight="medium">
                        Formularz
                      </SoftTypography>
                      <SoftTypography variant="button" fontWeight="regular" color="text">
                        Uzupełnij formularz, wypełniając poniższe pola.
                      </SoftTypography>
                      <Divider />

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <FormField
                          type={name.type}
                          label={name.label}
                          name={name.name}
                          placeholder={name.placeholder}
                          error={errors.name && touched.name}
                          success={values.name.length > 0 && !errors.name}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                        mb={1.5}
                      >
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                            Typ
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          type={type.type}
                          name={type.name}
                          placeholder={type.placeholder}
                          error={errors.type && touched.type}
                          success={values.type.length > 0 && !errors.type}
                          options={typeOptions}
                          onChange={(selectedOption) => {
                            setFieldValue(type.name, selectedOption ? selectedOption.value : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                        mb={1.5}
                      >
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                            Kolor
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          type={color.type}
                          name={color.name}
                          placeholder={color.placeholder}
                          error={errors.color && touched.color}
                          success={values.color.length > 0 && !errors.color}
                          options={colorOptions}
                          onChange={(selectedOption) => {
                            setFieldValue(color.name, selectedOption ? selectedOption.value : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                        mb={1.5}
                      >
                        <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                            Ikona
                          </SoftTypography>
                        </SoftBox>
                        <SoftSelect
                          type={icon.type}
                          name={icon.name}
                          placeholder={icon.placeholder}
                          error={errors.icon && touched.icon}
                          success={values.icon.length > 0 && !errors.icon}
                          options={iconOptions}
                          onChange={(selectedOption) => {
                            setFieldValue(icon.name, selectedOption ? selectedOption.value : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                        <SoftBox mr={1}>
                          <Link to="/finance/categories">
                            <SoftButton color="light">Anuluj</SoftButton>
                          </Link>
                        </SoftBox>
                        <SoftButton
                              disabled={isSubmitting}
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

CategoryForm.propTypes = {
  category: PropTypes.object
};
export default CategoryForm;