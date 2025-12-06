import {useUserContext} from "../hooks/contextHooks.jsx";
import {useEffect} from "react";

const Logout = () => {
  const {handleLogout} = useUserContext()

  useEffect(() => {
    handleLogout()
  }, []);

  return null
}

export {Logout}

