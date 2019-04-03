import { createAction } from 'redux-actions';
import { PublishResultModalUpdatePlayerPayload } from './model';

export const PUBLISH_RESULT_MODAL_SHOW = '/local/modal/publish-result/show';
export const ShowPublishResultModal = createAction(PUBLISH_RESULT_MODAL_SHOW);

export const PUBLISH_RESULT_MODAL_HIDE = '/local/modal/publish-result/hide';
export const HidePublishResultModal = createAction(PUBLISH_RESULT_MODAL_HIDE);

export const PUBLISH_RESULT_MODAL_UPDATE_PLAYER = '/local/modal/publish-result/update-player';
export const UpdatePublishResultPlayer = createAction<PublishResultModalUpdatePlayerPayload>(PUBLISH_RESULT_MODAL_UPDATE_PLAYER);

export const PUBLISH_RESULT_MODAL_PUBLISH_REQUEST = '/local/modal/publish-result/publish-request';
export const PublishResultRequest = createAction(PUBLISH_RESULT_MODAL_PUBLISH_REQUEST);

export const PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS = '/local/modal/publish-result/publish-success';
export const PublishResultSuccess = createAction(PUBLISH_RESULT_MODAL_PUBLISH_SUCCESS);