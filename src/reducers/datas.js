export default function datas(state = "", action) {
  switch (action.type) {
    case "USER_SIGN_IN":
      return action.user;
    case "USER_SIGN_OUT":
      return "";
    default:
      return state;
  }
}
