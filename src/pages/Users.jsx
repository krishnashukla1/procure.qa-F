// import { useState, useEffect, useCallback } from "react";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import Modal from "../components/Modal";
// import {
//   User,
//   Edit,
//   Trash2,
//   Plus,
//   RefreshCw,
//   Loader2,
//   X,
//   AlertTriangle,
//   Sparkles,
//   Shield,
//   Zap,
//   Star,
//   Target,
//   ArrowUpDown,
//   Filter,
//   Search,
//   Grid3X3,
//   Mail,
//   Phone,
//   Calendar,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "",
//     status: "active",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       console.log("🔄 Fetching users...");
//       const response = await apiCalls.getUsers({ page: 1, perPage: 50 });
//       console.log("✅ API Response:", response.data);
//       const userData = response.data.data || response.data.users || [];
//       setUsers(Array.isArray(userData) ? userData : []);
//     } catch (error) {
//       console.error("❌ Error fetching users:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleCreateOrUpdate = async (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.email)
//       return toast.error("Name and email are required");

//     setLoading(true);
//     try {
//       if (editingId) {
//         await apiCalls.updateUser(editingId, formData);
//         toast.success("🎉 User updated successfully!");
//       } else {
//         await apiCalls.createUser(formData);
//         toast.success("✨ User created successfully!");
//       }

//       setShowModal(false);
//       resetForm();
//       fetchUsers();
//     } catch (error) {
//       console.error("❌ Error saving user:", error);
//       toast.error(error.response?.data?.message || "Failed to save user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: "", email: "", phone: "", role: "", status: "active" });
//     setEditingId(null);
//   };

//   const handleEdit = (user) => {
//     setFormData({
//       name: user.name || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       role: user.role || "",
//       status: user.status || "active",
//     });
//     setEditingId(user._id);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await apiCalls.deleteUser(id);
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//       toast.success("🗑️ User deleted successfully!");
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete user");
//       fetchUsers();
//     }
//   };

//   const filteredUsers = users.filter((user) =>
//     `${user.name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     const aValue = a[sortConfig.key];
//     const bValue = b[sortConfig.key];

//     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const columns = [
//     {
//       key: "name",
//       label: "Name",
//       sortable: true,
//       render: (name, row) => (
//         <div className="flex items-center gap-3 group">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
//             {name?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//           <div>
//             <p className="font-semibold text-gray-200">{name || "Unnamed User"}</p>
//             <p className="text-xs text-gray-400">{row.role || "User"}</p>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "email",
//       label: "Email",
//       sortable: true,
//       render: (email) => (
//         <div className="flex items-center gap-2 text-gray-200">
//           <Mail className="w-4 h-4 text-purple-400" />
//           <span className="truncate">{email || "No email"}</span>
//         </div>
//       ),
//     },
//     {
//       key: "phone",
//       label: "Phone",
//       sortable: true,
//       render: (phone) => (
//         <div className="flex items-center gap-2 text-gray-200">
//           <Phone className="w-4 h-4 text-green-400" />
//           <span>{phone || "No phone"}</span>
//         </div>
//       ),
//     },
//     {
//       key: "status",
//       label: "Status",
//       sortable: true,
//       render: (status) => (
//         <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
//           status === "active" 
//             ? "bg-green-500/20 text-green-300 border border-green-500/30" 
//             : "bg-red-500/20 text-red-300 border border-red-500/30"
//         }`}>
//           {status === "active" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
//           {status?.toUpperCase() || "INACTIVE"}
//         </div>
//       ),
//     },
//     {
//       key: "lastLogin",
//       label: "Last Login",
//       sortable: true,
//       render: (date) => (
//         <div className="text-sm text-gray-200">
//           {date ? new Date(date).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           }) : "Never"}
//         </div>
//       ),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Edit User"
//           >
//             <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Delete User"
//           >
//             <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
//         </div>

//         <div className="text-center space-y-6 relative z-10">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
//               <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
//                 <Sparkles className="w-8 h-8 text-white animate-pulse" />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
//               Loading Users
//             </h3>
//             <p className="text-purple-200/80 font-medium">
//               Preparing your user management panel...
//             </p>
//             <div className="flex justify-center space-x-1">
//               {[0, 1, 2].map((i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 lg:p-8 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${10 + Math.random() * 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Hero Header */}
//         <div className="text-center mb-8 lg:mb-12 pt-8">
//           <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/10 mb-6 shadow-2xl">
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//             <span className="text-lg font-semibold text-white">
//               System Users
//             </span>
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//           </div>

