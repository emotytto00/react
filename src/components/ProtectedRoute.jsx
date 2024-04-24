import {Navigate, useLocation} from 'react-router-dom';
import {useUserContext} from '../contexts/UserContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({children}) => {
  const location = useLocation();
  const {user} = useUserContext();

  if (!user) {
    return <Navigate to="/" replace state={{from: location}} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
