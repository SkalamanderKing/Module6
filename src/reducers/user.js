
export default function user(state = [], action){
    switch(action.type){
       // case "FETCH_ALL_USER":
         //return action.user;
        case "SIGN_IN":
            return state.filter(user => user.key !== action.user.key)
            //return [...state, action.user];
            case "USER_REMOVED":
            return state.filter(user => user.key !== action.user.key)
            case "SIGN_OUT":
            return [...state, ""];
            case "CHILD_ADDED_USER":
            return [...state, action.user];
            case "USER_CHANGED":
            return state.map(user => {
              return user.key === action.user.key 
                ? Object.assign({}, action.user, action.user)
                : user
            })
          
          //  case "TEXT_ADDED":
            //return [...state, action.user];
        default:
            return state;
    }
}