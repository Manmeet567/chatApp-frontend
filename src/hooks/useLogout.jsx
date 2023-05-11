import { useAuthContext } from "./useAuthContext";
import { useServersContext } from './useServersContext'
import { useUserContext } from "./useUserContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: serversDispatch } = useServersContext()
    const {dispatch: userDispatch} = useUserContext()

    const logout = () => {
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type:'LOGOUT'})
        serversDispatch({type:'GET_SERVER_LIST', payload:null})
        userDispatch({type:'SET_CURRENT_USER', payload:null})
        userDispatch({type:'FRIENDS', payload:null})
        userDispatch({type:'PENDING', payload:null})
        userDispatch({type:'BLOCKED', payload:null})
        userDispatch({type:'NOTIFICATIONS', payload:null})
    }

    return {logout}
}