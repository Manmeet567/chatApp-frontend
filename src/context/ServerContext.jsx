import { createContext, useReducer } from "react";

export const ServerContext = createContext()

export const serverReducer = (state,action) => {
    switch(action.type){
        case 'GET_SERVER_LIST':
            return {
                servers:action.payload
            }

        default: return state
    }
}

export const ServerContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(serverReducer, {
        servers:null
    })

    return (
        <ServerContext.Provider value = {{...state, dispatch}}>
            { children }
        </ServerContext.Provider>
    )
}