import { ServerContext } from "../context/ServerContext";
import { useContext } from 'react'

export const useServersContext = () => {
    const context = useContext(ServerContext)

    if(!context) {
        throw Error('useServersContext must be used inside a ServerContextProvider')
    }

    return context
}