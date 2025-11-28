

// import { useState, useEffect } from 'react'
// import { apiCalls } from '../services/api'
// import { toast } from 'react-hot-toast'
// import Table from '../components/Table'
// import Modal from '../components/Modal'
// import Pagination from '../components/Pagination'
// import { Upload, Edit, Trash2, Plus, Search, Filter, Download } from 'lucide-react'

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [selectedSupplierId, setSelectedSupplierId] = useState("");

//   const [totalProducts, setTotalProducts] = useState(0) // New: For real pagination total
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [limit, setLimit] = useState(10)
//   const [showModal, setShowModal] = useState(false)
//   const [showBulkModal, setShowBulkModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [formData, setFormData] = useState({
//     ProductName: '',
//     ItemCode: '',
//     Unit: '',
//     Description: '',
//     Category: { CategoryID: '', CategoryName: '' },
//     SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
//     supplierId: '',
//   })
//   const [file, setFile] = useState(null)
//   const [editingId, setEditingId] = useState(null)
//   const [categories, setCategories] = useState([])  // Expects [{ _id, name }]
//   const [subcategories, setSubcategories] = useState([])  // Expects [{ _id, name }]
//   const [suppliers, setSuppliers] = useState([])
//   const [dropdownLoading, setDropdownLoading] = useState(false)
//   const [bulkSupplierId, setBulkSupplierId] = useState('') // New: For bulk modal supplier select

//   // Fetch products on page/limit change
//   useEffect(() => {
//     fetchProducts()
//   }, [page, limit])

//   // Fetch dropdown data once on mount
//   useEffect(() => {
//     fetchDropdownData()
//   }, [])