//           <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
//             User Management
//           </h1>
//           <p className="text-xl lg:text-2xl text-purple-200/90 max-w-4xl mx-auto leading-relaxed font-medium">
//             Manage your platform's users, roles, and permissions with secure and intuitive controls.
//           </p>

//           <div className="flex justify-center mt-8 flex-wrap gap-3">
//             {[
//               {
//                 icon: Shield,
//                 text: "Role Management",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: Zap,
//                 text: "Secure Access",
//                 color: "from-green-500 to-emerald-500",
//               },
//               {
//                 icon: Star,
//                 text: "Audit Logs",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: Target,
//                 text: "Permission Control",
//                 color: "from-orange-500 to-red-500",
//               },
//             ].map((item, index) => (
//               <span
//                 key={index}
//                 className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold`}
//               >
//                 <item.icon className="w-4 h-4" />
//                 {item.text}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                   <Grid3X3 className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 shadow-lg"></div>
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold text-white">
//                   User Directory
//                 </h2>
//                 <p className="text-purple-200/80 font-medium">
//                   Manage platform administrators and team members
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               {/* Search Bar */}
//               <div className="relative flex-1 lg:flex-initial">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/70" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-lg"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={fetchUsers}
//                   disabled={loading}
//                   className="flex items-center gap-3 px-6 py-3 bg-white/5 text-purple-200 rounded-2xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl border border-white/10 hover:border-white/20 font-semibold"
//                 >
//                   <RefreshCw
//                     className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
//                   />
//                   Refresh
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowModal(true);
//                     resetForm();
//                   }}
//                   className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold group"
//                 >
//                   <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
//                   Add User
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               label: "Total Users",
//               value: users.length,
//               color: "from-blue-500 to-cyan-500",
//               icon: User,
//             },
//             {
//               label: "Active Users",
//               value: Array.isArray(users) ? users.filter(u => u.status === "active").length : 0,
//               color: "from-green-500 to-emerald-500",
//               icon: CheckCircle,
//             },
//             {
//               label: "Admins",
//               value: Array.isArray(users) ? users.filter(u => u.role === "admin").length : 0,
//               color: "from-purple-500 to-pink-500",
//               icon: Shield,
//             },
//             {
//               label: "Last Login",
//               value: "Today",
//               color: "from-orange-500 to-red-500",
//               icon: Calendar,
//             },
//           ].map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <stat.icon
//                   className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
//                 />
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
//               </div>
//               <h3 className="text-sm font-semibold text-purple-200/80 mb-2">
//                 {stat.label}
//               </h3>
//               <p
//                 className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
//               >
//                 {stat.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Users Table Section */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
//           <div className="p-8 border-b border-white/10">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <div>
//                 <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
//                   <User className="w-6 h-6 text-blue-400" />
                  
//                   <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold">
//                     {sortedUsers.length} users
//                   </span>
//                 </h3>
//                 <p className="text-purple-200/70 font-medium">
//                   Manage roles, permissions, and access levels
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => setSearchTerm("")}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Clear Filters
//                 </button>
//                 <button 
//                   onClick={() => setSortConfig({ key: null, direction: "asc" })}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300"
//                 >
//                   <ArrowUpDown className="w-4 h-4" />
//                   Reset Sort
//                 </button>
//               </div>
//             </div>
//           </div>

