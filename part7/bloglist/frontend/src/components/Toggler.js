import { useState, forwardRef, useImperativeHandle } from "react";
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
    return <button onClick={() => setHidden(false)}>{props.label}</button>;
  }

  return (
    <>
      {props.children}
      <button onClick={() => setHidden(true)}>cancel</button>
    </>
  );
});

Toggler.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggler.displayName = "Toggler";

export default Toggler;
