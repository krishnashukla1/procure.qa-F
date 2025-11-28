import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Home,
  Users,
  Package,
  ShoppingCart,
  Users as UsersIcon,
  Image,
  Search,
  Menu,
  ChevronRight,
  LogOut,
  Settings,
  Bell,
  User,
} from "lucide-react";

const Layout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/suppliers", icon: Users, label: "Suppliers" },
    { path: "/categories", icon: Package, label: "Categories" },
    { path: "/products", icon: ShoppingCart, label: "Products" },
    { path: "/clients", icon: UsersIcon, label: "Clients" },
    { path: "/banners", icon: Image, label: "Banners" },
    { path: "/search", icon: Search, label: "Search" },
  ];

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop() || "dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 2000); // hide after 2 sec

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl
          transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700/40 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex justify-center items-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">proqure.qa</h1>
            <p className="text-slate-400 text-sm">Procurement Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 mt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center justify-between p-4 rounded-xl transition-all border
                  ${
                    isActive
                      ? "bg-blue-500/20 border-blue-500/40 shadow-lg shadow-blue-500/20"
                      : "border-transparent hover:bg-slate-700/40"
                  }
                `}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`
                      p-2 rounded-lg
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700/40 text-slate-300"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={`font-medium ${
                      isActive ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-blue-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout */}
        {/* <div className="absolute bottom-0 w-full p-6 border-t border-slate-700/40">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-200 text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div> */}

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-700/40">
          <button
            onClick={handleLogout}
            className="cursor-pointer w-full flex items-center justify-center gap-2 
               bg-white text-blue-600 font-semibold 
               py-2 rounded-lg shadow-md 
               hover:bg-blue-50 active:bg-blue-100 
               transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 
             bg-transparent text-white border border-white/50 
             py-2 rounded-lg 
             hover:bg-white/10 transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button> */}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md border-b px-6 py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                  {getPageTitle()}
                </h2>
                <p className="text-sm text-gray-500">
                  Welcome back! Here's what's happening
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setOpen(true)}
                  className="cursor-pointer relative p-2 rounded-lg hover:bg-gray-100"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-xl p-4 border animate-fadeIn">
                    <p className="text-sm text-gray-700 font-medium">
                      No new notifications right now.
                    </p>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((s) => !s)}
                  
                  className="cursor-pointer flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex justify-center items-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Click-outside container: overlay + dropdown */}
                {userMenuOpen && (
                  <div className="cursor-pointer fixed inset-0 z-40">
                    {/* Overlay - sits under the dropdown */}
                    <div
                      className="absolute inset-0 bg-black/10"
                      onClick={() => setUserMenuOpen(false)}
                    />

                    {/* Dropdown - stop propagation so overlay won't catch clicks inside */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-16 right-6 mt-0 w-60 bg-white rounded-2xl border border-gray-200 shadow-xl py-2 animate-fadeIn z-50"
                    >
                      {/* <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Profile
                        </span>
                      </button> */}

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setUserMenuOpen(false);
                        }}
                        className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition"
                      >
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Profile
                        </span>
                      </button>

                      {/* <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Settings
                        </span>
                      </button> */}
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setUserMenuOpen(false);
                        }}
                        className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition"
                      >
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 flex items-center justify-center rounded-full">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Settings
                        </span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition text-red-600"
                      >
                        <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

// ================more stylsih============

// import { useState } from 'react'
// import { Link, useLocation, Outlet } from 'react-router-dom'
// import {
//   Home,
//   Users,
//   Package,
//   ShoppingCart,
//   Users as UsersIcon,
//   Image,
//   Search,
//   Menu,
//   X,
//   ChevronRight,
//   LogOut,
//   Settings,
//   Bell,
//   User,
//   Zap,
//   BarChart3,
//   Shield,
//   Moon,
//   Sun
// } from 'lucide-react'

// const Layout = () => {
//   const location = useLocation()
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [userMenuOpen, setUserMenuOpen] = useState(false)
//   const [darkMode, setDarkMode] = useState(false)

//   const menuItems = [
//     { path: '/dashboard', icon: Home, label: 'Dashboard', badge: 3 },
//     { path: '/suppliers', icon: Users, label: 'Suppliers', badge: 12 },
//     { path: '/categories', icon: Package, label: 'Categories', badge: 8 },
//     { path: '/products', icon: ShoppingCart, label: 'Products', badge: 24 },
//     { path: '/clients', icon: UsersIcon, label: 'Clients', badge: 16 },
//     { path: '/banners', icon: Image, label: 'Banners', badge: 5 },
//     { path: '/search', icon: Search, label: 'Search', premium: true },
//   ]

