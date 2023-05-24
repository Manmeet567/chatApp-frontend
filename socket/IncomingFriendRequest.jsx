import { useEffect } from 'react';
import { socket } from './socket';
import { useUserContext } from '../src/hooks/useUserContext';

const IncomingFriendRequest = () => {
    const {dispatch} = useUserContext()

    useEffect(() => {
    socket?.on('incomingFriendRequest', (notification) => {
      console.log('Received incomingFriendRequest:', notification);
      dispatch({ type: 'NOTIFICATIONS', payload: notification });
    });

    // Clean up the event listener on component unmount
    return () => {
      socket?.off('incomingFriendRequest');
    };
  }, [dispatch]);

  return null;
}

export default IncomingFriendRequest;