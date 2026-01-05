import { ThunkActionType } from "@src/typings/redux";
import { setIsAuth, setLoadingInitial } from "./shared.slice";
import customHistory from "@src/lib/utils/history";

export const handleInitialLoad = (): ThunkActionType => async (dispatch) => {
  try {
    dispatch(setLoadingInitial(true));

    dispatch(setIsAuth(true));
    customHistory.push("/");
  } catch (error) {
    console.log("ERROR: ", error);
  } finally {
    dispatch(setLoadingInitial(false));
  }
};
