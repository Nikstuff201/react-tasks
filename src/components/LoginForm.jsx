import {useForm} from "../hooks/formhooks.js";
import {useNavigate} from 'react-router-dom';
import {useUserContext} from "../hooks/contextHooks.jsx";

const LoginForm = (props) => {

  const navigate = useNavigate();

  const {setPage} = props;

  const initValues = {
    username: '',
    password: '',
  };

  const {handleLogin, user} = useUserContext();

  const doLogin = async () => {
    await handleLogin(inputs);

    if (!user) {
      navigate('/');
    } else {
      alert("Login failed!");
    }

  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={ handleInputChange }
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick = {()=>setPage(1)}>Register</button>
    </>
  );
};

export {LoginForm}
