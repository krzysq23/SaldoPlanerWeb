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
import validations from "pages/finance/transactions/schemas/validations";
import form from "pages/finance/transactions/schemas/form";

import { formatYMD } from "utils/dateUtil";
import authService from "services/auth/authService";
import transactionService from "services/transaction/transactionService";
import categoryStore from "services/category/categoryStore";

function TransactionForm({ transaction, onClose, onSave }) {

  const isEdit = transaction != null;
  
  const userIdValue = authService.getUserId();
  const title = isEdit ? "Edycja transakcji" : "Nowa transakcja";
  const { showSuccess, showError } = useNotify();
  const { formId, formField, errors } = form;
  const { transactionId, categoryId, userId, amount, date, description } = formField;

  const categoryOptions = categoryStore.getCategories().map((category) => ( 
    { value: category.id, label: category.name }
  ))

  const initialValues = {
    id: transaction?.id || 0,
    userId: userIdValue,
    categoryId: transaction?.categoryId || categoryOptions[0].value,
    amount: transaction?.amount || "",
    date: transaction?.date || formatYMD(new Date()),
    description: transaction?.description || ""
  };

  const handleSubmit = (values, actions) => {
    if(isEdit) {
      transactionService
          .editTransaction(values)
          .then((data) => {
            showSuccess("Zaktualizowano transakcję.");
            onSave();
          })
          .catch((err) => {
            actions.setSubmitting(false);
            showError(err.message);
          });
    } else {
      transactionService
          .addTransaction(values)
          .then((data) => {
            showSuccess("Dodano transakcję.");
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
                type={description.type}
                label={description.label}
                name={description.name}
                placeholder={description.placeholder}
                error={errors.description && touched.description}
                success={values.description.length > 0 && !errors.description}
              />
            </SoftBox>

            <SoftBox
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              height="100%"
            >
              <FormField
                type={amount.type}
                label={amount.label}
                name={amount.name}
                placeholder={amount.placeholder}
                error={errors.amount && touched.amount}
                success={values.amount.length > 0 && !errors.amount}
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
              <FormDatePicker
                label={date.label}
                name={date.name}
                input={{ placeholder: date.placeholder }}
                error={errors.date && touched.date}
                success={values.date.length > 0 && !errors.date}
                value={values.date ? new Date(values.date) : null}
                onChange={(newDate) => {
                  const newDateStr = newDate ? formatYMD(newDate[0]) : "";
                  setFieldValue(date.name, newDateStr);
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

TransactionForm.propTypes = {
  transaction: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};
export default TransactionForm;