import {useUserContext} from '../contexts/UserContext';

const UserData = () => {
  const {user} = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <>
      <p>Username: {user.username} </p>
      <p>Email: {user.email} </p>
      <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
    </>
  );
};

export default UserData;