//           {sortedUsers.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
//                 <User className="w-16 h-16 text-purple-400/50" />
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-4">
//                 No Users Found
//               </h3>
//               <p className="text-purple-200/70 mb-8 text-lg max-w-md mx-auto">
//                 Start by adding your first system user to get started with management
//               </p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold text-lg"
//               >
//                 Add First User
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <div className="min-w-full">
//                 <div className="bg-white/5 border-b border-white/10">
//                   <div className="grid grid-cols-12 gap-4 px-8 py-4 text-sm font-semibold text-purple-200/80">
//                     {columns.map((column) => (
//                       <div
//                         key={column.key}
//                         className="col-span-2 flex items-center gap-2"
//                       >
//                         {column.label}
//                         {column.sortable && (
//                           <button
//                             onClick={() => requestSort(column.key)}
//                             className="hover:text-white transition-colors duration-200"
//                           >
//                             <ArrowUpDown className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="divide-y divide-white/10">
//                   {sortedUsers.map((user, index) => (
//                     <div
//                       key={user._id}
//                       className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-white/5 transition-all duration-300 group"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       {columns.map((column) => (
//                         <div
//                           key={column.key}
//                           className="col-span-2 flex items-center"
//                         >
//                           {column.render ? (
//                             column.render(user[column.key], user)
//                           ) : (
//                             <span className="text-white">
//                               {user[column.key]}
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Create/Edit Modal */}
//         <Modal
//           title={
//             <div className="flex items-center gap-4 px-12 py-2">
//               {editingId ? (
//                 <>
//                   <Edit className="w-7 h-7 text-blue-400 drop-shadow-glow" />
//                   <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold text-3xl tracking-wide drop-shadow">
//                     Edit User
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-7 h-7 text-green-400 drop-shadow-glow" />
//                   <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold text-3xl tracking-wide drop-shadow">
//                     Add User
//                   </span>
//                 </>
//               )}
//             </div>
//           }
//           open={showModal}
//           onClose={() => {
//             setShowModal(false);
//             resetForm();
//           }}
//           className="!p-0"
//           size="xl"
//         >
//           <div className="p-8 bg-gradient-to-br from-[#0f0f11] via-[#111113] to-[#0b0b0d] rounded-3xl shadow-2xl border border-white/10 backdrop-blur-2xl animate-in fade-in duration-300">
//             <form onSubmit={handleCreateOrUpdate} className="space-y-6">
//               {/* Name */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <User className="w-5 h-5 text-blue-400 drop-shadow-glow" />
//                   Full Name <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       name: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500/40 
//                      focus:border-blue-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter full name"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Mail className="w-5 h-5 text-green-400 drop-shadow-glow" />
//                   Email <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       email: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-green-500/40 
//                      focus:border-green-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Phone className="w-5 h-5 text-purple-400 drop-shadow-glow" />
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       phone: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-purple-500/40 
//                      focus:border-purple-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter phone number (optional)"
//                 />
//               </div>

//               {/* Role */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Shield className="w-5 h-5 text-orange-400 drop-shadow-glow" />
//                   Role
//                 </label>
//                 <select
//                   value={formData.role}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       role: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-orange-500/40 
//                      focus:border-orange-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                 >
//                   <option value="">Select Role</option>
//                   <option value="admin">Admin</option>
//                   <option value="moderator">Moderator</option>
//                   <option value="user">User</option>
//                 </select>
//               </div>

//               {/* Status */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Zap className="w-5 h-5 text-yellow-400 drop-shadow-glow" />
//                   Status
//                 </label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       status: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-yellow-500/40 
//                      focus:border-yellow-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-6 pt-4">
//                 {/* Cancel */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     resetForm();
//                   }}
//                   disabled={loading}
//                   className="flex-1 px-8 py-4 border-2 border-white/20 text-white rounded-2xl 
//                      hover:border-white/40 hover:bg-white/10 transition-all duration-300 
//                      font-bold backdrop-blur-lg shadow-xl"
//                 >
//                   Cancel
//                 </button>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 flex items-center justify-center gap-3 px-8 py-4 
//                      bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl 
//                      shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed 
//                      transition-all duration-300 font-bold hover:scale-105 group"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-6 h-6 animate-spin" />
//                       <span className="animate-pulse">
//                         {editingId ? "Updating..." : "Creating..."}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
//                       {editingId ? "Update User" : "Add User"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </Modal>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
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
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }
//         .animate-blob {
//           animation: blob 10s infinite;
//         }
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
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

// export default Users;

//================stylish=================


