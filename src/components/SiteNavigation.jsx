import {Link} from 'react-router-dom';
import Button from './UI/Button';
import {useUserContext} from '../contexts/UserContext';

const SiteNavigation = () => {
  const {handleLogout, user} = useUserContext();
  return (
    <nav>
      <Link to="/">Home 🏠</Link>
      <Link to="/profile">Profile 😃</Link>
      <Link to="/upload">Upload ✨</Link>
      {!user && <Link to="/login">Login 👌</Link>}
      {user !== undefined && (
        <Button text="Logout" handleClick={handleLogout} />
      )}
    </nav>
  );
};

export default SiteNavigation;
