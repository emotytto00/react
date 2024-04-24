import {createContext, useContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {login} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials) => {
    console.log('credentials', credentials);
    console.log({credentials});
    try {
      const userData = await login(credentials);
      console.log('userData', userData);
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(undefined);
    navigate('/');
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
        const origin = location.state.from.pathname || '/';
        navigate(origin);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UserProvider, UserContext};
export const useUserContext = () => useContext(UserContext);