// import { useState, useEffect, useCallback } from "react";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import Modal from "../components/Modal";
// import {
//   User,
//   Edit,
//   Trash2,
//   Plus,
//   RefreshCw,
//   Loader2,
//   X,
//   AlertTriangle,
//   Sparkles,
//   Shield,
//   Zap,
//   Star,
//   Target,
//   ArrowUpDown,
//   Filter,
//   Search,
//   Grid3X3,
//   Mail,
//   Phone,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Lock,
// } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phoneNumber: "",
//     role: "",
//     password: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = useCallback(async () => {
//     setLoading(true);
//     try {
//       console.log("🔄 Fetching users...");
//       const response = await apiCalls.getUsers({ page: 1, perPage: 50 });
//       console.log("✅ API Response:", response.data);
//       const userData = response.data.data?.users || [];
//       setUsers(Array.isArray(userData) ? userData : []);
//     } catch (error) {
//       console.error("❌ Error fetching users:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleCreateOrUpdate = async (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.role || !formData.phoneNumber)
//       return toast.error("Username, email, role, and phone number are required");

//     if (!editingId && !formData.password)
//       return toast.error("Password is required for new users");

//     setLoading(true);
//     try {
//       if (editingId) {
//         await apiCalls.updateUser(editingId, formData);
//         toast.success("🎉 User updated successfully!");
//       } else {
//         await apiCalls.createUser(formData);
//         toast.success("✨ User created successfully!");
//       }

//       setShowModal(false);
//       resetForm();
//       fetchUsers();
//     } catch (error) {
//       console.error("❌ Error saving user:", error);
//       toast.error(error.response?.data?.message || "Failed to save user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ username: "", email: "", phoneNumber: "", role: "", password: "" });
//     setEditingId(null);
//   };

//   const handleEdit = (user) => {
//     setFormData({
//       username: user.username || "",
//       email: user.email || "",
//       phoneNumber: user.phoneNumber || "",
//       role: user.role || "",
//       password: "",
//     });
//     setEditingId(user._id);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await apiCalls.deleteUser(id);
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//       toast.success("🗑️ User deleted successfully!");
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete user");
//       fetchUsers();
//     }
//   };

//   const filteredUsers = users.filter((user) =>
//     `${user.username} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     const aValue = a[sortConfig.key];
//     const bValue = b[sortConfig.key];

//     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const columns = [
//     {
//       key: "username",
//       label: "Username",
//       sortable: true,
//       render: (username, row) => (
//         <div className="flex items-center gap-3 group">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-xl transition-all duration-300">
//             {username?.charAt(0)?.toUpperCase() || "U"}
//           </div>
//           <div>
//             <p className="font-semibold text-gray-200">{username || "Unnamed User"}</p>
//             <p className="text-xs text-gray-400">{row.role || "User"}</p>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "email",
//       label: "Email",
//       sortable: true,
//       render: (email) => (
//         <div className="flex items-center gap-2 text-gray-200">
//           <Mail className="w-4 h-4 text-purple-400" />
//           <span className="truncate">{email || "No email"}</span>
//         </div>
//       ),
//     },
//     {
//       key: "phoneNumber",
//       label: "Phone",
//       sortable: true,
//       render: (phoneNumber) => (
//         <div className="flex items-center gap-2 text-gray-200">
//           <Phone className="w-4 h-4 text-green-400" />
//           <span>{phoneNumber || "No phone"}</span>
//         </div>
//       ),
//     },
//     {
//       key: "role",
//       label: "Role",
//       sortable: true,
//       render: (role) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//           role === "Admin" 
//             ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
//             : "bg-green-500/20 text-green-300 border border-green-500/30"
//         }`}>
//           {role || "User"}
//         </span>
//       ),
//     },
//     {
//       key: "createdAt",
//       label: "Created",
//       sortable: true,
//       render: (date) => (
//         <div className="text-sm text-gray-200">
//           {date ? new Date(date).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           }) : "Unknown"}
//         </div>
//       ),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Edit User"
//           >
//             <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Delete User"
//           >
//             <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
//         </div>

//         <div className="text-center space-y-6 relative z-10">
//           <div className="relative">
//             <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
//               <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
//                 <Sparkles className="w-8 h-8 text-white animate-pulse" />
//               </div>
//             </div>
//           </div>
//           <div className="space-y-3">
//             <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
//               Loading Users
//             </h3>
//             <p className="text-purple-200/80 font-medium">
//               Preparing your user management panel...
//             </p>
//             <div className="flex justify-center space-x-1">
//               {[0, 1, 2].map((i) => (
//                 <div
//                   key={i}
//                   className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
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
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 lg:p-8 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${10 + Math.random() * 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Hero Header */}
//         <div className="text-center mb-8 lg:mb-12 pt-8">
//           <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/10 mb-6 shadow-2xl">
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//             <span className="text-lg font-semibold text-white">
//               System Users
//             </span>
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//           </div>

