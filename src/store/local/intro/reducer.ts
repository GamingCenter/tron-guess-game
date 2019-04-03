import { IntroState } from ".";
import { Reducer, Action } from "redux";
import { START_GAME } from "./actions";

const initialState: IntroState = {
    hasStarted: false
}
  
export const introReducer: Reducer<IntroState> = (
    state = initialState as any,
    action: Action,
) => {
    switch (action.type) {
    case START_GAME:
        return {
            ...state,
            hasStarted: true
        }

    default:
        return state;
    }
};
