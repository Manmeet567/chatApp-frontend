import { createContext, useReducer } from "react";

export const UserContext = createContext()

export const userReducer = (state,action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                user:action.payload
            };

        case 'FRIENDS':
            return {
                ...state,
                friends:action.payload
            }
        
        case 'PENDING':
            return {
                ...state,
                pending:action.payload
            }

        case 'UPDATE_PENDING':
            return {
                ...state,
                pending: state.pending ? [...state.pending, action.payload] : [action.payload]
            };
        
        case 'BLOCKED':
            return {
                ...state,
                blocked:action.payload
            }

        case 'NOTIFICATIONS':
            return {
                ...state,
                notifications:action.payload
            }
        
        default: return state;
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch ] = useReducer(userReducer, {
        user:null,
        friends:null,
        pending:null,
        blocked:null
    })

    return (
        <UserContext.Provider value={{...state,dispatch}}>
            { children }
        </UserContext.Provider>
    )

}