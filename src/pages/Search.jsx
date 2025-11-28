//====================fully correct====

// import { useState, useEffect, useCallback } from "react";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import Table from "../components/Table";
// import { Search as SearchIcon, Filter, Zap, Tag, Code, Database } from "lucide-react";

// const tabs = [
//   { key: "global", label: "Global Search", icon: SearchIcon },
//   { key: "products", label: "Products", icon: Tag },
//   { key: "itemcode", label: "Item Code", icon: Code },
//   { key: "subcategory", label: "Subcategory", icon: Filter },
//   { key: "suppliers", label: "Suppliers", icon: Database },
//   { key: "categories", label: "Categories", icon: Zap }
// ];

// const Search = () => {
//   const [query, setQuery] = useState("");
//   const [type, setType] = useState("global");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [debounceTimeout, setDebounceTimeout] = useState(null);

//   // Auto-search on query change (debounced 500ms)
//   useEffect(() => {
//     if (!query.trim()) {
//       setResults([]);
//       return;
//     }

//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout);
//     }

//     const timeoutId = setTimeout(() => {
//       handleSearch(true);
//     }, 500);

//     setDebounceTimeout(timeoutId);

//     return () => clearTimeout(timeoutId);
//   }, [query, type]);

//   const handleSearch = useCallback(async (isAuto = false) => {
//     if (!query.trim()) return;
//     setLoading(true);
//     setResults([]);
//     try {
//       let res;
//       switch (type) {
//         case "global":
//           res = await apiCalls.globalSearch({ q: query, page: 1, limit: 20 });
//           setResults(res.data.data || []);
//           break;
//         case "products":
//           res = await apiCalls.searchProductsByName({ q: query, page: 1, limit: 20 });
//           setResults(res.data.data || []);
//           break;
//         case "itemcode":
//           res = await apiCalls.searchProductsByItemCode({ q: query, page: 1, limit: 20 });
//           setResults(res.data.data || []);
//           break;
//         case "subcategory":
//           res = await apiCalls.searchProductsBySubcategoryName({ q: query, page: 1, limit: 20 });
//           setResults(res.data.data || []);
//           break;
//         case "suppliers":
//           res = await apiCalls.searchProductsBySupplierName({ q: query, page: 1, limit: 20 });
//           setResults(res.data.data || []);
//           break;
//         case "categories":
//           res = await apiCalls.publicSearchCategories({ q: query });
//           setResults(res.data.data || res.data || []);
//           break;
//       }
//       console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Search Response:`, res?.data);
//       if ((res?.data?.data || res?.data || []).length === 0) {
//         toast.info("No matches—try a different query.");
//       }
//     } catch (error) {
//       console.error('Full Search Error:', error);
//       toast.error(`Search failed: ${error.message || 'Unknown error'}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [query, type]);

//   // Dynamic columns
//   const columns =
//     type === "categories"
//       ? [
//           { key: "name", label: "Category Name" },
//           {
//             key: "categoryImagePath",
//             label: "Image",
//             render: (img) =>
//               img ? (
//                 <img src={img} alt="Category" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
//               ) : (
//                 "No Image"
//               )
//           }
//         ]
//       : type === "suppliers"
//       ? [
//           { key: "supplierName", label: "Supplier Name" },
//           { key: "supplierEmailId", label: "Email" },
//           { key: "supplierContactNumber", label: "Phone" },
//           { key: "productName", label: "Associated Product" }
//         ]
//       : [ // Shared for products, itemcode, subcategory, global
//           { key: "productName", label: "Product Name" },
//           { key: "itemCode", label: "Item Code" },
//           { key: "categoryName", label: "Category" },
//           { key: "subCategoryName", label: "Subcategory" },
//           {
//             key: "supplierName",
//             label: "Supplier",
//             render: (name, row) => name || row.supplierEmailId || "-"
//           }
//         ];

