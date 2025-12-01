import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Upload from './views/Upload';
import Profile from './views/Profile';
import Single from "./views/Single.jsx";
import {Login} from './views/Login.jsx';
import {Logout} from './views/Logout.jsx';



const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/upload" element={<Upload />}/>
          <Route path="/single" element={<Single />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
