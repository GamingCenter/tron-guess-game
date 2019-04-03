import { LocalState } from './local';
import { Store } from 'redux';
import { ServerState } from './server';

export interface AppState {
    local: LocalState;
    server: ServerState;
  }

export type AppStateStore = Store<AppState>;