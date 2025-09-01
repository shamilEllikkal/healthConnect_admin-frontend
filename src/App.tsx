import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import AddDoctor from "./components/AddDoctor";
import AddHospital from "./components/AddHospital";
import ViewAppointments from "./components/ViewAppointments";
import ManageUsers from "./components/ManageUsers";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";
import ProtectRouter from "./protectRouter";

function App() {
  return (
    <div className="font-font">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectRouter />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-doctors" element={<AddDoctor />} />
            <Route path="add-hospitals" element={<AddHospital />} />
            <Route path="view-appointments" element={<ViewAppointments />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
