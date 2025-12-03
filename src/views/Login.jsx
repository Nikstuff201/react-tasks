import {LoginForm} from "../components/LoginForm.jsx";
import {RegisterForm} from "../components/RegisterForm.jsx";
import {useState} from "react";

const Login = () => {
  const [page, setPage] = useState(0);

  if (page === 0) {
    return (
      <>
        <LoginForm setPage={setPage} />
      </>
    )
  } else {
    return (
      <>
        <RegisterForm setPage={setPage}/>
      </>
    )
  }
}

export {Login};
