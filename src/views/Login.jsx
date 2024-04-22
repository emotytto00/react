import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggleForm, setToggleForm] = useState(true);

  const toggle = () => {
    setToggleForm(!toggleForm);
  };
  return (
    <>
      {toggleForm ? <LoginForm /> : <RegisterForm />}
      <button>
        text={'register'} onClick{toggle}
      </button>
    </>
  );
};

export default Login;
