//==============================deepseek======stylish===========


// import { useEffect, useState } from "react";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import {
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   RefreshCw,
//   Building2,
//   Boxes,
//   PackageOpen,
//   Users,
//   MonitorSmartphone,
//   Image as ImageIcon,
//   TrendingUp,
//   Eye,
//   ShoppingCart,
//   BarChart3,
//   Rocket,
//   Sparkles,
//   Zap,
//   Target,
//   Crown,
//   Shield,
//   Globe,
//   Store,
//   Warehouse,
//   Truck,
//   CreditCard,
//   Award,
//   Star,
//   Calendar,
//   Clock,
//   Download,
//   Share2,
//   Filter,
//   Search,
//   ArrowRight,
//   ChevronRight,
//   Plus,
//   MoreVertical
// } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     suppliers: 0,
//     categories: 0,
//     products: 0,
//     clients: 0,
//     banners: 0,
//     users: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchStats = async () => {
//     setRefreshing(true);
//     try {
//       const [
//         suppliersRes,
//         categoriesRes,
//         productsRes,
//         clientsRes,
//         bannersRes,
//         usersRes,
//       ] = await Promise.allSettled([
//         apiCalls.getSuppliers({ page: 1, limit: 1 }),
//         apiCalls.getCategories(),
//         apiCalls.getProducts({ page: 1, limit: 1 }),
//         apiCalls.getClients({ page: 1, limit: 1 }),
//         apiCalls.getBanners(),
//         apiCalls.getUsers({ page: 1, perPage: 1 }),
//       ]);

//       const process = (res, key) => {
//         if (res.status !== "fulfilled") return 0;
//         const d = res.value.data;
//         return (
//           d.pagination?.totalElements ||
//           d.data?.length ||
//           d[key]?.length ||
//           d.length ||
//           0
//         );
//       };

//       const newStats = {
//         suppliers: process(suppliersRes, "suppliers"),
//         categories: process(categoriesRes, "categories"),
//         products: process(productsRes, "products"),
//         clients: process(clientsRes, "clients"),
//         banners: process(bannersRes, "banners"),
//         users: process(usersRes, "users"),
//       };

//       setStats(newStats);
//       setLastUpdated(new Date());
//       setLoading(false);
//       toast.success("Dashboard updated successfully!");
//     } catch (err) {
//       setError("Failed to load dashboard");
//       toast.error("Failed to update dashboard data");
//       setLoading(false);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const cards = [
//     { 
//       title: "Total Suppliers", 
//       value: stats.suppliers, 
//       icon: Building2, 
//       color: "from-blue-500 to-cyan-500",
//       bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
//       borderColor: "border-blue-500/20",
//       trend: "+12%",
//       description: "Active vendors",
//       action: "Manage Suppliers",
//       link: "/suppliers"
//     },
//     { 
//       title: "Product Categories", 
//       value: stats.categories, 
//       icon: Boxes, 
//       color: "from-green-500 to-emerald-500",
//       bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
//       borderColor: "border-green-500/20",
//       trend: "+8%",
//       description: "Product groups",
//       action: "View Categories",
//       link: "/categories"
//     },
//     { 
//       title: "Total Products", 
//       value: stats.products, 
//       icon: PackageOpen, 
//       color: "from-purple-500 to-pink-500",
//       bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
//       borderColor: "border-purple-500/20",
//       trend: "+23%",
//       description: "In inventory",
//       action: "Browse Products",
//       link: "/products"
//     },
//     { 
//       title: "Active Clients", 
//       value: stats.clients, 
//       icon: Users, 
//       color: "from-orange-500 to-red-500",
//       bgColor: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
//       borderColor: "border-orange-500/20",
//       trend: "+15%",
//       description: "Registered clients",
//       action: "Client Portal",
//       link: "/clients"
//     },
//     { 
//       title: "Marketing Banners", 
//       value: stats.banners, 
//       icon: ImageIcon, 
//       color: "from-yellow-500 to-amber-500",
//       bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
//       borderColor: "border-yellow-500/20",
//       trend: "+5%",
//       description: "Active campaigns",
//       action: "Manage Banners",
//       link: "/banners"
//     },
//     { 
//       title: "System Users", 
//       value: stats.users, 
//       icon: MonitorSmartphone, 
//       color: "from-indigo-500 to-blue-500",
//       bgColor: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
//       borderColor: "border-indigo-500/20",
//       trend: "+3%",
//       description: "Platform users",
//       action: "User Management",
//       link: "/users"
//     },
//   ];

