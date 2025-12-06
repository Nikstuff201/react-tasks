import {Link, Outlet} from "react-router-dom";
import {useUserContext} from "../hooks/contextHooks.jsx";
import {useEffect} from "react";

const Layout = () => {

  const {handleAutoLogin, user} = useUserContext();

  useEffect(() => {
    handleAutoLogin()
  }, []);


  return (<div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {user &&
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        }
        <li>
          <Link to="/upload">Upload</Link>
        </li>
        {!user &&
        <li>
          <Link to="/login">Login</Link>
        </li>
        }
        {user &&
        <li>
          <Link to="/logout">Logout</Link>
        </li>
        }
      </ul>
    </nav>
    <main>
      <Outlet/>
    </main>
  </div>)
}

export default Layout