//   // Log after state updates (optional, for debugging)
//   useEffect(() => {
//     if (categories.length > 0 || suppliers.length > 0) {
//       console.log('✅ Dropdown loaded - Categories:', categories.length, 'Suppliers:', suppliers.length)
//     }
//   }, [categories, suppliers])

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (formData.Category.CategoryID) {
//       fetchSubcategories(formData.Category.CategoryID)
//     } else {
//       setSubcategories([])
//     }
//   }, [formData.Category.CategoryID])

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const res = await apiCalls.getProducts({ page, limit })
//       console.log('📦 Products fetched:', res.data.data?.products || [])
//       setProducts(res.data.data?.products || [])
//       setTotalProducts(res.data.pagination?.totalElements || 0) // New: Real total
//     } catch (error) {
//       console.error('❌ Fetch products error:', error)
//       toast.error('Failed to fetch products')
//     } finally {
//       setLoading(false)
//     }
//   }

// const fetchDropdownData = async () => {
//   try {
//     setDropdownLoading(true);
//     const [catRes, supRes] = await Promise.all([
//       apiCalls.getAllCategories(),
//       apiCalls.getSuppliers({ page: 1, limit: 50 }),
//     ]);
      
//     console.log('📦 Categories response:', catRes.data);
//     console.log('📦 Suppliers response FULL:', JSON.stringify(supRes.data, null, 2));  // NEW: Full for debug
      
//     // Extract categories as array of { _id, name }
//     const catData = catRes.data.categories || catRes.data.data?.categories || catRes.data || [];
//     setCategories(Array.isArray(catData) ? catData.map(cat => ({
//       _id: cat._id,
//       name: cat.name
//     })) : []);
      
//     // Extract suppliers
//     let supData = supRes.data.data?.suppliers || supRes.data?.suppliers || [];
//     console.log('📦 Raw suppliers response:', supData.slice(0, 2));  // Log first 2
      
//     // FIXED: Enhanced filter - handle ObjectId objects or 'id' key
//     const validSuppliers = supData
//       .filter(sup => sup)  // Drop nulls
//       .map(sup => ({
//         _id: (sup._id || sup.id || '').toString(),  // Fallback + force string
//         companyName: sup.companyName || 'Unknown',
//       }))
//       .filter(sup => sup._id && /^[0-9a-fA-F]{24}$/.test(sup._id));  // Now after conversion

//     console.log('📦 Mapped suppliers before final filter:', supData.length);
//     console.log('📦 Valid suppliers after filter:', validSuppliers.length, validSuppliers.slice(0, 2));

//     if (validSuppliers.length === 0) {
//       console.warn('⚠️ No valid suppliers found - check backend/DB');
//       toast.error('No valid suppliers available. Please add suppliers first or check console for details.');
//     } else {
//       toast.success(`Loaded ${validSuppliers.length} suppliers!`);  // Optional positive feedback
//     }

//     setSuppliers(validSuppliers);
//   } catch (error) {
//     console.error('❌ Fetch dropdown error:', error);
//     toast.error('Failed to load dropdowns');
//   } finally {
//     setDropdownLoading(false);
//   }
// };




//   // Fetch subcategories by category ID
//   const fetchSubcategories = async (categoryId) => {
//     try {
//       setDropdownLoading(true)
//       const res = await apiCalls.getSubcategoriesByCategory(categoryId)
//       console.log('📦 Subcategories for category', categoryId, ':', res.data)
      
//       // Fixed: Backend returns { subCategories } (camelCase)
//       const subData = res.data.subCategories || res.data.data?.subCategories || res.data || []
//       setSubcategories(Array.isArray(subData) ? subData.map(sub => ({
//         _id: sub._id,
//         name: sub.name
//       })) : [])
//     } catch (error) {
//       console.error('❌ Fetch subcategories error:', error)
//       setSubcategories([])
//       toast.error('Failed to load subcategories')
//     } finally {
//       setDropdownLoading(false)
//     }
//   }

//   // const handleBulkUpload = async () => {
//   //   if (!file || !bulkSupplierId) return toast.error('Select file and supplier')
    
//   //   const formDataUpload = new FormData()
//   //   formDataUpload.append('excelFile', file)
//   //   try {
//   //     await apiCalls.bulkUploadProducts(bulkSupplierId, formDataUpload)
//   //     toast.success('Bulk upload successful')
//   //     setShowBulkModal(false)
//   //     setFile(null)
//   //     setBulkSupplierId('')
//   //     fetchProducts()
//   //   } catch (error) {
//   //     console.error('❌ Bulk upload error:', error)
//   //     toast.error('Bulk upload failed: ' + (error.response?.data?.message || error.message))
//   //   }
//   // }

// const handleBulkUpload = async () => {
//   if (!file || !bulkSupplierId) {
//     return toast.error("Please select a Supplier and choose a file");
//   }

//   const formDataUpload = new FormData();
//   formDataUpload.append("excelFile", file);

//   try {
//     const res = await apiCalls.bulkUploadProducts(bulkSupplierId, formDataUpload);

//     toast.success("Bulk upload successful");

//     setFile(null);
//     setBulkSupplierId("");
//     setShowBulkModal(false);

//     fetchProducts();

//   } catch (error) {
//     console.error("Bulk upload error:", error);
//     toast.error("Upload failed");
//   }
// };





// const handleCreateOrUpdate = async (e) => {
//   e.preventDefault();

//   try {
//     const payload = {
//       ...formData,
//       subCategoryData: formData.SubCategory
//     };

//     console.log("📤 Sending payload:", payload);

//     if (!editingId) {
//       // CREATE
//       await apiCalls.createProduct(payload);
//       toast.success("Product created successfully");
//     } else {
//       // UPDATE
//       await apiCalls.updateProduct(editingId, payload);
//       toast.success("Product updated successfully");
//     }

//     setShowModal(false);
//     resetForm();
//     fetchProducts();

//   } catch (err) {
//     console.error("❌ Save product error:", err);
//     toast.error(err.response?.data?.message || "Failed to save product");
//   }
// };


//   const resetForm = () => {
//     setFormData({
//       ProductName: '',
//       ItemCode: '',
//       Unit: '',
//       Description: '',
//       Category: { CategoryID: '', CategoryName: '' },
//       SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
//       supplierId: '',
//     })
//     setEditingId(null)
//     setSubcategories([])
//   }

//   const handleEdit = (product) => {
//     console.log('Editing product:', product)
//     setFormData({
//       ProductName: product.ProductName || '',
//       ItemCode: product.ItemCode || '',
//       Unit: product.Unit || '',
//       Description: product.Description || '',
//       Category: product.Category || { CategoryID: '', CategoryName: '' },
//       SubCategory: product.SubCategory || { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
//       supplierId: product.supplierId?._id || product.supplierId || '', // Fixed: Handle populated object
//     })
//     setEditingId(product._id)
//     setShowModal(true)
//     // useEffect will fetch subcats if category set
//   }

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await apiCalls.deleteProduct(id)
//         toast.success('Product deleted successfully')
//         fetchProducts()
//       } catch (error) {
//         console.error('❌ Delete error:', error)
//         toast.error('Failed to delete product')
//       }
//     }
//   }

//   const filteredProducts = products.filter(product =>
//     product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.ItemCode?.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const columns = [
//     { key: 'ProductName', label: 'Product Name' },
//     { key: 'ItemCode', label: 'Item Code' },
//     { 
//       key: 'Category.CategoryName', 
//       label: 'Category',
//       render: (value, row) => row.Category?.CategoryName || 'N/A'
//     },
//     { 
//       key: 'SubCategory.SubCategoryName', 
//       label: 'Subcategory',
//       render: (value, row) => row.SubCategory?.SubCategoryName || 'N/A'
//     },
//     { key: 'Unit', label: 'Unit' },
//     { 
//       key: 'actions', 
//       label: 'Actions',
//       render: (value, row) => (
//         <div className="flex items-center space-x-2">
//           <button 
//             onClick={() => handleEdit(row)} 
//             className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
//           >
//             <Edit className="w-4 h-4 mr-1" /> Edit
//           </button>
//           <button 
//             onClick={() => handleDelete(row._id)} 
//             className="flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
//           >
//             <Trash2 className="w-4 h-4 mr-1" /> Delete
//           </button>
//         </div>
//       )
//     },
//   ]

//   if (loading) return (
//     <div className="flex items-center justify-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//               <p className="text-gray-600 mt-2">Manage your product inventory and details</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
//               <button 
//                 onClick={() => setShowBulkModal(true)} 
//                 className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
//               >
//                 <Upload className="w-4 h-4 mr-2" />
//                 Bulk Upload
//               </button>
//               <button 
//                 onClick={() => { 
//                   setShowModal(true); 
//                   setEditingId(null); 
//                   resetForm();
//                 }} 
//                 className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
//                 disabled={dropdownLoading}
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Product
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Products</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalProducts}</p> {/* Fixed: Use total */}
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Active</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalProducts}</p> {/* Assuming all active */}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="bg-yellow-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Low Stock</p>
//                 <p className="text-2xl font-bold text-gray-900">0</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center">
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Categories</p>
//                 <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products by name or code..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               />
//             </div>
//             <div className="flex gap-3">
//               <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//                 <Filter className="w-4 h-4 mr-2" />
//                 Filters
//               </button>
//               <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <Table 
//             data={filteredProducts} 
//             columns={columns} 
//           />
//         </div>

