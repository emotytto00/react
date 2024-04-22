import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useUser} from '../hooks/apiHooks';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();
  const getUser = async () => {
    const token = localStorage.getItem('token');
    const userData = await getUserByToken(token);
    setUser[userData.user];
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Tämä on minun profiilisivu</h2>

      <p>
        <Link to="/">Go back to homepage</Link>
      </p>
      <div>{user && <p>Username: {user.username} </p>}</div>
    </div>
  );
};
