
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// react-flatpickr lang
import { Polish } from "flatpickr/dist/l10n/pl.js";

// Soft UI Dashboard PRO React components
import SoftInput from "components/SoftInput";

function SoftDatePicker({ input = {}, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      options={{
        locale: Polish,
        dateFormat: "Y-m-d",
      }}
      render={({ defaultValue }, ref) => (
        <SoftInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}


// Typechecking props for the SoftDatePicker
SoftDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default SoftDatePicker;
