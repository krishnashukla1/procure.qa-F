// import { Routes, Route, Navigate } from 'react-router-dom'
// import Layout from './components/Layout'
// import Dashboard from './pages/Dashboard'
// import Suppliers from './pages/Suppliers'
// import Categories from './pages/Categories'
// import Products from './pages/Products'
// import Clients from './pages/Clients'
// import Banners from './pages/Banners'
// import Search from './pages/Search'
// import './App.css'

// function App() {
//   // Removed auth checks since no login/signup required currently
//   return (
//     <Routes>
//       {/* Default redirect to dashboard */}
//       <Route path="/" element={<Navigate to="/dashboard" />} />

//       {/* Wrap all pages in Layout for consistent UI (header/sidebar) */}
//       <Route element={<Layout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/suppliers" element={<Suppliers />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/clients" element={<Clients />} />
//         <Route path="/banners" element={<Banners />} />
//         <Route path="/search" element={<Search />} />
//       </Route>
//     </Routes>
//   )
// }

// export default App

//=============================
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Clients from "./pages/Clients";
import Banners from "./pages/Banners";
import Search from "./pages/Search";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Users from "./pages/Users";

import "./App.css";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/search" element={<Search />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
