import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgetPassword from "./components/auth/ForgetPassword";
import Dashboard from './components/pages/Dashboard'
import Tasks from './components/pages/Tasks'
import Teams from './components/pages/Teams'
import Employee from './components/pages/Employee'
import Admin from './components/pages/Admin'
import PagenotFound from './components/pages/PagenotFound'
import AddTeams from "./components/AddTeams"
import Profile from './components/pages/Profile'

import {Toaster} from "react-hot-toast";
function App() {
  return (
     <>
      <Toaster />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgetPassword />} />
   <Route path="/dashboard" element={<Dashboard/>}/>
   <Route path="/Tasks" element={<Tasks/>}/>
   <Route path="/teams" element={<Teams/>}/>
<Route path="/Employee" element={<Employee/>}/>

<Route path="/Profile" element={<Profile/>}/>
<Route path="/Addteams" element={<AddTeams/>}/>
   
<Route path="/*" element={<PagenotFound/>}/>
    </Routes>
    </>
  );
}

export default App;