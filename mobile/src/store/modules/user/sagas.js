import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { id, name, email, ...rest } = payload.data;

    const profile = {
      id,
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, `users/${id}`, profile);

    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Falha na atualização', err.response.data.error);
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
