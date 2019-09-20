import {
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
  fork,
  take,
  cancel
} from "redux-saga/effects";

import * as api from "./api";

// setup
let getPostTask;

function handleError(e) {
  console.error(e);
}

function* getPostSaga(action) {
  try {
    yield delay(2000);
    const post = yield call(api.getPost);
    yield put({ type: "ADD", payload: post });
  } catch (e) {
    handleError(e);
  }
}

function* cancelSaga(task) {
  if (task) {
    yield cancel(task);
    getPostTask = null;
  }
}

// // Super basic - works
// function* sagas() {
//   yield takeLatest("GET_POST_REQUESTED", getPostSaga);
// }

// Add cancelling of a the task
function* sagas() {
  while (true) {
    const GET_POST_REQUESTED = yield take("GET_POST_REQUESTED");
    getPostTask = yield fork(getPostSaga, GET_POST_REQUESTED);

    yield takeLatest("CANCEL_GET_POST_REQUESTED", cancelSaga(getPostTask));
  }
}

export default sagas;
