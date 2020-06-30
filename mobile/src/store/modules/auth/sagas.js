import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import { signInSuccess, signFailure } from "./actions";

import api from "../../../services/api";

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, `sessions`, { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    yield put(signFailure());
    Alert.alert(err.response.data.error);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
]);
