import { createContext, useContext, useReducer, Suspense } from "react";
import LoaderSpinner from "../../templates/common/LoadSpinner";

// spinner Context Create:
const spinnerContext = createContext();

// initial state:
const spinnerInitialState = {
  isLoading: false
}

// reducer function:
const spinnerReducer = (state, { type, payload }) => {
  if (type === "loading_state") return {...state, isLoading: payload}
  return state;
}

// create spinner provider:
export const SpinnerProvider = ({ children }) => {

  // useReducer For Language use in app
  const [spinner, spinnerDispatch] = useReducer(
    spinnerReducer,
    spinnerInitialState
  );

  return (
    <spinnerContext.Provider value={{ spinner, spinnerDispatch }} >
      {spinner.isLoading &&
        <LoaderSpinner />
      }

      <Suspense fallback="">
        {children}
      </Suspense>

    </spinnerContext.Provider>
  );

}

// get current spinner state
export function useGetSpinner() {
  const spinner = useContext(spinnerContext).spinner;
  return { spinner };
}

//get spinner dispatch function:
export function useSpinnerDispatch() {
  const spinnerDispatch = useContext(spinnerContext).spinnerDispatch
  return { spinnerDispatch };
}

export const isLoadingAction = val => {
  return {
    type: "loading_state",
    payload: val
  };
}