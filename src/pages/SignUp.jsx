//==================stylish deepshake==============

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "Admin",
//     phoneNumber: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/users", form);

//       if (res.data.code === 200) {
//         alert("Signup successful!");
//         navigate("/login");
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//             <span className="text-white font-bold text-xl">⚡</span>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
//           <p className="text-gray-300 text-sm">
//             Join us today and get started
//           </p>
//         </div>

//         {/* Signin Prompt */}
//         <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6">
//           <p className="text-white text-center text-sm">
//             Already have an account?{" "}
//             <Link 
//               to="/login" 
//               className="text-blue-300 font-semibold hover:text-white underline transition-colors duration-200"
//             >
//               Click here to Sign In
//             </Link>
//           </p>
//         </div>

//         {/* Signup Form */}
//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <input 
//               name="username" 
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="Username"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <input 
//               name="email" 
//               type="email"
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="Email Address"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <input 
//               type="password" 
//               name="password" 
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="Password"
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <select 
//               name="role" 
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               onChange={handleChange}
//             >
//               <option value="Admin" className="text-gray-900">Admin</option>
//               <option value="Sales" className="text-gray-900">Sales</option>
//             </select>
//           </div>

//           <div>
//             <input 
//               name="phoneNumber" 
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="+974 xxxxxxxx"
//               onChange={handleChange}
//             />
//           </div>

//           <button 
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                 Creating Account...
//               </div>
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         {/* Bottom Signin Link */}
//         <div className="text-center mt-6">
//           <p className="text-gray-400 text-sm">
//             Already signed up?{" "}
//             <Link 
//               to="/login" 
//               className="text-blue-300 font-semibold hover:text-white underline transition-colors duration-200"
//             >
//               Sign In here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


//==================stylish grok=====


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaUserTie } from "react-icons/fa"; // Icons for fields
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "Admin",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); //for eye icon password

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/users", form);

      if (res.data.code === 200) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/30 relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Header with icon */}
        <div className="text-center mb-6">
          <FaUser className="mx-auto text-6xl text-purple-500 mb-4 animate-bounce" />
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500">Join us today and get started</p>
        </div>

        {/* Signin Prompt */}
        <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-4 mb-6">
          <p className="text-gray-700 text-center text-sm">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-indigo-500 font-semibold hover:underline transition-colors"
            >
              Click here to Sign In
            </Link>
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              name="username" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              name="email" 
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="password" 
              name="password" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div> */}



           <div className="relative">
      <FaLock className="absolute left-3 top-3.5 text-gray-400" />

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 
        placeholder-gray-400 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none
        transition-all duration-300 hover:border-gray-400/70"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Eye Icon */}
      <span
        className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </span>
    </div>
  

          <div className="relative">
            <FaUserTie className="absolute left-3 top-3.5 text-gray-400" />
            <select 
              name="role" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70 appearance-none"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              name="phoneNumber" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="+974 xxxxxxxx"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Bottom Signin Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already signed up?{" "}
            <Link 
              to="/login" 
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
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

export default Signup;
