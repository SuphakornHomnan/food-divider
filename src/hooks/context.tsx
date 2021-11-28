import { useReducer, createContext, Dispatch, useContext } from "react";
import reducer, { initialState } from "../scripts/lib/reducer";
import { ActionTypes, State } from "../scripts/lib/types";

interface StateContextType {
  state: State;
  dispatch: Dispatch<ActionTypes>;
}
const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, ActionTypes>>(
    reducer,
    initialState
  );
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export function useStateContext() {
  const ctx = useContext(StateContext);
  if (!ctx) {
    return {
      state: initialState,
      dispatch: () => {},
    };
  }
  return ctx;
}
