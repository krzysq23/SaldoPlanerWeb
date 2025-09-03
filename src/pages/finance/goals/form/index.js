import { useNotify } from "layouts/Notify";
import PropTypes from 'prop-types';

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox/index";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";


import FormField from "layouts/FormField";
import FormSelect from "layouts/FormSelect";
import FormDatePicker from "layouts/FormDatePicker";

// Schemas for form and form feilds
import validations from "pages/finance/goals/schemas/validations";
import form from "pages/finance/goals/schemas/form";

import authService from "services/auth/authService";
import financialGoalService from "services/financialGoal/financialGoalService";
import categoryStore from "services/category/categoryStore";

function FinancialGoalForm({ financialGoal, onClose, onSave }) {

  const isEdit = financialGoal != null;
  const userIdValue = authService.getUserId();
  const title = isEdit ? "Edycja celu finansowego" : "Nowy cel finansowy";
  const { showSuccess, showError } = useNotify();
  const { formId, formField, errors } = form;
  const { categoryId, userId, name, targetAmount, savedAmount, deadline } = formField;

  const categoryOptions = categoryStore.getCategories().map((category) => ( 
    { value: category.id, label: category.name }
  ))

  const initialValues = {
    id: financialGoal?.id || 0,
    userId: userIdValue,
    categoryId: financialGoal?.categoryId || categoryOptions[0].value,
    name: financialGoal?.name || "",
    targetAmount: financialGoal?.targetAmount || "",
    savedAmount: financialGoal?.savedAmount || "",
    deadline: financialGoal?.deadline || new Date().toISOString().split("T")[0]
  };

  const handleSubmit = (values, actions) => {
    if(isEdit) {
      financialGoalService
          .editFinancialGoal(values)
          .then((data) => {
            showSuccess("Zaktualizowano cel docelowy");
            onSave();
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    } else {
      financialGoalService
          .addFinancialGoal(values)
          .then((data) => {
            showSuccess("Dodano cel docelowy.");
            onSave();
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    }
  };

  return (
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
                  type={categoryId.type}
                  label={categoryId.label}
                  name={categoryId.name}
                  placeholder={categoryId.placeholder}
                  error={errors.categoryId && touched.categoryId}
                  success={values.categoryId.length > 0 && !errors.categoryId}
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
                  type={targetAmount.type}
                  label={targetAmount.label}
                  name={targetAmount.name}
                  placeholder={targetAmount.placeholder}
                  error={errors.targetAmount && touched.targetAmount}
                  success={values.targetAmount.length > 0 && !errors.targetAmount}
                />
              </SoftBox>

              <SoftBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
              >
                <FormField
                  type={savedAmount.type}
                  label={savedAmount.label}
                  name={savedAmount.name}
                  placeholder={savedAmount.placeholder}
                  error={errors.savedAmount && touched.savedAmount}
                  success={values.savedAmount.length > 0 && !errors.savedAmount}
                />
              </SoftBox>

              <SoftBox
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                height="100%"
              >
                <FormDatePicker
                  label={deadline.label}
                  name={deadline.name}
                  input={{ placeholder: deadline.placeholder }}
                  error={errors.deadline && touched.deadline}
                  success={values.deadline.length > 0 && !errors.deadline}
                  onChange={(newDate) => {
                    setFieldValue(deadline.name, newDate ? newDate[0].toISOString().split("T")[0] : "");
                  }}
                />
              </SoftBox>

              <SoftBox display="flex" justifyContent="flex-end" mt={3}>
                <SoftBox mr={1}>
                  <SoftButton color="light" onClick={onClose}>Anuluj</SoftButton>
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
      );
}

FinancialGoalForm.propTypes = {
  financialGoal: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
export default FinancialGoalForm;