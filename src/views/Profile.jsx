import {Link} from 'react-router-dom';

export const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">My profile</h2>

      <p>
        <Link to="/">Go back home</Link>
      </p>
    </div>
  );
};
