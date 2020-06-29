import produce from "immer";

const INITIAL_STATE = {
  token: null,
  id: null,
  name: null,
  email: null,
  createdAt: null,
  admin: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@auth/SIGN_IN_REQUEST": {
        draft.loading = true;
        break;
      }
      case "@auth/SIGN_IN_SUCCESS": {
        const { id, name, email, admin, createdAt, token } = action.payload;
        draft.id = id;
        draft.token = token;
        draft.name = name;
        draft.email = email;
        draft.admin = admin;
        draft.createdAt = createdAt;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case "@auth/SIGN_FAILURE": {
        draft.loading = false;
        draft.signed = false;
        draft.token = null;
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.id = "";
        draft.name = "";
        draft.email = "";
        draft.admin = "";
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
