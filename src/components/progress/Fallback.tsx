import React from "react";
import { useAppSelector } from "@src/lib/hooks/useRedux";
import Loader from "./Loader";
import Splash from "./Splash";

const Fallback: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.shared);

  if (isAuth) return <Loader />;
  return <Splash />;
};
export default Fallback;