//   const quickActions = [
//     { icon: Plus, label: "Add Product", color: "from-green-500 to-emerald-500", link: "/products" },
//     { icon: Users, label: "New Client", color: "from-blue-500 to-cyan-500", link: "/clients/new" },
//     { icon: Building2, label: "Add Supplier", color: "from-purple-500 to-pink-500", link: "/suppliers/new" },
//     { icon: ImageIcon, label: "Create Banner", color: "from-orange-500 to-red-500", link: "/banners/new" },
//   ];

//   const recentActivities = [
//     { action: "New order placed", user: "John Doe", time: "2 min ago", type: "order" },
//     { action: "Product updated", user: "Sarah Wilson", time: "5 min ago", type: "update" },
//     { action: "New client registered", user: "Mike Johnson", time: "10 min ago", type: "client" },
//     { action: "Inventory updated", user: "System", time: "15 min ago", type: "inventory" },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
//         <div className="text-center space-y-6">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
//               <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
//                 <Rocket className="w-8 h-8 text-blue-600 animate-pulse" />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-2xl font-bold text-gray-800">Loading Dashboard</h3>
//             <p className="text-gray-600">Preparing your business insights...</p>
//             <div className="flex justify-center space-x-1">
//               {[0, 1, 2].map((i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 lg:p-8 space-y-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                   <Crown className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//               </div>
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   Procurement Hub
//                 </h1>
//                 <p className="text-gray-600 text-lg mt-2 flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-yellow-500" />
//                   Real-time business intelligence dashboard
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Last updated</p>
//               <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-green-500" />
//                 {lastUpdated?.toLocaleTimeString()}
//               </p>
//             </div>
//             <button
//               onClick={fetchStats}
//               disabled={refreshing}
//               className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
//             >
//               <RefreshCw className={`w-5 h-5 text-gray-700 ${refreshing ? 'animate-spin' : ''}`} />
//             </button>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {quickActions.map((action, index) => (
//             <button
//               key={index}
//               className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="text-left">
//                   <p className="text-sm font-medium opacity-90">Quick Add</p>
//                   <p className="font-bold text-lg">{action.label}</p>
//                 </div>
//                 <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
//                   <action.icon className="w-5 h-5" />
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Main Stats Grid - Big Amazon-style Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {cards.map((card, index) => (
//             <div
//               key={index}
//               className={`relative p-6 rounded-3xl shadow-2xl border-2 ${card.borderColor} ${card.bgColor} backdrop-blur-xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden`}
//             >
//               {/* Background Pattern */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
//               <div className="relative z-10">
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="space-y-2">
//                     <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
//                       {card.title}
//                     </p>
//                     <h2 className="text-5xl font-black text-gray-900">
//                       {card.value}
//                     </h2>
//                     <p className="text-gray-500 text-sm flex items-center gap-2">
//                       <TrendingUp className="w-4 h-4 text-green-500" />
//                       <span className="text-green-600 font-semibold">{card.trend}</span>
//                       from last month
//                     </p>
//                   </div>
//                   <div className={`p-4 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//                     <card.icon className="w-7 h-7" />
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-8">
//                   <div>
//                     <p className="text-gray-500 text-sm">{card.description}</p>
//                   </div>
//                   <button className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 group/btn">
//                     {card.action}
//                     <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </div>

//               {/* Hover Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Section */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Performance Metrics */}
//           <div className="xl:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                 <BarChart3 className="w-7 h-7 text-blue-600" />
//                 Performance Overview
//               </h3>
//               <div className="flex items-center gap-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
//                   <Filter className="w-4 h-4 text-gray-600" />
//                 </button>
//                 <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
//                   <Download className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {[
//                 { label: "Conversion Rate", value: "3.2%", change: "+0.5%", positive: true },
//                 { label: "Avg Order Value", value: "$245", change: "+12%", positive: true },
//                 { label: "Inventory Turnover", value: "8.2x", change: "-0.3x", positive: false },
//                 { label: "Customer Satisfaction", value: "94%", change: "+2%", positive: true },
//               ].map((metric, index) => (
//                 <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
//                   <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
//                   <div className="flex items-end justify-between">
//                     <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
//                     <span className={`text-sm font-semibold ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
//                       {metric.change}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Chart Placeholder */}
//             <div className="mt-6 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-200 text-center">
//               <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 font-medium">Interactive Analytics Chart</p>
//               <p className="text-gray-500 text-sm">Sales performance and trends visualization</p>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                 <Zap className="w-7 h-7 text-yellow-500" />
//                 Recent Activity
//               </h3>
//               <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-4">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
//                   <div className={`p-2 rounded-xl ${
//                     activity.type === 'order' ? 'bg-green-100 text-green-600' :
//                     activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
//                     activity.type === 'client' ? 'bg-purple-100 text-purple-600' :
//                     'bg-gray-100 text-gray-600'
//                   }`}>
//                     <ShoppingCart className="w-4 h-4" />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-900 font-medium truncate">{activity.action}</p>
//                     <p className="text-gray-500 text-sm">{activity.user} • {activity.time}</p>
//                   </div>
//                   <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
//                 </div>
//               ))}
//             </div>

//             {/* Quick Stats */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
//               <p className="text-sm opacity-80 mb-2">System Health</p>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">99.9%</p>
//                   <p className="text-sm opacity-80">Uptime</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-2xl font-bold">24/7</p>
//                   <p className="text-sm opacity-80">Monitoring</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Status */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-gray-900 font-semibold">All systems operational</span>
//           </div>
//           <div className="flex items-center gap-6 text-sm text-gray-600">
//             <span className="flex items-center gap-2">
//               <Shield className="w-4 h-4 text-green-500" />
//               Secure connection
//             </span>
//             <span className="flex items-center gap-2">
//               <Globe className="w-4 h-4 text-blue-500" />
//               Global CDN enabled
//             </span>
//             <span>Updated just now</span>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 10s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;

//===================grok=============

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCalls } from "../services/api";
import { toast } from "react-hot-toast";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Building2,
  Boxes,
  PackageOpen,
  Users,
  MonitorSmartphone,
  Image as ImageIcon,
  TrendingUp,
  Eye,
  ShoppingCart,
  BarChart3,
  Rocket,
  Sparkles,
  Zap,
  Target,
  Crown,
  Shield,
  Globe,
  Store,
  Warehouse,
  Truck,
  CreditCard,
  Award,
  Star,
  Calendar,
  Clock,
  Download,
  Share2,
  Filter,
  Search,
  ArrowRight,
  ChevronRight,
  Plus,
  MoreVertical
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    suppliers: 0,
    categories: 0,
    products: 0,
    clients: 0,
    banners: 0,
    users: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    setRefreshing(true);
    try {
      const [
        suppliersRes,
        categoriesRes,
        productsRes,
        clientsRes,
        bannersRes,
        usersRes,
      ] = await Promise.allSettled([
        apiCalls.getSuppliers({ page: 1, limit: 1 }),
        apiCalls.getCategories(),
        apiCalls.getProducts({ page: 1, limit: 1 }),
        apiCalls.getClients({ page: 1, limit: 1 }),
        apiCalls.getBanners(),
        apiCalls.getUsers({ page: 1, perPage: 1 }),
      ]);

      const process = (res, key) => {
        if (res.status !== "fulfilled") return 0;
        const d = res.value.data;
        return (
          d.pagination?.totalElements ||
          d.data?.length ||
          d[key]?.length ||
          d.length ||
          0
        );
      };

      const newStats = {
        suppliers: process(suppliersRes, "suppliers"),
        categories: process(categoriesRes, "categories"),
        products: process(productsRes, "products"),
        clients: process(clientsRes, "clients"),
        banners: process(bannersRes, "banners"),
        users: process(usersRes, "users"),
      };

      setStats(newStats);
      setLastUpdated(new Date());
      setLoading(false);
      toast.success("Dashboard updated successfully!");
    } catch (err) {
      setError("Failed to load dashboard");
      toast.error("Failed to update dashboard data");
      setLoading(false);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { 
      title: "Total Suppliers", 
      value: stats.suppliers, 
      icon: Building2, 
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      borderColor: "border-blue-500/20",
      trend: "+12%",
      description: "Active vendors",
      action: "Manage Suppliers",
      link: "/suppliers"
    },
    { 
      title: "Product Categories", 
      value: stats.categories, 
      icon: Boxes, 
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
      borderColor: "border-green-500/20",
      trend: "+8%",
      description: "Product groups",
      action: "View Categories",
      link: "/categories"
    },
    { 
      title: "Total Products", 
      value: stats.products, 
      icon: PackageOpen, 
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/20",
      trend: "+23%",
      description: "In inventory",
      action: "Browse Products",
      link: "/products"
    },
    { 
      title: "Active Clients", 
      value: stats.clients, 
      icon: Users, 
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      borderColor: "border-orange-500/20",
      trend: "+15%",
      description: "Registered clients",
      action: "Client Portal",
      link: "/clients"
    },
    { 
      title: "Marketing Banners", 
      value: stats.banners, 
      icon: ImageIcon, 
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-yellow-500/10 to-amber-500/10",
      borderColor: "border-yellow-500/20",
      trend: "+5%",
      description: "Active campaigns",
      action: "Manage Banners",
      link: "/banners"
    },
    { 
      title: "System Users", 
      value: stats.users, 
      icon: MonitorSmartphone, 
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10",
      borderColor: "border-indigo-500/20",
      trend: "+3%",
      description: "Platform users",
      action: "User Management",
      link: "/users"
    },
  ];

  const quickActions = [
    { icon: Plus, label: "Add Product", color: "from-green-500 to-emerald-500", link: "/products" },
    { icon: Users, label: "New Client", color: "from-blue-500 to-cyan-500", link: "/clients" },
    { icon: Building2, label: "Add Supplier", color: "from-purple-500 to-pink-500", link: "/suppliers" },
    { icon: ImageIcon, label: "Create Banner", color: "from-orange-500 to-red-500", link: "/banners" },
  ];

  const recentActivities = [
    { action: "New order placed", user: "Ramesh Kumar", time: "2 min ago", type: "order" },
    { action: "Product updated", user: "Shyam Singh", time: "5 min ago", type: "update" },
    { action: "New client registered", user: "Krishna Kumar", time: "10 min ago", type: "client" },
    { action: "Inventory updated", user: "System", time: "15 min ago", type: "inventory" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <Rocket className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-800">Loading Dashboard</h3>
            <p className="text-gray-600">Preparing your business insights...</p>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 lg:p-8 space-y-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Procurement Hub
                </h1>
                <p className="text-gray-600 text-lg mt-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Real-time business intelligence dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                {lastUpdated?.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={fetchStats}
              disabled={refreshing}
              className="cursor-pointer  p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-700 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.link)}
              className={`cursor-pointer  p-4 bg-gradient-to-r ${action.color} text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-sm font-medium opacity-90">Quick Add</p>
                  <p className="font-bold text-lg">{action.label}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                  <action.icon className="w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Stats Grid - Big Amazon-style Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-3xl shadow-2xl border-2 ${card.borderColor} ${card.bgColor} backdrop-blur-xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
                      {card.title}
                    </p>
                    <h2 className="text-5xl font-black text-gray-900">
                      {card.value}
                    </h2>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 font-semibold">{card.trend}</span>
                      from last month
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-7 h-7" />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div>
                    <p className="text-gray-500 text-sm">{card.description}</p>
                  </div>
                  <button 
                    onClick={() => navigate(card.link)}
                    className="cursor-pointer  flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 group/btn"
                  >
                    {card.action}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         // Performance Metrics 
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-blue-600" />
                Performance Overview
              </h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Conversion Rate", value: "3.2%", change: "+0.5%", positive: true },
                { label: "Avg Order Value", value: "$245", change: "+12%", positive: true },
                { label: "Inventory Turnover", value: "8.2x", change: "-0.3x", positive: false },
                { label: "Customer Satisfaction", value: "94%", change: "+2%", positive: true },
              ].map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className={`text-sm font-semibold ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

           // Chart Placeholder 
            <div className="mt-6 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-200 text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Interactive Analytics Chart</p>
              <p className="text-gray-500 text-sm">Sales performance and trends visualization</p>
            </div>
          </div>

      // Recent Activity 
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Zap className="w-7 h-7 text-yellow-500" />
                Recent Activity
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <div className={`p-2 rounded-xl ${
                    activity.type === 'order' ? 'bg-green-100 text-green-600' :
                    activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'client' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium truncate">{activity.action}</p>
                    <p className="text-gray-500 text-sm">{activity.user} • {activity.time}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}
            </div>

           // Quick Stats 
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
              <p className="text-sm opacity-80 mb-2">System Health</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-sm opacity-80">Uptime</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">Monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Footer Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-900 font-semibold">All systems operational</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              Secure connection
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Global CDN enabled
            </span>
            <span>Updated just now</span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

//======================deepskke professional==========

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import {
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   RefreshCw,
//   Building2,
//   Boxes,
//   PackageOpen,
//   Users,
//   MonitorSmartphone,
//   Image as ImageIcon,
//   TrendingUp,
//   Eye,
//   ShoppingCart,
//   BarChart3,
//   Rocket,
//   Sparkles,
//   Zap,
//   Target,
//   Crown,
//   Shield,
//   Globe,
//   Store,
//   Warehouse,
//   Truck,
//   CreditCard,
//   Award,
//   Star,
//   Calendar,
//   Clock,
//   Download,
//   Share2,
//   Filter,
//   Search,
//   ArrowRight,
//   ChevronRight,
//   Plus,
//   MoreVertical,
//   ArrowUpRight,
//   Activity,
//   DollarSign,
//   ShoppingBag,
//   BarChart,
//   PieChart,
//   TrendingDown
// } from "lucide-react";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [stats, setStats] = useState({
//     suppliers: 0,
//     categories: 0,
//     products: 0,
//     clients: 0,
//     banners: 0,
//     users: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [timeRange, setTimeRange] = useState("month");

//   const fetchStats = async () => {
//     setRefreshing(true);
//     try {
//       const [
//         suppliersRes,
//         categoriesRes,
//         productsRes,
//         clientsRes,
//         bannersRes,
//         usersRes,
//       ] = await Promise.allSettled([
//         apiCalls.getSuppliers({ page: 1, limit: 1 }),
//         apiCalls.getCategories(),
//         apiCalls.getProducts({ page: 1, limit: 1 }),
//         apiCalls.getClients({ page: 1, limit: 1 }),
//         apiCalls.getBanners(),
//         apiCalls.getUsers({ page: 1, perPage: 1 }),
//       ]);

//       const process = (res, key) => {
//         if (res.status !== "fulfilled") return 0;
//         const d = res.value.data;
//         return (
//           d.pagination?.totalElements ||
//           d.data?.length ||
//           d[key]?.length ||
//           d.length ||
//           0
//         );
//       };

//       const newStats = {
//         suppliers: process(suppliersRes, "suppliers"),
//         categories: process(categoriesRes, "categories"),
//         products: process(productsRes, "products"),
//         clients: process(clientsRes, "clients"),
//         banners: process(bannersRes, "banners"),
//         users: process(usersRes, "users"),
//       };

//       setStats(newStats);
//       setLastUpdated(new Date());
//       setLoading(false);
//       toast.success("Dashboard updated successfully!");
//     } catch (err) {
//       setError("Failed to load dashboard");
//       toast.error("Failed to update dashboard data");
//       setLoading(false);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const performanceMetrics = [
//     { label: "Revenue", value: "₹2,84,299", change: "+12.5%", positive: true, icon: DollarSign },
//     { label: "Orders", value: "1,428", change: "+8.2%", positive: true, icon: ShoppingBag },
//     { label: "Conversion", value: "3.8%", change: "+1.2%", positive: true, icon: TrendingUp },
//     { label: "Avg. Order", value: "₹1,992", change: "-2.1%", positive: false, icon: TrendingDown },
//   ];

//   const cards = [
//     { 
//       title: "Total Suppliers", 
//       value: stats.suppliers, 
//       icon: Building2, 
//       color: "from-blue-600 to-cyan-600",
//       bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
//       borderColor: "border-blue-200",
//       trend: "+12%",
//       description: "Active vendor partners",
//       action: "Manage Suppliers",
//       link: "/suppliers",
//       trendValue: "+24",
//       chartData: [65, 59, 80, 81, 56, 55, 40]
//     },
//     { 
//       title: "Product Categories", 
//       value: stats.categories, 
//       icon: Boxes, 
//       color: "from-emerald-600 to-green-600",
//       bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
//       borderColor: "border-emerald-200",
//       trend: "+8%",
//       description: "Organized product groups",
//       action: "View Categories",
//       link: "/categories",
//       trendValue: "+8",
//       chartData: [28, 48, 40, 19, 86, 27, 90]
//     },
//     { 
//       title: "Total Products", 
//       value: stats.products, 
//       icon: PackageOpen, 
//       color: "from-violet-600 to-purple-600",
//       bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
//       borderColor: "border-violet-200",
//       trend: "+23%",
//       description: "Active inventory items",
//       action: "Browse Products",
//       link: "/products",
//       trendValue: "+142",
//       chartData: [45, 25, 60, 30, 70, 40, 85]
//     },
//     { 
//       title: "Active Clients", 
//       value: stats.clients, 
//       icon: Users, 
//       color: "from-orange-600 to-red-600",
//       bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
//       borderColor: "border-orange-200",
//       trend: "+15%",
//       description: "Registered business clients",
//       action: "Client Portal",
//       link: "/clients",
//       trendValue: "+38",
//       chartData: [30, 45, 35, 50, 40, 60, 55]
//     },
//     { 
//       title: "Marketing Banners", 
//       value: stats.banners, 
//       icon: ImageIcon, 
//       color: "from-amber-600 to-yellow-600",
//       bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
//       borderColor: "border-amber-200",
//       trend: "+5%",
//       description: "Active campaigns running",
//       action: "Manage Banners",
//       link: "/banners",
//       trendValue: "+3",
//       chartData: [55, 60, 45, 70, 50, 65, 75]
//     },
//     { 
//       title: "System Users", 
//       value: stats.users, 
//       icon: MonitorSmartphone, 
//       color: "from-indigo-600 to-blue-600",
//       bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
//       borderColor: "border-indigo-200",
//       trend: "+3%",
//       description: "Platform administrators",
//       action: "User Management",
//       link: "/users",
//       trendValue: "+5",
//       chartData: [20, 35, 40, 30, 45, 35, 50]
//     },
//   ];

//   const quickActions = [
//     { icon: Plus, label: "Add Product", color: "from-emerald-500 to-green-500", link: "/products", description: "Create new product" },
//     { icon: Users, label: "New Client", color: "from-blue-500 to-cyan-500", link: "/clients", description: "Register client" },
//     { icon: Building2, label: "Add Supplier", color: "from-violet-500 to-purple-500", link: "/suppliers", description: "Onboard vendor" },
//     { icon: ImageIcon, label: "Create Banner", color: "from-orange-500 to-red-500", link: "/banners", description: "New campaign" },
//   ];

//   const recentActivities = [
//     { action: "New bulk order placed", user: "Ramesh Kumar", time: "2 min ago", type: "order", amount: "₹42,800" },
//     { action: "Product inventory updated", user: "Shyam Singh", time: "5 min ago", type: "update", items: "24 products" },
//     { action: "New enterprise client registered", user: "Krishna Kumar", time: "10 min ago", type: "client", plan: "Enterprise" },
//     { action: "Stock alert triggered", user: "System", time: "15 min ago", type: "alert", product: "Wireless Headphones" },
//     { action: "Monthly report generated", user: "Automation", time: "1 hour ago", type: "report", period: "November" },
//   ];

//   const MiniSparkline = ({ data, positive }) => (
//     <div className="flex items-end h-8 gap-0.5">
//       {data.map((value, index) => (
//         <div
//           key={index}
//           className={`w-1.5 rounded-t ${
//             positive ? 'bg-green-400' : 'bg-red-400'
//           }`}
//           style={{ height: `${(value / 100) * 32}px` }}
//         />
//       ))}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 flex items-center justify-center p-8">
//         <div className="text-center space-y-6">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
//               <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
//                 <Rocket className="w-8 h-8 text-blue-600 animate-pulse" />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-2xl font-bold text-gray-800">Loading Dashboard</h3>
//             <p className="text-gray-600">Preparing your business insights...</p>
//             <div className="flex justify-center space-x-1">
//               {[0, 1, 2].map((i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 p-6 lg:p-8 space-y-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/3 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/3 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/3 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                   <Crown className="w-7 h-7 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
//               </div>
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   Procurement Hub
//                 </h1>
//                 <p className="text-gray-600 text-lg mt-2 flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-yellow-500" />
//                   Real-time business intelligence dashboard
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Last updated</p>
//               <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                 <Clock className="w-4 h-4 text-green-500" />
//                 {lastUpdated?.toLocaleTimeString()}
//               </p>
//             </div>
//             <button
//               onClick={fetchStats}
//               disabled={refreshing}
//               className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 group"
//             >
//               <RefreshCw className={`w-5 h-5 text-gray-700 ${refreshing ? 'animate-spin' : ''} group-hover:rotate-180 transition-transform`} />
//             </button>
//           </div>
//         </div>

//         {/* Performance Metrics Bar */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {performanceMetrics.map((metric, index) => (
//             <div key={index} className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
//               <div className="flex items-center justify-between mb-3">
//                 <metric.icon className={`w-8 h-8 ${
//                   metric.positive ? 'text-green-600' : 'text-red-600'
//                 }`} />
//                 <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
//                   metric.positive 
//                     ? 'bg-green-100 text-green-700' 
//                     : 'bg-red-100 text-red-700'
//                 }`}>
//                   {metric.change}
//                 </span>
//               </div>
//               <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
//               <p className="text-sm text-gray-600">{metric.label}</p>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {quickActions.map((action, index) => (
//             <button
//               key={index}
//               onClick={() => navigate(action.link)}
//               className={`p-5 bg-gradient-to-r ${action.color} text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-left`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <action.icon className="w-6 h-6 text-white/90" />
//                 <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
//               </div>
//               <p className="font-bold text-lg mb-1">{action.label}</p>
//               <p className="text-white/70 text-sm">{action.description}</p>
//             </button>
//           ))}
//         </div>

//         {/* Main Stats Grid - Professional Cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//           {cards.map((card, index) => (
//             <div
//               key={index}
//               onClick={() => navigate(card.link)}
//               className={`relative p-6 rounded-3xl shadow-xl border ${card.borderColor} ${card.bgColor} hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group cursor-pointer overflow-hidden`}
//             >
//               {/* Background Gradient */}
//               <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
//               <div className="relative z-10">
//                 <div className="flex items-start justify-between mb-6">
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-3 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg`}>
//                         <card.icon className="w-6 h-6" />
//                       </div>
//                       <div>
//                         <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">
//                           {card.title}
//                         </p>
//                         <h2 className="text-4xl font-black text-gray-900 mt-1">
//                           {card.value}
//                         </h2>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-4">
//                       <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
//                         card.trend.includes('+') 
//                           ? 'bg-green-100 text-green-700' 
//                           : 'bg-red-100 text-red-700'
//                       }`}>
//                         {card.trend.includes('+') ? (
//                           <TrendingUp className="w-3 h-3" />
//                         ) : (
//                           <TrendingDown className="w-3 h-3" />
//                         )}
//                         {card.trend}
//                       </span>
//                       <span className="text-gray-500 text-sm">
//                         {card.trendValue} this month
//                       </span>
//                     </div>
//                   </div>
                  
//                   <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
//                     <ArrowUpRight className="w-5 h-5 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Mini Chart */}
//                 <div className="flex items-center justify-between mt-6">
//                   <div className="flex-1">
//                     <MiniSparkline data={card.chartData} positive={card.trend.includes('+')} />
//                   </div>
//                   <div className="text-right">
//                     <p className="text-gray-500 text-sm">{card.description}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Section */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Recent Activity */}
//           <div className="xl:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
//                 <Activity className="w-7 h-7 text-blue-600" />
//                 Recent Activity
//               </h3>
//               <div className="flex items-center gap-2">
//                 <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
//                   View All
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {recentActivities.map((activity, index) => (
//                 <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-200">
//                   <div className={`p-3 rounded-xl ${
//                     activity.type === 'order' ? 'bg-green-100 text-green-600' :
//                     activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
//                     activity.type === 'client' ? 'bg-purple-100 text-purple-600' :
//                     activity.type === 'alert' ? 'bg-red-100 text-red-600' :
//                     'bg-gray-100 text-gray-600'
//                   }`}>
//                     {activity.type === 'order' && <ShoppingCart className="w-5 h-5" />}
//                     {activity.type === 'update' && <PackageOpen className="w-5 h-5" />}
//                     {activity.type === 'client' && <Users className="w-5 h-5" />}
//                     {activity.type === 'alert' && <Zap className="w-5 h-5" />}
//                     {activity.type === 'report' && <BarChart3 className="w-5 h-5" />}
//                   </div>
                  
//                   <div className="flex-1 min-w-0">
//                     <p className="text-gray-900 font-semibold truncate">{activity.action}</p>
//                     <div className="flex items-center gap-3 mt-1">
//                       <p className="text-gray-500 text-sm">{activity.user}</p>
//                       <span className="text-gray-300">•</span>
//                       <p className="text-gray-500 text-sm">{activity.time}</p>
//                       {activity.amount && (
//                         <>
//                           <span className="text-gray-300">•</span>
//                           <p className="text-green-600 text-sm font-semibold">{activity.amount}</p>
//                         </>
//                       )}
//                     </div>
//                   </div>
                  
//                   <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* System Status & Quick Stats */}
//           <div className="space-y-6">
//             {/* System Health */}
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
//               <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6">
//                 <Shield className="w-7 h-7 text-green-600" />
//                 System Health
//               </h3>
              
//               <div className="space-y-4">
//                 {[
//                   { service: "API Server", status: "operational", latency: "42ms" },
//                   { service: "Database", status: "operational", latency: "18ms" },
//                   { service: "Cache", status: "degraded", latency: "128ms" },
//                   { service: "File Storage", status: "operational", latency: "56ms" },
//                 ].map((service, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-2 h-2 rounded-full ${
//                         service.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
//                       } animate-pulse`}></div>
//                       <span className="font-medium text-gray-900">{service.service}</span>
//                     </div>
//                     <div className="text-right">
//                       <span className={`text-sm font-semibold ${
//                         service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'
//                       }`}>
//                         {service.status}
//                       </span>
//                       <p className="text-gray-500 text-xs">{service.latency}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-2xl">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Award className="w-5 h-5 text-yellow-400" />
//                 Performance Score
//               </h3>
              
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Uptime</span>
//                   <span className="text-2xl font-bold text-green-400">99.97%</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Response Time</span>
//                   <span className="text-2xl font-bold text-blue-400">186ms</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-300">Satisfaction</span>
//                   <span className="text-2xl font-bold text-yellow-400">4.8/5</span>
//                 </div>
//               </div>
              
//               <div className="mt-6 pt-4 border-t border-gray-700">
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-400">Last incident</span>
//                   <span className="text-gray-300">45 days ago</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Status */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//             <span className="text-gray-900 font-semibold">All systems operational</span>
//           </div>
//           <div className="flex items-center gap-6 text-sm text-gray-600">
//             <span className="flex items-center gap-2">
//               <Globe className="w-4 h-4 text-blue-500" />
//               Mumbai, IN
//             </span>
//             <span className="flex items-center gap-2">
//               <Clock className="w-4 h-4 text-green-500" />
//               Real-time sync
//             </span>
//             <span>v2.4.1</span>
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }
//         .animate-blob {
//           animation: blob 10s infinite;
//         }
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;