import { delay } from 'redux-saga/effects';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { START_GAME } from './local/intro/actions';
// import { NEW_GAME_REQUESTED } from './server/actions';

function* requestNewGame() {
    yield delay(800);

    // try {
    //    const user = yield call(Api.fetchUser, action.payload.userId);
    //    yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    // } catch (e) {
    //    yield put({type: "USER_FETCH_FAILED", message: e.message});
    // }
 }

export function* rootSaga() {
    yield takeLatest(START_GAME, requestNewGame);
  }

// export function* rootSaga() {
//     yield all([
//       fork(watchLoadTickets),
//       fork(watchSearchTextChanges),
//       fork(watchColumnSortChanges),
//     ]);
//   }