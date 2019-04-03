import { TronWebState } from ".";
import { TRONWEB_STATE_UPDATE } from "./actions";
import { UpdateTronWebStatePayload } from "./model";
import { Reducer } from "redux";

const initialState: TronWebState = {
    installed: false,
    loggedIn: false
}
  
export const tronWebStateReducer: Reducer<TronWebState> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TRONWEB_STATE_UPDATE:
            const payload = (action.payload as UpdateTronWebStatePayload);

            return {
                ...state,
                installed: payload.installed,
                loggedIn: payload.loggedIn
            }

        default:
            return state;
    }
};
