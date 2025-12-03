import {useUser} from "../hooks/apiHooks.js";
import {useEffect, useState} from "react";

const Profile = () => {

  const {getUserByToken} = useUser(localStorage.getItem("token"));

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUserByToken(localStorage.getItem("token"));
      setUser(user);
    }
    loadUser();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <div>
        <h2>Profile Page</h2>
        <p>You need to log in at first</p>
      </div>
    )
  } else if (user === null) {
    return <p>loading</p>
  } else {
    return (
      <div>
        {Object.entries(user.user).map(([key, value]) => (
          <p>{key}: {value}</p>
        ))}
      </div>
    )
  }
}

export default Profile;
