import { createAction } from 'redux-actions';
import { UpdateTronWebStatePayload } from './model';

export const TRONWEB_STATE_UPDATE = '/local/tronweb-state/update';
export const UpdateTronWebState = createAction<UpdateTronWebStatePayload>(TRONWEB_STATE_UPDATE);