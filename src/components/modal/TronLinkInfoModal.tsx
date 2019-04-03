import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TronLinkGuide } from './tronlink-guide/TronLinkGuide';
import { connect, MapStateToProps, MapDispatchToPropsFunction } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { hideTronLinkInfoModal } from '../../store/local/modal/tronlink-info/actions';

interface StateProps {
    isOpen: boolean;
    isTronLinkInstalled: boolean;
}

interface StateDispatchProps {
    hideTronLinkInfoModal(): void;
}

interface OwnProps {
}

interface TronLinkInfoModalProps extends OwnProps, StateProps, StateDispatchProps {

}

interface OwnStates {
}

class _TronLinkInfoModal extends React.PureComponent<TronLinkInfoModalProps, OwnStates> {
    constructor(props: TronLinkInfoModalProps) {
        super(props);
    }

    render() {
        const { isOpen, hideTronLinkInfoModal, isTronLinkInstalled } = this.props;

        return (<div>
            <Dialog open={isOpen} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <TronLinkGuide installed={isTronLinkInstalled} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" autoFocus onClick={hideTronLinkInfoModal}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState) => ({
    isOpen: state.local.modals.tronLinkInfo.isOpen,
    isTronLinkInstalled: state.local.tronWeb.installed
});

const mapDispatchToProps: MapDispatchToPropsFunction<StateDispatchProps, OwnProps> = (
    dispatch: Dispatch,
) => ({
    hideTronLinkInfoModal() {
      dispatch(hideTronLinkInfoModal());
    },
});

export const TronLinkInfoModal = connect<StateProps, StateDispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(_TronLinkInfoModal);
