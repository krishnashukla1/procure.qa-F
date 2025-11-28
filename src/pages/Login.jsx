//=================stylish=========

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Optional: Add react-icons for icons

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/login", {
//         email,
//         password,
//       });

//       if (res.data.code === 200) {
//         localStorage.setItem("token", res.data.data.token);
//         navigate("/dashboard");
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl w-96 border border-white/30 relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
//         {/* Header with icon */}
//         <div className="text-center mb-6">
//           <FaUser className="mx-auto text-6xl text-purple-500 mb-4 animate-bounce" />
//           <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
//             Welcome Back 👋
//           </h2>
//           <p className="text-gray-500">Sign in to your account</p>
//         </div>

//         <p className="text-center text-gray-400 mb-8">
//           If you are not signed up, please{" "}
//           <Link to="/signup" className="text-indigo-500 font-semibold hover:underline transition-colors">
//             click here to Signup
//           </Link>
//         </p>

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="email"
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FaLock className="absolute left-3 top-3.5 text-gray-400" />
//             <input
//               type="password"
//               className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             {isLoading ? "Signing in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-500">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors">
//             Sign Up Now
//           </Link>
//         </p>
//       </div>

//       <style jsx>{`
//         @keyframes blob {
//           0% { transform: translate(0px, 0px) scale(1); }
//           33% { transform: translate(30px, -50px) scale(1.1); }
//           66% { transform: translate(-20px, 20px) scale(0.9); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-blob {
//           animation: blob 7s infinite;
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

// export default Login;

//===================stylish deepshake==============

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/login", {
//         email,
//         password,
//       });

//       if (res.data.code === 200) {
//         localStorage.setItem("token", res.data.data.token);
//         navigate("/dashboard");
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
//       <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//             <span className="text-white font-bold text-xl">🔐</span>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">
//             Welcome Back 👋
//           </h2>
//           <p className="text-gray-300 text-sm">
//             Sign in to access your dashboard
//           </p>
//         </div>

//         {/* Signup Prompt Banner */}
//         <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4 mb-6">
//           <p className="text-white text-center text-sm">
//             New to our platform?{" "}
//             <Link
//               to="/signup"
//               className="text-purple-300 font-semibold hover:text-white underline transition-colors duration-200"
//             >
//               Create an account here
//             </Link>
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleLogin} className="space-y-5">
//           <div className="space-y-2">
//             <label className="text-white text-sm font-medium ml-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-white text-sm font-medium ml-1">
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Forgot Password Link */}
//           <div className="text-right">
//             <button
//               type="button"
//               className="text-blue-300 text-sm hover:text-white transition-colors duration-200"
//             >
//               Forgot password?
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center">
//                 <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
//                 Signing In...
//               </div>
//             ) : (
//               "Sign In to Dashboard"
//             )}
//           </button>
//         </form>

//         {/* Additional Features */}
//         <div className="mt-6">
//           <div className="relative flex items-center">
//             <div className="flex-grow border-t border-white/20"></div>
//             <span className="flex-shrink mx-4 text-white/60 text-sm">or continue with</span>
//             <div className="flex-grow border-t border-white/20"></div>
//           </div>

//           <div className="grid grid-cols-2 gap-3 mt-4">
//             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2">
//               <span>🔵</span>
//               <span className="text-sm">Google</span>
//             </button>
//             <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-center space-x-2">
//               <span>⚫</span>
//               <span className="text-sm">GitHub</span>
//             </button>
//           </div>
//         </div>

//         {/* Bottom Signup Link */}
//         <div className="text-center mt-6">
//           <p className="text-gray-400 text-sm">
//             Don't have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-purple-300 font-semibold hover:text-white underline transition-colors duration-200"
//             >
//               Sign up now
//             </Link>
//           </p>
//         </div>

//         {/* Security Note */}
//         <div className="mt-4 text-center">
//           <p className="text-xs text-gray-500">
//             🔒 Your data is securely encrypted
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

//===========stylsih grok=============

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Optional: Add react-icons for icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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

      <div className="backdrop-blur-xl bg-white/20 p-8 rounded-3xl shadow-2xl w-96 border border-white/30 relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
        {/* Header with icon */}
        <div className="text-center mb-6">
          <FaUser className="mx-auto text-6xl text-purple-500 mb-4 animate-bounce" />
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* <p className="text-center text-gray-400 mb-8">
          If you are not signed up, please{" "}
          <Link to="/signup" className="text-indigo-500 font-semibold hover:underline transition-colors">
            click here to Signup
          </Link>
        </p> */}

        <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-4 mb-6">
          <p className="text-gray-700 text-center text-sm">
            If you are not signed up, please{" "}
            <Link
              to="/signup"
              className="text-indigo-500 font-semibold hover:underline transition-colors"
            >
              Click here to Signup
            </Link>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300/50 bg-white/50 focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all duration-300 hover:border-gray-400/70"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />

            <input
              type={show ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300/50 bg-white/50 
        focus:ring-2 focus:ring-indigo-400/50 focus:border-transparent outline-none transition-all 
        duration-300 hover:border-gray-400/70"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Eye Toggle */}
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </p>
      </div>

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

export default Login;
