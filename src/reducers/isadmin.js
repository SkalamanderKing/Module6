export default function isadmin(state = "", action){
    switch(action.type){
       case "IS_ADMIN":
         return [...state, action.user];
         case "IS_NOT_ADMIN":
         return "";
        default:
            return state;
    }
}
