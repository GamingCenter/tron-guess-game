import { Reducer, Action } from "redux";
import { TronLinkInfoModalState } from ".";
import { TRONLINK_INFO_MODAL_SHOW, TRONLINK_INFO_MODAL_HIDE } from "./actions";

const initialState: TronLinkInfoModalState = {
  isOpen: false
}

export const tronLinkInfoModalReducer: Reducer<TronLinkInfoModalState> = (
    state = initialState as any,
    action: Action,
) => {
    switch (action.type) {
      case TRONLINK_INFO_MODAL_SHOW:
        return {
          ...state,
          isOpen: true
        }

      case TRONLINK_INFO_MODAL_HIDE:
        return {
          ...state,
          isOpen: false
        }

      default:
        return state;
    }
  };