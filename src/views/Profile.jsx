import {Link} from 'react-router-dom';

export const Profile = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">This is my profile</h2>

      <p>
        <Link to="/">Go back to home page</Link>
      </p>
    </div>
  );
};
