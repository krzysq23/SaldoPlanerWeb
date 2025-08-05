
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for SoftSocialButton
import SoftSocialButtonRoot from "components/SoftSocialButton/SoftSocialButtonRoot";

const SoftSocialButton = forwardRef(
  ({ color = "facebook", size = "medium", iconOnly = false, circular = false, children, ...rest }, ref) => (
    <SoftSocialButtonRoot
      {...rest}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      ownerState={{ color, size, iconOnly, circular }}
    >
      {children}
    </SoftSocialButtonRoot>
  )
);

// Typechecking props for the SoftSocialButton
SoftSocialButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "pinterest",
    "youtube",
    "github",
    "vimeo",
    "slack",
    "dribbble",
    "reddit",
    "tumblr",
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SoftSocialButton;
