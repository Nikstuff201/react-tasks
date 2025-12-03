import {useNavigate} from "react-router-dom";
import {useUser} from "../hooks/apiHooks.js";
import {useForm} from "../hooks/formhooks.js";

const RegisterForm = (props) => {
  const navigate = useNavigate();

  const initValues = {
    username: "",
    password: "",
    email: "",
  }

  const {setPage} = props;

  const {createUser} = useUser();

  const doRegister = async () => {
    try {
      console.log(inputs)
      const result = await createUser(inputs);
      console.log(result)
      setPage(0);
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
    }
  }


  const {handleInputChange, handleSubmit, inputs} = useForm(doRegister, initValues)

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="password"
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button type="button" onClick={() => setPage(0)}>Login</button>
    </>
  )
}

export {RegisterForm}