//           <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
//             User Management
//           </h1>
//           <p className="text-xl lg:text-2xl text-purple-200/90 max-w-4xl mx-auto leading-relaxed font-medium">
//             Manage your platform's users, roles, and permissions with secure and intuitive controls.
//           </p>

//           <div className="flex justify-center mt-8 flex-wrap gap-3">
//             {[
//               {
//                 icon: Shield,
//                 text: "Role Management",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: Zap,
//                 text: "Secure Access",
//                 color: "from-green-500 to-emerald-500",
//               },
//               {
//                 icon: Star,
//                 text: "Audit Logs",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: Target,
//                 text: "Permission Control",
//                 color: "from-orange-500 to-red-500",
//               },
//             ].map((item, index) => (
//               <span
//                 key={index}
//                 className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold`}
//               >
//                 <item.icon className="w-4 h-4" />
//                 {item.text}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
//                   <Grid3X3 className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 shadow-lg"></div>
//               </div>
//               <div>
//                 <h2 className="text-3xl font-bold text-white">
//                   User Directory
//                 </h2>
//                 <p className="text-purple-200/80 font-medium">
//                   Manage platform administrators and team members
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               {/* Search Bar */}
//               <div className="relative flex-1 lg:flex-initial">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/70" />
//                 <input
//                   type="text"
//                   placeholder="Search users..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-lg"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={fetchUsers}
//                   disabled={loading}
//                   className="flex items-center gap-3 px-6 py-3 bg-white/5 text-purple-200 rounded-2xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl border border-white/10 hover:border-white/20 font-semibold"
//                 >
//                   <RefreshCw
//                     className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
//                   />
//                   Refresh
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowModal(true);
//                     resetForm();
//                   }}
//                   className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold group"
//                 >
//                   <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
//                   Add User
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               label: "Total Users",
//               value: users.length,
//               color: "from-blue-500 to-cyan-500",
//               icon: User,
//             },
//             {
//               label: "Active Users",
//               value: users.length,
//               color: "from-green-500 to-emerald-500",
//               icon: CheckCircle,
//             },
//             {
//               label: "Admins",
//               value: Array.isArray(users) ? users.filter(u => u.role === "Admin").length : 0,
//               color: "from-purple-500 to-pink-500",
//               icon: Shield,
//             },
//             {
//               label: "Sales Users",
//               value: Array.isArray(users) ? users.filter(u => u.role === "Sales").length : 0,
//               color: "from-orange-500 to-red-500",
//               icon: Zap,
//             },
//           ].map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <stat.icon
//                   className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
//                 />
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
//               </div>
//               <h3 className="text-sm font-semibold text-purple-200/80 mb-2">
//                 {stat.label}
//               </h3>
//               <p
//                 className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
//               >
//                 {stat.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Users Table Section */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
//           <div className="p-8 border-b border-white/10">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <div>
//                 <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
//                   <User className="w-6 h-6 text-blue-400" />
                  
//                   <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold">
//                     {sortedUsers.length} users
//                   </span>
//                 </h3>
//                 <p className="text-purple-200/70 font-medium">
//                   Manage roles, permissions, and access levels
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => setSearchTerm("")}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Clear Filters
//                 </button>
//                 <button 
//                   onClick={() => setSortConfig({ key: null, direction: "asc" })}
//                   className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300"
//                 >
//                   <ArrowUpDown className="w-4 h-4" />
//                   Reset Sort
//                 </button>
//               </div>
//             </div>
//           </div>

