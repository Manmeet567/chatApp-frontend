import { useAuthContext } from "./useAuthContext";
import { useServersContext } from './useServersContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: serversDispatch } = useServersContext()

    const logout = () => {
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type:'LOGOUT'})
        serversDispatch({type:'GET_SERVER_LIST', payload:null})
    }

    return {logout}
}