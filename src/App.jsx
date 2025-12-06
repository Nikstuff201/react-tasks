import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Upload from './views/Upload';
import Profile from './views/Profile';
import Single from "./views/Single.jsx";
import {Login} from './views/Login.jsx';
import {UserProvider} from './contexts/UserContext';
import {Logout} from './views/Logout.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
              <Route path="/upload" element={<Upload/>}/>
              <Route path="/single" element={<Single/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/logout" element={<Logout/>}/>
            </Route>
              </Routes>
              </UserProvider>
              </BrowserRouter>
              );
            };

              export default App;
