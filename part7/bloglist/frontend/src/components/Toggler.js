import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const Toggler = forwardRef((props, ref) => {
  const [hidden, setHidden] = useState(true);

  useImperativeHandle(ref, () => {
    return {
      hidePlease: () => setHidden(true),
      unhidePlease: () => setHidden(false),
    };
  });

  if (hidden) {
    return (
      <Button variant="contained" onClick={() => setHidden(false)}>
        {props.label}
      </Button>
    );
  }

  return (
    <>
      {props.children}
      <Button variant="outlined" onClick={() => setHidden(true)}>
        cancel
      </Button>
    </>
  );
});

Toggler.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggler.displayName = "Toggler";

export default Toggler;
