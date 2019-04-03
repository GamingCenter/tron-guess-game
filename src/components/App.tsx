import React from 'react';
import { Provider } from 'react-redux';
import { WebApp } from './WebApp';
import { AppStateStore } from '../store';
import configureAppStore from '../store/configureStore';

export interface AppProps {
  store: AppStateStore
};

const store = configureAppStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <WebApp />
      </Provider>
    );
  }
}

export default App;