//         {/* Pagination */}
//         <div className="mt-6">
//           <Pagination 
//             page={page} 
//             limit={limit} 
//             total={totalProducts} // Fixed: Use real total
//             onPageChange={setPage} 
//           />
//         </div>

//         {/* Bulk Upload Modal */}
//         <Modal title="Bulk Upload Products" open={showBulkModal} onClose={() => { setShowBulkModal(false); setFile(null); setBulkSupplierId(''); }}>
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
//               {/* <select 
//                 value={bulkSupplierId} 
//                 onChange={(e) => setBulkSupplierId(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
//                 required
//               >
//                 <option value="">Select Supplier</option>
//                 {suppliers.map(sup => (
//                   <option key={sup._id} value={sup._id}>
//                     {sup.companyName}
//                   </option>
//                 ))}
//               </select> */}

//               <select
//   value={bulkSupplierId}
//   onChange={(e) => setBulkSupplierId(e.target.value)}
//   className="w-full border rounded-lg p-3"
// >
//   <option value="">Select Supplier</option>
//   {suppliers.map((sup) => (
//     <option key={sup._id} value={sup._id}>
//       {sup.companyName}
//     </option>
//   ))}
// </select>


//             </div>
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//               <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//               <p className="text-gray-600 mb-2">Drag and drop your Excel file here</p>
//               <p className="text-sm text-gray-500 mb-4">or</p>
//               <input 
//                 type="file" 
//                 accept=".xlsx,.xls" 
//                 onChange={(e) => setFile(e.target.files[0])} 
//                 className="w-full p-2 border rounded-lg" 
//               />
//             </div>
//             {/* <div className="bg-blue-50 rounded-lg p-4">
//               <p className="text-sm text-blue-800 font-medium mb-2">File Requirements:</p>
//               <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
//                 <li>Excel format (.xlsx, .xls)</li>
//                 <li>Required columns: Product Name, Item Code*(this is should unique), Unit*, Group, Brand, Description</li>
//                 <li>Maximum file size: 10MB</li>
//               </ul>
//             </div> */}

