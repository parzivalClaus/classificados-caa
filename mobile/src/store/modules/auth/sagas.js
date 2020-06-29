import { Alert } from "react-native";
import { takeLatest, call, put, all } from "redux-saga/effects";

import { signInSuccess, signFailure } from "./actions";

import api from "../../../services/api";

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, `/sessions`, { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    yield put(signFailure());
    Alert.alert(err.response.data.error);
  }
}

export default all([takeLatest("@auth/SIGN_IN_REQUEST", signIn)]);