//           {sortedUsers.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
//                 <User className="w-16 h-16 text-purple-400/50" />
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-4">
//                 No Users Found
//               </h3>
//               <p className="text-purple-200/70 mb-8 text-lg max-w-md mx-auto">
//                 Start by adding your first system user to get started with management
//               </p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold text-lg"
//               >
//                 Add First User
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <div className="min-w-full">
//                 <div className="bg-white/5 border-b border-white/10">
//                   <div className="grid grid-cols-12 gap-4 px-8 py-4 text-sm font-semibold text-purple-200/80">
//                     {columns.map((column) => (
//                       <div
//                         key={column.key}
//                         className="col-span-2 flex items-center gap-2"
//                       >
//                         {column.label}
//                         {column.sortable && (
//                           <button
//                             onClick={() => requestSort(column.key)}
//                             className="hover:text-white transition-colors duration-200"
//                           >
//                             <ArrowUpDown className="w-4 h-4" />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="divide-y divide-white/10">
//                   {sortedUsers.map((user, index) => (
//                     <div
//                       key={user._id}
//                       className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-white/5 transition-all duration-300 group"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       {columns.map((column) => (
//                         <div
//                           key={column.key}
//                           className="col-span-2 flex items-center"
//                         >
//                           {column.render ? (
//                             column.render(user[column.key], user)
//                           ) : (
//                             <span className="text-white">
//                               {user[column.key]}
//                             </span>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Create/Edit Modal */}
//         <Modal
//           title={
//             <div className="flex items-center gap-4 px-12 py-2">
//               {editingId ? (
//                 <>
//                   <Edit className="w-7 h-7 text-blue-400 drop-shadow-glow" />
//                   <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold text-3xl tracking-wide drop-shadow">
//                     Edit User
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-7 h-7 text-green-400 drop-shadow-glow" />
//                   <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold text-3xl tracking-wide drop-shadow">
//                     Add User
//                   </span>
//                 </>
//               )}
//             </div>
//           }
//           open={showModal}
//           onClose={() => {
//             setShowModal(false);
//             resetForm();
//           }}
//           className="!p-0"
//           size="xl"
//         >
//           <div className="p-8 bg-gradient-to-br from-[#0f0f11] via-[#111113] to-[#0b0b0d] rounded-3xl shadow-2xl border border-white/10 backdrop-blur-2xl animate-in fade-in duration-300">
//             <form onSubmit={handleCreateOrUpdate} className="space-y-6">
//               {/* Username */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <User className="w-5 h-5 text-blue-400 drop-shadow-glow" />
//                   Username <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.username}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       username: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500/40 
//                      focus:border-blue-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter username (alphanumeric, 3-20 chars)"
//                   required
//                 />
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Mail className="w-5 h-5 text-green-400 drop-shadow-glow" />
//                   Email <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       email: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-green-500/40 
//                      focus:border-green-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter email address"
//                   required
//                 />
//               </div>

//               {/* Phone Number */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Phone className="w-5 h-5 text-purple-400 drop-shadow-glow" />
//                   Phone Number <span className="text-red-400">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       phoneNumber: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-purple-500/40 
//                      focus:border-purple-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder="Enter phone number (+974 xxxxxxxx)"
//                   required
//                 />
//               </div>

//               {/* Role */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Shield className="w-5 h-5 text-orange-400 drop-shadow-glow" />
//                   Role <span className="text-red-400">*</span>
//                 </label>
//                <select
//   value={formData.role}
//   onChange={(e) =>
//     setFormData((prev) => ({
//       ...prev,
//       role: e.target.value,
//     }))
//   }
//   className="w-full p-4 text-white bg-white/10 border border-white/20 rounded-2xl
//              focus:outline-none focus:ring-2 focus:ring-orange-500/40 
//              focus:border-orange-500/40 shadow-inner placeholder-white/40 
//              backdrop-blur-xl transition-all duration-300"
//   required
// >
//   <option value="" className="text-black">Select Role</option>
//   <option value="Admin" className="text-black">Admin</option>
//   <option value="Sales" className="text-black">Sales</option>
// </select>

//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Lock className="w-5 h-5 text-yellow-400 drop-shadow-glow" />
//                   Password {editingId ? "(Optional)" : <span className="text-red-400">*</span>}
//                 </label>
//                 <input
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       password: e.target.value,
//                     }))
//                   }
//                   className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-yellow-500/40 
//                      focus:border-yellow-500/40 shadow-inner placeholder-white/40 
//                      backdrop-blur-xl transition-all duration-300"
//                   placeholder={editingId ? "Leave blank to keep current password" : "Enter strong password (8-15 chars, uppercase, lowercase, number, special char)"}
//                   required={!editingId}
//                 />
//               </div>

