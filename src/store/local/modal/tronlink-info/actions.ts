import { createAction } from 'redux-actions';

export const TRONLINK_INFO_MODAL_SHOW = '/local/modal/tronlink-info/show';
export const showTronLinkInfoModal = createAction(TRONLINK_INFO_MODAL_SHOW);

export const TRONLINK_INFO_MODAL_HIDE = '/local/modal/tronlink-info/hide';
export const hideTronLinkInfoModal = createAction(TRONLINK_INFO_MODAL_HIDE);