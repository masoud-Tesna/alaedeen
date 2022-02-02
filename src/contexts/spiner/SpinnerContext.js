import { createContext, useContext, useReducer } from "react";
import LoaderSpinner from "../../templates/common/LoadSpinner";

// spinner Context Create:
const spinnerContext = createContext();

// initial state:
const spinnerInitialState = {
  isLoading: false
}

// reducer function:
function spinnerReducer(state, action) {
  switch (action.type) {
    case "loading_state" :
      return {
        ...state, isLoading: action.payload
      };
    default:
      return state;
  }
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
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      }

      {children}
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