//   const suggestions = {
//     global: "Try 'electr' (3 results).",
//     products: "Try 'Smartphone' (2 results).",
//     itemcode: "Try 'X100' (2 results).",
//     subcategory: "Try 'LG' (2 results).",
//     suppliers: "Try 'Updated' (3 results).",
//     categories: "Try 'Electronics'."
//   };

//   const getTabColor = (key) => {
//     const colors = {
//       global: "from-blue-500 to-indigo-600",
//       products: "from-green-500 to-emerald-600",
//       itemcode: "from-purple-500 to-pink-600",
//       subcategory: "from-orange-500 to-red-600",
//       suppliers: "from-cyan-500 to-teal-600",
//       categories: "from-yellow-500 to-amber-600"
//     };
//     return colors[key] || "from-gray-500 to-gray-600";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Hero Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
//             Procurement Search Hub
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Discover suppliers, products, categories & more with lightning-fast, auto-searching intelligence.
//           </p>
//           <div className="flex justify-center mt-6">
//             <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
//               <div className="flex space-x-1">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                   <Zap className="w-3 h-3 mr-1" /> Auto-Search
//                 </span>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                   <SearchIcon className="w-3 h-3 mr-1" /> Real-Time
//                 </span>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                   <Filter className="w-3 h-3 mr-1" /> Advanced Filters
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search Card */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           {/* Tabs */}
//           <div className="px-6 py-4 border-b border-gray-100/50">
//             <div className="flex flex-wrap justify-center lg:justify-start gap-2">
//               {tabs.map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => {
//                     setType(t.key);
//                     setResults([]);
//                     setQuery("");
//                   }}
//                   className={`
//                     flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105
//                     ${type === t.key 
//                       ? `bg-gradient-to-r ${getTabColor(t.key)} text-white shadow-lg shadow-[${getTabColor(t.key).split('from-')[1].split(' ')[0]}-500/25]` 
//                       : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
//                     }
//                   `}
//                 >
//                   <t.icon className="w-4 h-4" />
//                   {t.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Search Input */}
//           <div className="p-6">
//             <div className="relative">
//               <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder={`Search ${type}... (${suggestions[type]})`}
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-300 text-lg placeholder-gray-500 transition-all duration-300"
//               />
//               <button
//                 onClick={() => handleSearch(false)}
//                 disabled={loading || !query.trim()}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <SearchIcon className="w-4 h-4" />
//                     Go
//                   </>
//                 )}
//               </button>
//             </div>
//             {loading && (
//               <p className="text-sm text-blue-600 mt-3 flex items-center gap-2">
//                 <Zap className="w-4 h-4 animate-pulse" /> Auto-searching "{query}" in real-time...
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="p-6">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
//                 <div className="w-16 h-16 border-4 border-blue-200/50 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//                 <p className="text-lg">Unleashing the search magic...</p>
//                 <p className="text-sm mt-2 opacity-75">Hold tight for sparkling results ✨</p>
//               </div>
//             ) : results.length > 0 ? (
//               <div>
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className={`w-2 h-8 bg-gradient-to-b ${getTabColor(type)} rounded-full`}></div>
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-800">Search Results</h3>
//                       <p className="text-sm text-gray-600">Found <span className="font-semibold text-blue-600">{results.length}</span> gems for "{query}"</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setResults([])}
//                     className="text-gray-500 hover:text-gray-700 transition-colors"
//                   >
//                     Clear
//                   </button>
//                 </div>
//                 <Table data={results} columns={columns} />
//                 {/* Debug for categories only */}
//                 {type === "categories" && (
//                   <details className="mt-6 p-4 bg-gray-50/50 rounded-2xl">
//                     <summary className="cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2">
//                       🔍 Debug: Raw Results
//                     </summary>
//                     <pre className="text-xs mt-3 overflow-auto max-h-40 bg-white p-3 rounded-xl border">
//                       {JSON.stringify(results, null, 2)}
//                     </pre>
//                   </details>
//                 )}
//               </div>
//             ) : query ? (
//               <div className="text-center py-16">
//                 <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//                 <h3 className="text-xl font-semibold text-gray-500 mb-2">Nothing Found</h3>
//                 <p className="text-gray-400 mb-4">No treasures for "{query}" yet.</p>
//                 <p className="text-sm text-gray-500">{suggestions[type]}</p>
//               </div>
//             ) : (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-6 p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
//                   <SearchIcon className="w-12 h-12 text-blue-500" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-600 mb-2">Ready to Explore?</h3>
//                 <p className="text-gray-500">Type above to unlock instant insights across your procurement world.</p>
//               </div>
//             )}
//           </div>
//         </div>
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
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </div>
//   );
// };