//               {/* Actions */}
//               <div className="flex gap-6 pt-4">
//                 {/* Cancel */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     resetForm();
//                   }}
//                   disabled={loading}
//                   className="flex-1 px-8 py-4 border-2 border-white/20 text-white rounded-2xl 
//                      hover:border-white/40 hover:bg-white/10 transition-all duration-300 
//                      font-bold backdrop-blur-lg shadow-xl"
//                 >
//                   Cancel
//                 </button>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 flex items-center justify-center gap-3 px-8 py-4 
//                      bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl 
//                      shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed 
//                      transition-all duration-300 font-bold hover:scale-105 group"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-6 h-6 animate-spin" />
//                       <span className="animate-pulse">
//                         {editingId ? "Updating..." : "Creating..."}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
//                       {editingId ? "Update User" : "Add User"}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </Modal>
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
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
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }
//         .animate-blob {
//           animation: blob 10s infinite;
//         }
//         .animate-float {
//           animation: float 8s ease-in-out infinite;
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

// export default Users;

//======================deppseek===============

import { useState, useEffect, useCallback } from "react";
import { apiCalls } from "../services/api";
import { toast } from "react-hot-toast";
import Modal from "../components/Modal";
import {
  User,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Loader2,
  X,
  AlertTriangle,
  Shield,
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Lock,
  Filter,
  MoreVertical,
  Download,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    role: "User",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [roleFilter, setRoleFilter] = useState("all");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiCalls.getUsers({ page: 1, perPage: 50 });
      const userData = response.data.data?.users || [];
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.role || !formData.phoneNumber) {
      return toast.error("Please fill in all required fields");
    }

    if (!editingId && !formData.password) {
      return toast.error("Password is required for new users");
    }

    setLoading(true);
    try {
      if (editingId) {
        await apiCalls.updateUser(editingId, formData);
        toast.success("User updated successfully");
      } else {
        await apiCalls.createUser(formData);
        toast.success("User created successfully");
      }

      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(error.response?.data?.message || "Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ username: "", email: "", phoneNumber: "", role: "User", password: "" });
    setEditingId(null);
    setShowPassword(false);
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "User",
      password: "",
    });
    setEditingId(user._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await apiCalls.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
      fetchUsers();
    }
  };

  // Filter and sort users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.username} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Manager": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Sales": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === "Admin").length,
    manager: users.filter(u => u.role === "Manager").length,
    sales: users.filter(u => u.role === "Sales").length,
    user: users.filter(u => u.role === "User").length,
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage system users and their permissions</p>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
                resetForm();
              }}
              className="cursor-pointer mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administrators</p>
                <p className="text-2xl font-bold text-gray-900">{stats.admin}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Managers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.manager}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sales Team</p>
                <p className="text-2xl font-bold text-gray-900">{stats.sales}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="cursor-pointer px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
                <option value="User">User</option>
              </select>
              
              <button
                onClick={fetchUsers}
                className="cursor-pointer p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {sortedUsers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600 mb-4">
                {users.length === 0 ? "Get started by adding your first user." : "No users match your search criteria."}
              </p>
              {users.length === 0 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.username?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username || "Unnamed User"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phoneNumber || "No phone"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="cursor-pointer text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="Edit user"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="cursor-pointer text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* User Modal */}
        <Modal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          title={editingId ? "Edit User" : "Add New User"}
        >
          <form onSubmit={handleCreateOrUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                // placeholder="Enter username"
                 placeholder="Enter username (alphanumeric, 3-20 chars)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                // placeholder="Enter phone number"
                placeholder="Enter phone number (+974 xxxxxxxx)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="User">User</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password {editingId ? "(Leave blank to keep current)" : "*"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  // placeholder={editingId ? "Enter new password" : "Enter password"}
                      placeholder={editingId ? "Leave blank to keep current password" : "Enter strong password (8-15 chars, uppercase, lowercase, number, special char)"}
                  required={!editingId}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="cursor-pointer flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {editingId ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  editingId ? "Update User" : "Create User"
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Users;