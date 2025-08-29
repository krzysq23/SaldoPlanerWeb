import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

import FormField from "layouts/FormField";
import FormSelect from "layouts/FormSelect";

// Schemas for form and form feilds
import validations from "pages/finance/categories/schemas/validations";
import form from "pages/finance/categories/schemas/form";
import { typeOptions, iconOptions } from "pages/finance/categories/schemas/options";

import authService from "services/auth/authService";
import categoryService from "services/category/categoryService";

function CategoryForm() {

  const location = useLocation();
  const category = location.state?.category ?? null;
  const isEdit = category != null;
  
  const categoryIdValue = !isEdit ? 0 : category.id;
  const userIdValue = authService.getUserId();
  const title = isEdit ? "Edycja kategori" : "Nowa kategoria";
  const navigate = useNavigate();
  const { showError } = useNotify();
  const { formId, formField, errors } = form;
  const { categoryId, userId, name, type, color, icon } = formField;

  const initialValues = {
    id: category?.id || 0,
    userId: userIdValue,
    categoryId: categoryIdValue,
    name: category?.name || "",
    type: category?.type || "",
    color: category?.color || "#17c1e8",
    icon: category?.icon || "",
  };

  const handleSubmit = (values, actions) => {
    if(isEdit) {
      categoryService
          .editCategory(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Zaktualizowano kategorię");
            navigate("/finance/categories");
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    } else {
      categoryService
          .addCategory(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Dodano kategorię.");
            navigate("/finance/categories");
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={9} justifyContent="center">
        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card sx={{ overflow: "visible" }}>
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={validations}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (

                  <Form id={formId} autoComplete="off">
                    <SoftBox p={2} lineHeight={1}>
                      <SoftTypography variant="h6" fontWeight="medium">
                        {title}
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
                      >
                        <FormSelect
                          type={type.type}
                          label={type.label}
                          name={type.name}
                          placeholder={type.placeholder}
                          error={errors.type && touched.type}
                          success={values.type.length > 0 && !errors.type}
                          options={typeOptions}
                          value={typeOptions.find(opt => opt.value === values.type) || null}
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
                      >
                        <FormField
                          type={color.type}
                          label={color.label}
                          name={color.name}
                          placeholder={color.placeholder}
                          error={errors.color && touched.color}
                          success={values.color.length > 0 && !errors.color}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <FormSelect
                          type={icon.type}
                          label={icon.label}
                          name={icon.name}
                          placeholder={icon.placeholder}
                          error={errors.icon && touched.icon}
                          success={values.icon.length > 0 && !errors.icon}
                          options={iconOptions}
                          value={iconOptions.find(opt => opt.value === values.icon) || null}
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
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
      );
}

export default CategoryForm;