// export default Search;

//==================================

// pages/Search.jsx (Minor update: Enhanced error handling + confirmed subcategory/itemcode logic.
// No major changes needed—uses the corrected apiCalls. Added specific toasts for 404s.)
import { useState, useEffect, useCallback } from "react";
import { apiCalls } from "../services/api";
import { toast } from "react-hot-toast";
import Table from "../components/Table";
import { Search as SearchIcon, Filter, Zap, Tag, Code, Database } from "lucide-react";

const tabs = [
  { key: "global", label: "Global Search", icon: SearchIcon },
  { key: "products", label: "Products", icon: Tag },
  { key: "itemcode", label: "Item Code", icon: Code },
  { key: "subcategory", label: "Subcategory", icon: Filter },
  { key: "suppliers", label: "Suppliers", icon: Database },
  { key: "categories", label: "Categories", icon: Zap }
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("global");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Auto-search on query change (debounced 500ms)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      handleSearch(true);
    }, 500);

    setDebounceTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [query, type]);

  const handleSearch = useCallback(async (isAuto = false) => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    try {
      let res;
      switch (type) {
        case "global":
          res = await apiCalls.globalSearch({ q: query, page: 1, limit: 20 });
          setResults(res.data.data || []);
          break;
        case "products":
          res = await apiCalls.searchProductsByName({ q: query, page: 1, limit: 20 });
          setResults(res.data.data || []);
          break;
        case "itemcode":
          res = await apiCalls.searchProductsByItemCode({ q: query, page: 1, limit: 20 });
          setResults(res.data.data || []);
          break;
        case "subcategory":
          res = await apiCalls.searchProductsBySubcategoryName({ q: query, page: 1, limit: 20 });
          setResults(res.data.data || []);
          break;
        case "suppliers":
          res = await apiCalls.searchProductsBySupplierName({ q: query, page: 1, limit: 20 });
          setResults(res.data.data || []);
          break;
        case "categories":
          res = await apiCalls.publicSearchCategories({ q: query });
          setResults(res.data.data || res.data || []);
          break;
      }
      console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} Search Response:`, res?.data);
      if ((res?.data?.data || res?.data || []).length === 0) {
        toast.info("No matches—try a different query.");
      }
    } catch (error) {
      console.error('Full Search Error:', error);
      // Specific handling for 404 (endpoint issues)
      if (error.response?.status === 404) {
        toast.error(`Endpoint not found for "${type}" search. Check backend routes.`);
      } else {
        toast.error(`Search failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  }, [query, type]);

  // Dynamic columns (added subCategoryName to shared columns)
  const columns =
    type === "categories"
      ? [
          { key: "name", label: "Category Name" },
          {
            key: "categoryImagePath",
            label: "Image",
            render: (img) =>
              img ? (
                <img src={img} alt="Category" className="w-20 h-20 object-cover rounded-xl shadow-lg" />
              ) : (
                "No Image"
              )
          }
        ]
      : type === "suppliers"
      ? [
          { key: "supplierName", label: "Supplier Name" },
          { key: "supplierEmailId", label: "Email" },
          { key: "supplierContactNumber", label: "Phone" },
          { key: "productName", label: "Associated Product" }
        ]
      : [ // Shared for global/products/itemcode/subcategory
          { key: "productName", label: "Product Name" },
          { key: "itemCode", label: "Item Code" },
          { key: "categoryName", label: "Category" },
          { key: "subCategoryName", label: "Subcategory" },
          {
            key: "supplierName",
            label: "Supplier",
            render: (name, row) => name || row.supplierEmailId || "-"
          }
        ];

  const suggestions = {
    global: "Try 'electr' (global matches all).",
    products: "Try 'Smartphone' (2 results).",
    itemcode: "Try 'ITM001' or 'X100' (1-2 results).",
    subcategory: "Try 'XYZ' or 'LG' (1-2 results).",
    suppliers: "Try 'Updated' (3 results).",
    categories: "Try 'Electronics'."
  };

  const getTabColor = (key) => {
    const colors = {
      global: "from-blue-500 to-indigo-600",
      products: "from-green-500 to-emerald-600",
      itemcode: "from-purple-500 to-pink-600",
      subcategory: "from-orange-500 to-red-600",
      suppliers: "from-cyan-500 to-teal-600",
      categories: "from-yellow-500 to-amber-600"
    };
    return colors[key] || "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Procurement Search Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover suppliers, products, categories & more with lightning-fast, auto-searching intelligence.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <div className="flex space-x-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Zap className="w-3 h-3 mr-1" /> Auto-Search
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <SearchIcon className="w-3 h-3 mr-1" /> Real-Time
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <Filter className="w-3 h-3 mr-1" /> Advanced Filters
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tabs */}
          <div className="px-6 py-4 border-b border-gray-100/50">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setType(t.key);
                    setResults([]);
                    setQuery("");
                  }}
                  className={`cursor-pointer 
                    flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105
                    ${type === t.key 
                      ? `bg-gradient-to-r ${getTabColor(t.key)} text-white shadow-lg shadow-[${getTabColor(t.key).split('from-')[1].split(' ')[0]}-500/25]` 
                      : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
                    }
                  `}
                >
                  <t.icon className="w-4 h-4" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="p-6">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${type}... (${suggestions[type]})`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-300 text-lg placeholder-gray-500 transition-all duration-300"
              />
              <button
                onClick={() => handleSearch(false)}
                disabled={loading || !query.trim()}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-4 h-4" />
                    Go
                  </>
                )}
              </button>
            </div>
            {loading && (
              <p className="text-sm text-blue-600 mt-3 flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" /> Auto-searching "{query}" in real-time...
              </p>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                <div className="w-16 h-16 border-4 border-blue-200/50 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-lg">Unleashing the search magic...</p>
                <p className="text-sm mt-2 opacity-75">Hold tight for sparkling results ✨</p>
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 bg-gradient-to-b ${getTabColor(type)} rounded-full`}></div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Search Results</h3>
                      <p className="text-sm text-gray-600">Found <span className="font-semibold text-blue-600">{results.length}</span> gems for "{query}"</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResults([])}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <Table data={results} columns={columns} />
                {/* Debug for problematic tabs */}
                {(type === "subcategory" || type === "itemcode") && (
                  <details className="mt-6 p-4 bg-gray-50/50 rounded-2xl">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2">
                      🔍 Debug: Raw Results
                    </summary>
                    <pre className="text-xs mt-3 overflow-auto max-h-40 bg-white p-3 rounded-xl border">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ) : query ? (
              <div className="text-center py-16">
                <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Nothing Found</h3>
                <p className="text-gray-400 mb-4">No treasures for "{query}" yet.</p>
                <p className="text-sm text-gray-500">{suggestions[type]}</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">Ready to Explore?</h3>
                <p className="text-gray-500">Type above to unlock instant insights across your procurement world.</p>
              </div>
            )}
          </div>
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
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Search;