//   const getPageTitle = () => {
//     const path = location.pathname.split('/').pop() || 'dashboard'
//     return path.charAt(0).toUpperCase() + path.slice(1)
//   }

//   return (
//     <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50/20'}`}>
//       {/* Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black bg-opacity-60 transition-opacity duration-300"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
//         shadow-2xl border-r border-slate-700/50
//         transform transition-all duration-500 ease-out
//         ${sidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
//       `}>
//         {/* Sidebar Header */}
//         <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-900">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//                   proqure.qa
//                 </h1>
//                 <p className="text-slate-400 text-sm font-medium">Enterprise Platform</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
//             >
//               <X className="w-5 h-5 text-slate-400" />
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 space-y-1 mt-6">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`
//                   relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300
//                   group overflow-hidden
//                   ${isActive
//                     ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-2xl shadow-blue-500/10 border border-blue-500/30'
//                     : 'hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50'
//                   }
//                 `}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 {/* Animated background */}
//                 <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500
//                   ${isActive ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`} />

//                 <div className="flex items-center space-x-4 relative z-10">
//                   <div className={`
//                     p-3 rounded-xl transition-all duration-300 shadow-lg
//                     ${isActive
//                       ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/25'
//                       : 'bg-slate-700/50 text-slate-300 group-hover:bg-slate-600/50 group-hover:shadow-slate-500/25'
//                     }
//                   `}>
//                     <item.icon className="w-5 h-5" />
//                   </div>
//                   <div className="text-left">
//                     <div className="flex items-center space-x-2">
//                       <p className={`font-semibold transition-all duration-300
//                         ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}
//                       `}>
//                         {item.label}
//                       </p>
//                       {item.premium && (
//                         <Shield className="w-4 h-4 text-yellow-400" />
//                       )}
//                     </div>
//                     <p className={`text-xs transition-all duration-300
//                       ${isActive ? 'text-blue-200' : 'text-slate-400 group-hover:text-slate-300'}
//                     `}>
//                       {item.path.replace('/', '')} management
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-2 relative z-10">
//                   {item.badge && (
//                     <span className={`
//                       px-2 py-1 rounded-full text-xs font-bold transition-all duration-300
//                       ${isActive
//                         ? 'bg-white text-blue-600'
//                         : 'bg-slate-600 text-slate-200 group-hover:bg-slate-500'
//                       }
//                     `}>
//                       {item.badge}
//                     </span>
//                   )}
//                   {isActive && (
//                     <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
//                   )}
//                 </div>
//               </Link>
//             )
//           })}
//         </nav>

//         {/* Sidebar Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-lg">
//           <div className="space-y-3">
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-300 group"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 rounded-lg bg-slate-600 group-hover:bg-slate-500 transition-colors">
//                   {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-400" />}
//                 </div>
//                 <span className="text-slate-200 font-medium">
//                   {darkMode ? 'Light Mode' : 'Dark Mode'}
//                 </span>
//               </div>
//               <div className={`w-12 h-6 rounded-full transition-all duration-300 relative
//                 ${darkMode ? 'bg-blue-500' : 'bg-slate-600'}`}
//               >
//                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300
//                   ${darkMode ? 'left-7' : 'left-1'}`}
//                 />
//               </div>
//             </button>

//             <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 cursor-pointer border border-slate-600/50">
//               <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <User className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-white font-semibold text-sm truncate">Administrator</p>
//                 <p className="text-slate-400 text-xs truncate">Super Admin Access</p>
//               </div>
//               <Settings className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area - Full Width */}
//       <div className="flex-1 flex flex-col overflow-hidden min-w-0">
//         {/* Header */}
//         <header className={`
//           sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300
//           ${darkMode
//             ? 'bg-gray-900/80 border-gray-700'
//             : 'bg-white/80 border-gray-200/60'
//           }
//         `}>
//           <div className="flex items-center justify-between px-8 py-4">
//             {/* Left Section */}
//             <div className="flex items-center space-x-6">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               </button>

