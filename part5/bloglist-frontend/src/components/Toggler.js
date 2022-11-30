import { useState, forwardRef, useImperativeHandle } from "react";

const Toggler = forwardRef((props, ref) => {
  const [hidden, setHidden] = useState(true);

  useImperativeHandle(ref, () => {
    return setHidden;
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

export default Toggler;
