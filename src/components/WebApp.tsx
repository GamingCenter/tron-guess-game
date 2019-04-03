import React from 'react';
import './App.css';
import { Intro } from './Intro';
import {
  connect,
  MapStateToProps,
  MapDispatchToPropsFunction,
} from 'react-redux';
import { AppState } from '../store';
import { Game } from './Game';

interface OwnProps { }

interface WebAppProps extends OwnProps, StateProps {}

interface StateProps {
  hasStarted: boolean;
}

class _WebApp extends React.PureComponent<WebAppProps> {
  render() {
    const { hasStarted } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-div">
            {hasStarted ? <Game /> : <Intro />}
          </div>
        </header>
      </div>
    );
  }
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
  hasStarted: state.local.intro.hasStarted
});

export const WebApp = connect<StateProps, {}, OwnProps, AppState>(
  mapStateToProps
)(_WebApp);