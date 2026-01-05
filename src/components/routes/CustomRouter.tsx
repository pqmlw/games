import React, { useLayoutEffect, useState } from "react";
import { HashRouterProps, Router } from "react-router-dom";
import { HashHistory } from "history";
import customHistory from "@src/lib/utils/history";

interface Props extends HashRouterProps {
  history: HashHistory;
}

const CustomRouter: React.FC<Props> = ({ basename, history, children }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      navigator={customHistory}
      location={state.location}
      navigationType={state.action}
      children={children}
      basename={basename}
      unstable_useTransitions
    />
  );
};
export default CustomRouter;
