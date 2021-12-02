import { useReducer, createContext, useContext, useEffect } from "react";
import { MEMBER_LOCAL_STORAGE_TOKEN } from "../config";
import { Member } from "../scripts/dto/member-dto";
import reducer, { initialState } from "../scripts/lib/reducer";
import { Actions, ActionTypes, State } from "../scripts/lib/types";

interface StateContextType {
  state: State;
  dispatch: React.Dispatch<ActionTypes>;
}
const StateContext = createContext<StateContextType | null>(null);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, ActionTypes>>(
    reducer,
    initialState
  );

  useEffect(() => {
    const savedMember = localStorage.getItem(MEMBER_LOCAL_STORAGE_TOKEN);
    if (savedMember) {
      const parseSavedMember = JSON.parse(savedMember) as Member[];
      dispatch({
        type: Actions.SET_MEMBER,
        payload: parseSavedMember.map((member) => ({ ...member, price: 0 })),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      MEMBER_LOCAL_STORAGE_TOKEN,
      JSON.stringify(state.members)
    );
  }, [state.members]);

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