//             <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 shadow-sm">
//   <p className="text-blue-900 font-semibold text-base mb-3 flex items-center gap-2">
//     <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
//     </svg>
//     File Requirements
//   </p>

//   <ul className="text-sm text-blue-800 space-y-2">
//     <li className="flex items-start gap-2">
//       <span className="text-blue-600 mt-1">•</span>
//       <span>Excel format <span className="font-medium text-blue-900">(.xlsx, .xls)</span></span>
//     </li>

//     <li className="flex items-start gap-2">
//       <span className="text-blue-600 mt-1">•</span>
//       <span>
//         Required columns:
//         <span className="font-medium text-blue-900">
//           {" "}Product Name, Item Code* (must be unique), Unit*, Group, Brand, Description
//         </span>
//       </span>
//     </li>

//     <li className="flex items-start gap-2">
//       <span className="text-blue-600 mt-1">•</span>
//       <span>
//         Maximum file size: 
//         <span className="font-medium text-blue-900"> 10MB</span>
//       </span>
//     </li>
//   </ul>
// </div>

//             <div className="flex gap-3">
//               <button 
//                 onClick={() => { setShowBulkModal(false); setFile(null); setBulkSupplierId(''); }} 
//                 className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleBulkUpload} 
//                 disabled={!file || !bulkSupplierId}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Upload Products
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* Add/Edit Product Modal */}
//         <Modal title={editingId ? 'Edit Product' : 'Add New Product'} open={showModal} onClose={() => { setShowModal(false); resetForm(); }}>
//           <form onSubmit={handleCreateOrUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
//                 <input 
//                   type="text" 
//                   placeholder="Enter product name" 
//                   value={formData.ProductName} 
//                   onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
//                   required 
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
//                 <input 
//                   type="text" 
//                   placeholder="Enter item code" 
//                   value={formData.ItemCode} 
//                   onChange={(e) => setFormData({ ...formData, ItemCode: e.target.value })} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
//                   required 
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
//                 <input 
//                   type="text" 
//                   placeholder="e.g., pieces, kg, liters" 
//                   value={formData.Unit} 
//                   onChange={(e) => setFormData({ ...formData, Unit: e.target.value })} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
//                   required 
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
//                 <select 
//                   value={formData.supplierId} 
//                   onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
//                   required
//                 >
//                   <option value="">Select Supplier</option>
//                   {suppliers.map(sup => (
//                     <option key={sup._id} value={sup._id}>
//                       {sup.companyName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//                 <select 
//                   value={formData.Category.CategoryID} 
//                   onChange={(e) => {
//                     const selectedId = e.target.value
//                     const selectedName = e.target.options[e.target.selectedIndex].text
//                     console.log('🔍 Selected category ID:', selectedId, 'Name:', selectedName)
//                     setFormData({ 
//                       ...formData, 
//                       Category: { CategoryID: selectedId, CategoryName: selectedName },
//                       SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: selectedId }
//                     }) 
//                   }} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
//                   required
//                   disabled={dropdownLoading}
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(cat => (
//                     <option key={cat._id} value={cat._id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 {dropdownLoading && <p className="text-sm text-gray-500 mt-1">Loading categories...</p>}
//                 {!dropdownLoading && categories.length === 0 && (
//                   <p className="text-sm text-red-500 mt-1">No categories available</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
//                 <select 
//                   value={formData.SubCategory.SubCategoryID} 
//                   onChange={(e) => {
//                     const selectedId = e.target.value
//                     const selectedName = e.target.options[e.target.selectedIndex].text
//                     console.log('🔍 Selected subcategory ID:', selectedId, 'Name:', selectedName)
//                     setFormData({ 
//                       ...formData, 
//                       SubCategory: { 
//                         SubCategoryID: selectedId, 
//                         SubCategoryName: selectedName, 
//                         CategoryID: formData.Category.CategoryID 
//                       } 
//                     }) 
//                   }} 
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
//                   required
//                   disabled={!formData.Category.CategoryID || subcategories.length === 0 || dropdownLoading}
//                 >
//                   <option value="">Select Subcategory (after choosing category)</option>
//                   {subcategories.map(sub => (
//                     <option key={sub._id} value={sub._id}>
//                       {sub.name}
//                     </option>
//                   ))}
//                 </select>
//                 {formData.Category.CategoryID && subcategories.length === 0 && !dropdownLoading && (
//                   <p className="text-sm text-red-500 mt-1">No subcategories available for this category</p>
//                 )}
//                 {dropdownLoading && <p className="text-sm text-gray-500 mt-1">Loading subcategories...</p>}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea 
//                 placeholder="Enter product description" 
//                 value={formData.Description} 
//                 onChange={(e) => setFormData({ ...formData, Description: e.target.value })} 
//                 rows={4}
//                 style={{ minHeight: '100px' }} // Enhanced: Better visibility
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
//               />
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button 
//                 type="button"
//                 onClick={() => { setShowModal(false); resetForm(); }}
//                 className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 type="submit" 
//                 disabled={!formData.ProductName || !formData.ItemCode || !formData.Unit || !formData.supplierId || !formData.Category.CategoryID || !formData.SubCategory.SubCategoryID || dropdownLoading}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {editingId ? 'Update Product' : 'Create Product'}
//               </button>
//             </div>
//           </form>
//         </Modal>
//       </div>
//     </div>
//   )
// }

// export default Products

//===================with pagination==============


import { useState, useEffect } from 'react'
import { apiCalls } from '../services/api'
import { toast } from 'react-hot-toast'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import { Upload, Edit, Trash2, Plus, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react'

const Products = () => {
  const [products, setProducts] = useState([])
  const [selectedSupplierId, setSelectedSupplierId] = useState("");

  const [totalProducts, setTotalProducts] = useState(0) // New: For real pagination total
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [showBulkModal, setShowBulkModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    ProductName: '',
    ItemCode: '',
    Unit: '',
    Description: '',
    Category: { CategoryID: '', CategoryName: '' },
    SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
    supplierId: '',
  })
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [categories, setCategories] = useState([])  // Expects [{ _id, name }]
  const [subcategories, setSubcategories] = useState([])  // Expects [{ _id, name }]
  const [suppliers, setSuppliers] = useState([])
  const [dropdownLoading, setDropdownLoading] = useState(false)
  const [bulkSupplierId, setBulkSupplierId] = useState('') // New: For bulk modal supplier select

  // Fetch products on page/limit change
  useEffect(() => {
    fetchProducts()
  }, [page, limit])

  // Fetch dropdown data once on mount
  useEffect(() => {
    fetchDropdownData()
  }, [])

  // Log after state updates (optional, for debugging)
  useEffect(() => {
    if (categories.length > 0 || suppliers.length > 0) {
      console.log('✅ Dropdown loaded - Categories:', categories.length, 'Suppliers:', suppliers.length)
    }
  }, [categories, suppliers])

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.Category.CategoryID) {
      fetchSubcategories(formData.Category.CategoryID)
    } else {
      setSubcategories([])
    }
  }, [formData.Category.CategoryID])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await apiCalls.getProducts({ page, limit })
      console.log('📦 Products fetched:', res.data.data?.products || [])
      setProducts(res.data.data?.products || [])
      setTotalProducts(res.data.pagination?.totalElements || 0) // New: Real total
    } catch (error) {
      console.error('❌ Fetch products error:', error)
      toast.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

const fetchDropdownData = async () => {
  try {
    setDropdownLoading(true);
    const [catRes, supRes] = await Promise.all([
      apiCalls.getAllCategories(),
      apiCalls.getSuppliers({ page: 1, limit: 50 }),
    ]);
      
    console.log('📦 Categories response:', catRes.data);
    console.log('📦 Suppliers response FULL:', JSON.stringify(supRes.data, null, 2));  // NEW: Full for debug
      
    // Extract categories as array of { _id, name }
    const catData = catRes.data.categories || catRes.data.data?.categories || catRes.data || [];
    setCategories(Array.isArray(catData) ? catData.map(cat => ({
      _id: cat._id,
      name: cat.name
    })) : []);
      
    // Extract suppliers
    let supData = supRes.data.data?.suppliers || supRes.data?.suppliers || [];
    console.log('📦 Raw suppliers response:', supData.slice(0, 2));  // Log first 2
      
    // FIXED: Enhanced filter - handle ObjectId objects or 'id' key
    const validSuppliers = supData
      .filter(sup => sup)  // Drop nulls
      .map(sup => ({
        _id: (sup._id || sup.id || '').toString(),  // Fallback + force string
        companyName: sup.companyName || 'Unknown',
      }))
      .filter(sup => sup._id && /^[0-9a-fA-F]{24}$/.test(sup._id));  // Now after conversion

    console.log('📦 Mapped suppliers before final filter:', supData.length);
    console.log('📦 Valid suppliers after filter:', validSuppliers.length, validSuppliers.slice(0, 2));

    if (validSuppliers.length === 0) {
      console.warn('⚠️ No valid suppliers found - check backend/DB');
      toast.error('No valid suppliers available. Please add suppliers first or check console for details.');
    } else {
      toast.success(`Loaded ${validSuppliers.length} suppliers!`);  // Optional positive feedback
    }

    setSuppliers(validSuppliers);
  } catch (error) {
    console.error('❌ Fetch dropdown error:', error);
    toast.error('Failed to load dropdowns');
  } finally {
    setDropdownLoading(false);
  }
};




  // Fetch subcategories by category ID
  const fetchSubcategories = async (categoryId) => {
    try {
      setDropdownLoading(true)
      const res = await apiCalls.getSubcategoriesByCategory(categoryId)
      console.log('📦 Subcategories for category', categoryId, ':', res.data)
      
      // Fixed: Backend returns { subCategories } (camelCase)
      const subData = res.data.subCategories || res.data.data?.subCategories || res.data || []
      setSubcategories(Array.isArray(subData) ? subData.map(sub => ({
        _id: sub._id,
        name: sub.name
      })) : [])
    } catch (error) {
      console.error('❌ Fetch subcategories error:', error)
      setSubcategories([])
      toast.error('Failed to load subcategories')
    } finally {
      setDropdownLoading(false)
    }
  }

  // const handleBulkUpload = async () => {
  //   if (!file || !bulkSupplierId) return toast.error('Select file and supplier')
    
  //   const formDataUpload = new FormData()
  //   formDataUpload.append('excelFile', file)
  //   try {
  //     await apiCalls.bulkUploadProducts(bulkSupplierId, formDataUpload)
  //     toast.success('Bulk upload successful')
  //     setShowBulkModal(false)
  //     setFile(null)
  //     setBulkSupplierId('')
  //     fetchProducts()
  //   } catch (error) {
  //     console.error('❌ Bulk upload error:', error)
  //     toast.error('Bulk upload failed: ' + (error.response?.data?.message || error.message))
  //   }
  // }

const handleBulkUpload = async () => {
  if (!file || !bulkSupplierId) {
    return toast.error("Please select a Supplier and choose a file");
  }

  const formDataUpload = new FormData();
  formDataUpload.append("excelFile", file);

  try {
    const res = await apiCalls.bulkUploadProducts(bulkSupplierId, formDataUpload);

    toast.success("Bulk upload successful");

    setFile(null);
    setBulkSupplierId("");
    setShowBulkModal(false);

    fetchProducts();

  } catch (error) {
    console.error("Bulk upload error:", error);
    toast.error("Upload failed");
  }
};





const handleCreateOrUpdate = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      ...formData,
      subCategoryData: formData.SubCategory
    };

    console.log("📤 Sending payload:", payload);

    if (!editingId) {
      // CREATE
      await apiCalls.createProduct(payload);
      toast.success("Product created successfully");
    } else {
      // UPDATE
      await apiCalls.updateProduct(editingId, payload);
      toast.success("Product updated successfully");
    }

    setShowModal(false);
    resetForm();
    fetchProducts();

  } catch (err) {
    console.error("❌ Save product error:", err);
    toast.error(err.response?.data?.message || "Failed to save product");
  }
};


  const resetForm = () => {
    setFormData({
      ProductName: '',
      ItemCode: '',
      Unit: '',
      Description: '',
      Category: { CategoryID: '', CategoryName: '' },
      SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
      supplierId: '',
    })
    setEditingId(null)
    setSubcategories([])
  }

  const handleEdit = (product) => {
    console.log('Editing product:', product)
    setFormData({
      ProductName: product.ProductName || '',
      ItemCode: product.ItemCode || '',
      Unit: product.Unit || '',
      Description: product.Description || '',
      Category: product.Category || { CategoryID: '', CategoryName: '' },
      SubCategory: product.SubCategory || { SubCategoryID: '', SubCategoryName: '', CategoryID: '' },
      supplierId: product.supplierId?._id || product.supplierId || '', // Fixed: Handle populated object
    })
    setEditingId(product._id)
    setShowModal(true)
    // useEffect will fetch subcats if category set
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await apiCalls.deleteProduct(id)
        toast.success('Product deleted successfully')
        fetchProducts()
      } catch (error) {
        console.error('❌ Delete error:', error)
        toast.error('Failed to delete product')
      }
    }
  }

  const filteredProducts = products.filter(product =>
    product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ItemCode?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { key: 'ProductName', label: 'Product Name' },
    { key: 'ItemCode', label: 'Item Code' },
    { 
      key: 'Category.CategoryName', 
      label: 'Category',
      render: (value, row) => row.Category?.CategoryName || 'N/A'
    },
    { 
      key: 'SubCategory.SubCategoryName', 
      label: 'Subcategory',
      render: (value, row) => row.SubCategory?.SubCategoryName || 'N/A'
    },
    { key: 'Unit', label: 'Unit' },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => handleEdit(row)} 
            className="cursor-pointer flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 mr-1" /> Edit
          </button>
          <button 
            onClick={() => handleDelete(row._id)} 
            className="cursor-pointer flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </button>
        </div>
      )
    },
  ]

  // Pagination calculations
  const totalPages = Math.ceil(totalProducts / limit)
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-2">Manage your product inventory and details</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <button 
                onClick={() => setShowBulkModal(true)} 
                className="cursor-pointer flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </button>
              <button 
                onClick={() => { 
                  setShowModal(true); 
                  setEditingId(null); 
                  resetForm();
                }} 
                className="cursor-pointer  flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50"
                disabled={dropdownLoading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p> {/* Fixed: Use total */}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p> {/* Assuming all active */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button className="cursor-pointer  flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="cursor-pointer flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table 
            data={filteredProducts} 
            columns={columns} 
          />
        </div>

        {/* Pagination with Prev/Next Buttons */}
        <div className="mt-6 flex items-center justify-between">
          {/* Prev/Next Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Existing Pagination Component (if it provides page numbers) */}
          {totalPages > 1 && (
            <Pagination 
              page={page} 
              limit={limit} 
              total={totalProducts}
              onPageChange={setPage} 
            />
          )}
        </div>

        {/* Bulk Upload Modal */}
        <Modal title="Bulk Upload Products" open={showBulkModal} onClose={() => { setShowBulkModal(false); setFile(null); setBulkSupplierId(''); }}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
              {/* <select 
                value={bulkSupplierId} 
                onChange={(e) => setBulkSupplierId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                required
              >
                <option value="">Select Supplier</option>
                {suppliers.map(sup => (
                  <option key={sup._id} value={sup._id}>
                    {sup.companyName}
                  </option>
                ))}
              </select> */}

              <select
  value={bulkSupplierId}
  onChange={(e) => setBulkSupplierId(e.target.value)}
  className="w-full border rounded-lg p-3"
>
  <option value="">Select Supplier</option>
  {suppliers.map((sup) => (
    <option key={sup._id} value={sup._id}>
      {sup.companyName}
    </option>
  ))}
</select>


            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your Excel file here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <input 
                type="file" 
                accept=".xlsx,.xls" 
                onChange={(e) => setFile(e.target.files[0])} 
                className="w-full p-2 border rounded-lg" 
              />
            </div>
            {/* <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium mb-2">File Requirements:</p>
              <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                <li>Excel format (.xlsx, .xls)</li>
                <li>Required columns: Product Name, Item Code*(this is should unique), Unit*, Group, Brand, Description</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div> */}

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 shadow-sm">
  <p className="text-blue-900 font-semibold text-base mb-3 flex items-center gap-2">
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
    File Requirements
  </p>

  <ul className="text-sm text-blue-800 space-y-2">
    <li className="flex items-start gap-2">
      <span className="text-blue-600 mt-1">•</span>
      <span>Excel format <span className="font-medium text-blue-900">(.xlsx, .xls)</span></span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-blue-600 mt-1">•</span>
      <span>
        Required columns:
        <span className="font-medium text-blue-900">
          {" "}Product Name, Item Code* (must be unique), Unit*, Group, Brand, Description
        </span>
      </span>
    </li>

    <li className="flex items-start gap-2">
      <span className="text-blue-600 mt-1">•</span>
      <span>
        Maximum file size: 
        <span className="font-medium text-blue-900"> 10MB</span>
      </span>
    </li>
  </ul>
</div>

            <div className="flex gap-3">
              <button 
                onClick={() => { setShowBulkModal(false); setFile(null); setBulkSupplierId(''); }} 
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleBulkUpload} 
                disabled={!file || !bulkSupplierId}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Products
              </button>
            </div>
          </div>
        </Modal>

        {/* Add/Edit Product Modal */}
        <Modal title={editingId ? 'Edit Product' : 'Add New Product'} open={showModal} onClose={() => { setShowModal(false); resetForm(); }}>
          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter product name" 
                  value={formData.ProductName} 
                  onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
                <input 
                  type="text" 
                  placeholder="Enter item code" 
                  value={formData.ItemCode} 
                  onChange={(e) => setFormData({ ...formData, ItemCode: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit *</label>
                <input 
                  type="text" 
                  placeholder="e.g., pieces, kg, liters" 
                  value={formData.Unit} 
                  onChange={(e) => setFormData({ ...formData, Unit: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier *</label>
                <select 
                  value={formData.supplierId} 
                  onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(sup => (
                    <option key={sup._id} value={sup._id}>
                      {sup.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select 
                  value={formData.Category.CategoryID} 
                  onChange={(e) => {
                    const selectedId = e.target.value
                    const selectedName = e.target.options[e.target.selectedIndex].text
                    console.log('🔍 Selected category ID:', selectedId, 'Name:', selectedName)
                    setFormData({ 
                      ...formData, 
                      Category: { CategoryID: selectedId, CategoryName: selectedName },
                      SubCategory: { SubCategoryID: '', SubCategoryName: '', CategoryID: selectedId }
                    }) 
                  }} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
                  required
                  disabled={dropdownLoading}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {dropdownLoading && <p className="text-sm text-gray-500 mt-1">Loading categories...</p>}
                {!dropdownLoading && categories.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">No categories available</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory *</label>
                <select 
                  value={formData.SubCategory.SubCategoryID} 
                  onChange={(e) => {
                    const selectedId = e.target.value
                    const selectedName = e.target.options[e.target.selectedIndex].text
                    console.log('🔍 Selected subcategory ID:', selectedId, 'Name:', selectedName)
                    setFormData({ 
                      ...formData, 
                      SubCategory: { 
                        SubCategoryID: selectedId, 
                        SubCategoryName: selectedName, 
                        CategoryID: formData.Category.CategoryID 
                      } 
                    }) 
                  }} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none" 
                  required
                  disabled={!formData.Category.CategoryID || subcategories.length === 0 || dropdownLoading}
                >
                  <option value="">Select Subcategory (after choosing category)</option>
                  {subcategories.map(sub => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                {formData.Category.CategoryID && subcategories.length === 0 && !dropdownLoading && (
                  <p className="text-sm text-red-500 mt-1">No subcategories available for this category</p>
                )}
                {dropdownLoading && <p className="text-sm text-gray-500 mt-1">Loading subcategories...</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                placeholder="Enter product description" 
                value={formData.Description} 
                onChange={(e) => setFormData({ ...formData, Description: e.target.value })} 
                rows={4}
                style={{ minHeight: '100px' }} // Enhanced: Better visibility
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={() => { setShowModal(false); resetForm(); }}
                className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={!formData.ProductName || !formData.ItemCode || !formData.Unit || !formData.supplierId || !formData.Category.CategoryID || !formData.SubCategory.SubCategoryID || dropdownLoading}
                className="cursor-pointer  flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Products