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
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

import FormField from "layouts/FormField";
import FormSelect from "layouts/FormSelect";
import FormDatePicker from "layouts/FormDatePicker";

// Schemas for form and form feilds
import validations from "pages/finance/budgets/schemas/validations";
import form from "pages/finance/budgets/schemas/form";
import { periodTypes } from "pages/finance/budgets/schemas/options";

import authService from "services/auth/authService";
import budgetService from "services/budget/budgetService";
import categoryStore from "services/category/categoryStore";

function BudgetForm() {

  const location = useLocation();
  const budget = location.state?.budget ?? null;
  const isEdit = budget != null;
  
  const userIdValue = authService.getUserId();
  const title = isEdit ? "Edycja budżetu" : "Nowy budżet";
  const navigate = useNavigate();
  const { showError } = useNotify();
  const { formId, formField, errors } = form;
  const { budgetId, categoryId, userId, amountLimit, periodType, startDate, endDate } = formField;

  const categoryOptions = categoryStore.getCategories().map((category) => ( 
    { value: category.id, label: category.name }
  ))

  console.log("periodTypes: ", periodTypes)
  console.log("periodTypes[0]: ", periodTypes[0])

  const initialValues = {
    id: budget?.id || 0,
    userId: userIdValue,
    categoryId: budget?.categoryId || "",
    amountLimit: budget?.amountLimit || "",
    periodType: budget?.periodTypes || "",
    startDate: budget?.date || new Date().toISOString().split("T")[0],
    endDate: budget?.date || new Date().toISOString().split("T")[0]
  };

  const handleSubmit = (values, actions) => {
    if(isEdit) {
      budgetService
          .editBudget(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Zaktualizowano budżet");
            navigate("/finance/budgets");
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    } else {
      budgetService
          .addBudget(values)
          .then((data) => {
            localStorage.setItem("APP_NOTIFY_MESSAGE_SUCCESS", "Dodano transakcję.");
            navigate("/finance/budgets");
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
                        <FormSelect
                          type={categoryId.type}
                          label={categoryId.label}
                          name={categoryId.name}
                          placeholder={categoryId.placeholder}
                          error={errors.categoryId && touched.categoryId}
                          options={categoryOptions}
                          value={categoryOptions.find(opt => opt.value === values.categoryId) || null}
                          onChange={(selectedOption) => {
                            setFieldValue(categoryId.name, selectedOption ? selectedOption.value : "");
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
                          type={amountLimit.type}
                          label={amountLimit.label}
                          name={amountLimit.name}
                          placeholder={amountLimit.placeholder}
                          error={errors.amountLimit && touched.amountLimit}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <FormSelect
                          type={periodType.type}
                          label={periodType.label}
                          name={periodType.name}
                          placeholder={periodType.placeholder}
                          error={errors.periodType && touched.periodType}
                          options={periodTypes}
                          value={periodTypes.find(opt => opt.value === values.periodType) || null}
                          onChange={(selectedOption) => {
                            setFieldValue(periodType.name, selectedOption ? selectedOption.value : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <FormDatePicker
                          label={startDate.label}
                          name={startDate.name}
                          input={{ placeholder: startDate.placeholder }}
                          error={errors.startDate && touched.startDate}
                          onChange={(newDate) => {
                            setFieldValue(startDate.name, newDate ? newDate[0].toISOString().split("T")[0] : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        height="100%"
                      >
                        <FormDatePicker
                          label={endDate.label}
                          name={endDate.name}
                          input={{ placeholder: endDate.placeholder }}
                          error={errors.endDate && touched.endDate}
                          onChange={(newDate) => {
                            setFieldValue(endDate.name, newDate ? newDate[0].toISOString().split("T")[0] : "");
                          }}
                        />
                      </SoftBox>

                      <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                        <SoftBox mr={1}>
                          <Link to="/finance/budgets">
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

export default BudgetForm;