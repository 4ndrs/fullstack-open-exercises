import { useSelector, useDispatch } from "react-redux";
import { resetLoggedUser } from "../reducers/loggedUserReducer";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.loggedUser.name);

  return (
    <p>
      {name} logged in{" "}
      <button onClick={() => dispatch(resetLoggedUser())}>logout</button>
    </p>
  );
};

export default LoggedUser;