//               <div className="flex items-center space-x-4">
//                 <div className="w-1 h-10 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full shadow-lg"></div>
//                 <div>
//                   <h2 className={`
//                     text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent
//                     ${darkMode
//                       ? 'from-blue-400 to-purple-400'
//                       : 'from-gray-900 to-blue-600'
//                     }
//                   `}>
//                     {getPageTitle()}
//                   </h2>
//                   <p className={`text-sm transition-colors duration-300
//                     ${darkMode ? 'text-gray-400' : 'text-gray-500'}
//                   `}>
//                     Real-time insights and management
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Section */}
//             <div className="flex items-center space-x-4">
//               {/* Stats Overview */}
//               <div className={`hidden xl:flex items-center space-x-6 px-6 py-2 rounded-2xl border transition-colors duration-300
//                 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}
//               `}>
//                 <div className="text-center">
//                   <p className={`text-2xl font-bold transition-colors duration-300
//                     ${darkMode ? 'text-white' : 'text-gray-900'}
//                   `}>24</p>
//                   <p className="text-xs text-blue-500 font-medium">New Today</p>
//                 </div>
//                 <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
//                 <div className="text-center">
//                   <p className={`text-2xl font-bold transition-colors duration-300
//                     ${darkMode ? 'text-white' : 'text-gray-900'}
//                   `}>1,248</p>
//                   <p className="text-xs text-green-500 font-medium">Total</p>
//                 </div>
//               </div>

//               {/* Notifications */}
//               <button className={`
//                 relative p-3 rounded-2xl transition-all duration-300 group
//                 ${darkMode
//                   ? 'hover:bg-gray-800'
//                   : 'hover:bg-gray-100'
//                 }
//               `}>
//                 <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//                 <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-bold text-white">3</span>
//                 </span>
//               </button>

//               {/* User Menu */}
//               <div className="relative">
//                 <button
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className={`
//                     flex items-center space-x-4 p-2 rounded-2xl transition-all duration-300 group
//                     ${darkMode
//                       ? 'hover:bg-gray-800'
//                       : 'hover:bg-gray-100'
//                     }
//                   `}
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                     <span className="text-white font-bold text-sm">A</span>
//                   </div>
//                   <div className="hidden lg:block text-left">
//                     <p className={`text-sm font-semibold transition-colors duration-300
//                       ${darkMode ? 'text-white' : 'text-gray-900'}
//                     `}>Administrator</p>
//                     <p className={`text-xs transition-colors duration-300
//                       ${darkMode ? 'text-gray-400' : 'text-gray-500'}
//                     `}>Super Admin</p>
//                   </div>
//                   <ChevronRight className={`w-4 h-4 transition-all duration-300
//                     ${userMenuOpen ? 'rotate-90 text-blue-500' : 'text-gray-400'}
//                   `} />
//                 </button>

//                 {/* User Dropdown Menu */}
//                 {userMenuOpen && (
//                   <div className={`
//                     absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-3xl
//                     shadow-2xl border backdrop-blur-xl py-3 z-50
//                     ${darkMode ? 'border-gray-700' : 'border-gray-200/50'}
//                   `}>
//                     <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                       <div className="flex items-center space-x-4">
//                         <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//                           <span className="text-white font-bold text-lg">A</span>
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-bold text-gray-900 dark:text-white text-lg">Administrator</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">admin@proqure.qa</p>
//                           <div className="flex items-center space-x-1 mt-1">
//                             <Shield className="w-4 h-4 text-yellow-500" />
//                             <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Super Admin</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="p-2 space-y-1">
//                       {[
//                         { icon: User, label: 'Profile & Settings', description: 'Manage your account' },
//                         { icon: BarChart3, label: 'Analytics', description: 'View usage statistics' },
//                         { icon: Settings, label: 'Preferences', description: 'Customize your experience' },
//                       ].map((item, index) => (
//                         <button key={index} className={`
//                           w-full flex items-center space-x-4 p-4 rounded-2xl text-left transition-all duration-200
//                           ${darkMode
//                             ? 'hover:bg-gray-700/50'
//                             : 'hover:bg-gray-50'
//                           }
//                         `}>
//                           <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-500/20">
//                             <item.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                           </div>
//                           <div>
//                             <p className={`font-medium transition-colors duration-200
//                               ${darkMode ? 'text-white' : 'text-gray-900'}
//                             `}>{item.label}</p>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
//                           </div>
//                         </button>
//                       ))}
//                     </div>

//                     <div className="p-3 border-t border-gray-200 dark:border-gray-700 mt-2">
//                       <button className={`
//                         w-full flex items-center space-x-4 p-4 rounded-2xl text-left transition-all duration-200
//                         bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20
//                         text-red-600 dark:text-red-400
//                       `}>
//                         <LogOut className="w-4 h-4" />
//                         <span className="font-medium">Sign Out</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content - Full Width */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="w-full h-full">
//             <Outlet />
//           </div>
//         </main>
//       </div>

//       {/* Close user menu when clicking outside */}
//       {userMenuOpen && (
//         <div
//           className="fixed inset-0 z-30"
//           onClick={() => setUserMenuOpen(false)}
//         />
//       )}
//     </div>
//   )
// }

// export default Layout
