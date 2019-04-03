import { Reducer } from "redux";
import { PublishResultModalState, PUBLISH_RESULT_MODAL_SHOW, PUBLISH_RESULT_MODAL_HIDE, PUBLISH_RESULT_MODAL_UPDATE_PLAYER, PublishResultModalUpdatePlayerPayload } from ".";
import { PUBLISH_RESULT_MODAL_PUBLISH_REQUEST, PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS } from "./actions";

const initialState: PublishResultModalState = {
  isOpen: false,
  isLoading: false,
  name: '',
  country: ''
}

export const publishResultModalReducer: Reducer<PublishResultModalState> = (
    state = initialState as any,
    action,
  ) => {
    switch (action.type) {
      case PUBLISH_RESULT_MODAL_SHOW:
        return {
          ...state,
          isOpen: true
        };

      case PUBLISH_RESULT_MODAL_HIDE:
        return {
          ...state,
          isOpen: false
        };

      case PUBLISH_RESULT_MODAL_UPDATE_PLAYER:
        const payload = action.payload as PublishResultModalUpdatePlayerPayload;
        return {
          ...state,
          name: payload.name,
          country: payload.country 
        };

      case PUBLISH_RESULT_MODAL_PUBLISH_REQUEST:
        return {
          ...state,
          isLoading: true
        };

      case PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isOpen: false
        };

      default:
        return state;
    }
  };