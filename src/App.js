import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import { Route, Routes } from 'react-router-dom';
import OpenDashboard from './Components/Dashboard/OpenDashboard';
import AddContact from './Components/Dashboard/AddContact';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import RequireAuth from './Components/Shared/RequireAuth';
import ContactList from './Components/Dashboard/ContactList';


function App() {
  return (
    <div className="App">
    <OpenDashboard></OpenDashboard>
      <Routes>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        <Route path="login" element={<Login></Login>}></Route>

        <Route path="/" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
        <Route path="addContact" element={<AddContact></AddContact>}></Route>
        <Route path="contactList" element={<ContactList></ContactList>}></Route>
        </Route>
        
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
