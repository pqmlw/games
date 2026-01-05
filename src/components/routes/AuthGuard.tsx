import { useAppSelector } from "@src/lib/hooks/useRedux";
import { FC, ReactNode } from "react";
import Redirect from "./Redirect";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuth, loadingInitial } = useAppSelector((state) => state.shared);

  if (!isAuth && !loadingInitial) return <Redirect to="/sign-in" />;
  return <>{children}</>;
};

export default AuthGuard;
