import { createContext, useReducer } from "react";

export const UserContext = createContext()

export const userReducer = (state,action) => {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            return {
                user:action.payload
            };

        case 'FRIENDS':
            return {
                friends:action.payload
            }
        
        case 'PENDING':
            return {
                pending:action.payload
            }

        case 'BLOCKED':
            return {
                blocked:action.payload
            }
        
        default: return state;
    }
}

export const UserContextProvider = ({children}) => {
    const [state, dispatch ] = useReducer(userReducer, {
        user:null
    })

    return (
        <UserContext.Provider value={{...state,dispatch}}>
            { children }
        </UserContext.Provider>
    )

}