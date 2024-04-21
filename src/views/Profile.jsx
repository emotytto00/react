import {Link} from 'react-router-dom';

export const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">My profile page</h2>

      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
};
