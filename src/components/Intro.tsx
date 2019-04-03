import React from 'react';
import { Button, Typography } from "@material-ui/core";
import {
    connect,
    MapStateToProps,
    MapDispatchToPropsFunction,
  } from 'react-redux';
  import { AppState } from '../store';
  import { Dispatch } from 'redux';
  import { startGame } from '../store/local/intro/actions';  

interface OwnProps { }

interface IntroProps extends OwnProps, StateProps, StateDispatchProps { }

interface StateProps {}
interface StateDispatchProps {
  onStart(): void;
}

class _Intro extends React.PureComponent<IntroProps> {
    render() {
        const { onStart } = this.props;

        return (
            <div>
              <div style={{ marginBottom: 30 }}>
                  Developed using ReactJs / Typescript / Redux, Solidity (Smart Contract)
                  {/* TronBox, TronWeb */}
              </div>
              <Button variant="contained" color="default" size="large" onClick={onStart}>Start Game</Button>
              {/* <div style={{ fontSize: 50 }}>&#127137;</div>
                &hearts; &spades; &clubs; or &diams; */}
            </div>
        );
    }
};
  
const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
});

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
  dispatch: Dispatch,
) => ({
  onStart() {
    dispatch(startGame());
  },
});

export const Intro = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(_Intro);