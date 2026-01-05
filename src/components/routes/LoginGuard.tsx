import { useAppSelector } from "@src/lib/hooks/useRedux";
import { ReactNode } from "react";
import Redirect from "./Redirect";

interface LoginGuardProps {
  children: ReactNode;
}
const LoginGuard: React.FC<LoginGuardProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.shared);

  if (isAuth) return <Redirect to="/" />;
  return <>{children}</>;
};

export default LoginGuard;
