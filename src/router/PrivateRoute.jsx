import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, modulo }) => {

  const { Access } = useSelector((state) => state.auth);

  const userIsLogged = Access && Access.token;
  if (userIsLogged) {
    if (modulo) {
      if (Access.modulos.includes(modulo)) {
        return children;
      } else {
        return (
          <>
            <Navigate to="/no-autorizado" />
          </>
        );
      }
    }
    return children;
  }
  return (
    <>
      <Navigate to="/" />
    </>
  );
};
