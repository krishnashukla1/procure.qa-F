//=====================CORRECT===================

// import { useState, useEffect, useCallback } from 'react';
// import { apiCalls } from '../services/api';
// import { toast } from 'react-hot-toast';
// import Table from '../components/Table';
// import Modal from '../components/Modal';
// import { Image, Edit, Trash2, Plus, Upload, RefreshCw, Loader2, X, AlertTriangle } from 'lucide-react';

// const Banners = () => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({ description: '', bannerImage: null });
//   const [editingId, setEditingId] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     try {
//       console.log('🔄 Fetching banners...');
//       const response = await apiCalls.getBannersAdmin({ page: 1, limit: 50 });
//       console.log('✅ API Response:', response.data);
//       setBanners(response.data.data || []);
//     } catch (error) {
//       console.error('❌ Error fetching banners:', error);
//       toast.error(error.response?.data?.message || 'Failed to fetch banners');
//       setBanners([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleCreateOrUpdate = async (e) => {
//     e.preventDefault();
//     if (!formData.bannerImage && !editingId) return toast.error('Please select an image');

//     setUploading(true);
//     try {
//       const submitData = new FormData();
//       submitData.append('description', formData.description);
//       if (formData.bannerImage) submitData.append('bannerImage', formData.bannerImage);

//       if (editingId) {
//         await apiCalls.updateBanner(editingId, submitData);
//         toast.success('Banner updated successfully!');
//       } else {
//         await apiCalls.createBanner(submitData);
//         toast.success('Banner created successfully!');
//       }

//       setShowModal(false);
//       resetForm();
//       fetchBanners();
//     } catch (error) {
//       console.error('❌ Error saving banner:', error);
//       toast.error(error.response?.data?.message || 'Failed to save banner');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ description: '', bannerImage: null });
//     setEditingId(null);
//     setImagePreview(null);
//     const fileInput = document.getElementById('bannerImage');
//     if (fileInput) fileInput.value = '';
//   };

//   const handleEdit = (banner) => {
//     setFormData({
//       description: banner.description || '',
//       bannerImage: null
//     });
//     setEditingId(banner._id);
//     setImagePreview(banner.bannerImage);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this banner?')) return;
//     try {
//       await apiCalls.deleteBanner(id);
//       setBanners((prev) => prev.filter((b) => b._id !== id));
//       toast.success('Banner deleted!');
//     } catch (error) {
//       console.error('Delete error:', error);
//       toast.error(error.response?.data?.message || 'Failed to delete');
//       fetchBanners(); // Re-fetch
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith('image/')) return toast.error('Image files only');
//     if (file.size > 5 * 1024 * 1024) return toast.error('Max 5MB');

//     setFormData((prev) => ({ ...prev, bannerImage: file }));
//     const preview = URL.createObjectURL(file);
//     setImagePreview(preview);
//   };

//   const columns = [
//     {
//       key: 'bannerImage',
//       label: 'Preview',
//       render: (img, row) => (
//         <div className="flex items-center justify-center p-2">
//           {img ? (
//             <img
//               src={img}
//               alt={row.description}
//               className="w-32 h-16 object-cover rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//                 e.target.parentNode.innerHTML = (
//                   <div className="w-32 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
//                     <AlertTriangle className="w-6 h-6 text-gray-500" />
//                   </div>
//                 );
//               }}
//             />
//           ) : (
//             <div className="w-32 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center shadow-md">
//               <Image className="w-8 h-8 text-gray-400" />
//             </div>
//           )}
//         </div>
//       )
//     },
//     {
//       key: 'description',
//       label: 'Description',
//       render: (desc) => (
//         <div className="max-w-md">
//           <p className="font-medium text-gray-900 line-clamp-2">{desc || 'No description'}</p>
//           <p className="text-xs text-gray-500 mt-1">Click to edit</p>
//         </div>
//       )
//     },
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
//             title="Edit Banner"
//           >
//             <Edit className="w-5 h-5" />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
//             title="Delete Banner"
//           >
//             <Trash2 className="w-5 h-5" />
//           </button>
//         </div>
//       )
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8">
//         <div className="text-center space-y-6 animate-pulse">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
//             <Loader2 className="w-8 h-8 text-white animate-spin" />
//           </div>
//           <div>
//             <p className="text-xl font-semibold text-gray-700">Loading Banners...</p>
//             <p className="text-gray-500">Fetching your promotional content</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6 lg:p-8">
//       {/* Animated Background Blobs */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
//         <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto space-y-8">
//         {/* Hero Header */}
//         <div className="text-center mb-8 lg:mb-12 pt-4">
//           <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4">
//             Banner Studio
//           </h1>
//           <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Craft eye-catching promotions that captivate your audience and drive engagement on the homepage.
//           </p>
//           <div className="flex justify-center mt-6 flex-wrap gap-2">
//             <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-md">
//               <Image className="w-4 h-4 mr-2" /> Visual Editor
//             </span>
//             <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-md">
//               <Upload className="w-4 h-4 mr-2" /> Instant Upload
//             </span>
//             <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 shadow-md">
//               <Edit className="w-4 h-4 mr-2" /> Live Preview
//             </span>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
//               <h2 className="text-2xl font-bold text-gray-800">Banner Gallery</h2>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={fetchBanners}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 shadow-sm hover:shadow-md"
//               >
//                 <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//               <button
//                 onClick={() => { setShowModal(true); resetForm(); }}
//                 className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Banner
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20">
//             <h3 className="text-sm font-medium text-gray-600 mb-2">Total Banners</h3>
//             <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//               {banners.length}
//             </p>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20">
//             <h3 className="text-sm font-medium text-gray-600 mb-2">Status</h3>
//             <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//               Active
//             </p>
//           </div>
//           <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/20">
//             <h3 className="text-sm font-medium text-gray-600 mb-2">Last Updated</h3>
//             <p className="text-xl font-semibold text-gray-900">
//               {banners.length > 0 ? new Date(banners[0].updatedAt).toLocaleDateString() : 'N/A'}
//             </p>
//           </div>
//         </div>

//         {/* Banners Table */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
//           <div className="p-6 border-b border-gray-100/50">
//             <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//               <Image className="w-5 h-5 text-blue-600" />
//               Banner Collection
//             </h3>
//             <p className="text-sm text-gray-600 mt-1">Drag to reorder or edit your promotions</p>
//           </div>
//           {banners.length === 0 ? (
//             <div className="text-center py-16">
//               <div className="w-24 h-24 mx-auto mb-6 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
//                 <Image className="w-12 h-12 text-gray-400" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-600 mb-2">No Banners Yet</h3>
//               <p className="text-gray-500 mb-6">Start by adding your first promotional masterpiece</p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium"
//               >
//                 Create First Banner
//               </button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <Table data={banners} columns={columns} />
//             </div>
//           )}
//         </div>

//         {/* Create/Edit Modal */}
//         <Modal
//           title={editingId ? '✏️ Edit Banner' : '🎨 New Banner'}
//           open={showModal}
//           onClose={() => { setShowModal(false); resetForm(); }}
//           size="lg"
//         >
//           <form onSubmit={handleCreateOrUpdate} className="space-y-6">
//             {/* Description */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                 <Edit className="w-4 h-4 text-blue-600" />
//                 Description
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
//                 className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-200/50 focus:border-blue-300 resize-none min-h-[100px] placeholder-gray-500"
//                 placeholder="Enter a captivating description for your banner (e.g., 'Summer Sale: Up to 50% Off!')"
//                 rows="3"
//               />
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
//                 <Upload className="w-4 h-4 text-green-600" />
//                 Banner Image {!editingId && <span className="text-red-500">*</span>}
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
//                 <input
//                   id="bannerImage"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   required={!editingId}
//                 />
//                 <label htmlFor="bannerImage" className="cursor-pointer flex flex-col items-center gap-2">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
//                     <Upload className="w-6 h-6" />
//                   </div>
//                   <p className="text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
//                   <p className="text-xs text-gray-500">JPEG, PNG, GIF • Max 5MB • Recommended 1920x600</p>
//                 </label>
//               </div>
//             </div>

//             {/* Preview */}
//             {imagePreview && (
//               <div className="relative bg-gray-50 rounded-2xl p-4 overflow-hidden shadow-inner">
//                 <img
//                   src={imagePreview}
//                   alt="Banner Preview"
//                   className="w-full h-48 object-cover rounded-xl shadow-lg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, bannerImage: null })); }}
//                   className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-md"
//                 >
//                   <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
//                 </button>
//                 <p className="text-xs text-gray-600 mt-2 text-center font-medium">Live Preview – Looks great!</p>
//               </div>
//             )}

//             {/* Actions */}
//             <div className="flex gap-4 pt-6">
//               <button
//                 type="button"
//                 onClick={() => { setShowModal(false); resetForm(); }}
//                 className="flex-1 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-medium shadow-sm"
//                 disabled={uploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={uploading || (!formData.bannerImage && !editingId)}
//                 className="flex-1 flex items-center justify-center gap-3 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium hover:scale-105"
//               >
//                 {uploading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     {editingId ? 'Updating...' : 'Creating...'}
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="w-5 h-5" />
//                     {editingId ? 'Update Banner' : 'Create Banner'}
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
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

// export default Banners;

//========================stylish deep seek==========

import { useState, useEffect, useCallback } from "react";
import { apiCalls } from "../services/api";
import { toast } from "react-hot-toast";
import Table from "../components/Table";
import Modal from "../components/Modal";
import {
  Image,
  Edit,
  Trash2,
  Plus,
  Upload,
  RefreshCw,
  Loader2,
  X,
  AlertTriangle,
  Sparkles,
  Palette,
  Zap,
  Star,
  Target,
  ArrowUpDown,
  Filter,
  Search,
  Grid3X3,
} from "lucide-react";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    bannerImage: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      console.log("🔄 Fetching banners...");
      const response = await apiCalls.getBannersAdmin({ page: 1, limit: 50 });
      console.log("✅ API Response:", response.data);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching banners:", error);
      toast.error(error.response?.data?.message || "Failed to fetch banners");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (!formData.bannerImage && !editingId)
      return toast.error("Please select an image");

    setUploading(true);
    try {
      const submitData = new FormData();
      submitData.append("description", formData.description);
      if (formData.bannerImage)
        submitData.append("bannerImage", formData.bannerImage);

      if (editingId) {
        await apiCalls.updateBanner(editingId, submitData);
        toast.success("🎉 Banner updated successfully!");
      } else {
        await apiCalls.createBanner(submitData);
        toast.success("✨ Banner created successfully!");
      }

      setShowModal(false);
      resetForm();
      fetchBanners();
    } catch (error) {
      console.error("❌ Error saving banner:", error);
      toast.error(error.response?.data?.message || "Failed to save banner");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({ description: "", bannerImage: null });
    setEditingId(null);
    setImagePreview(null);
    const fileInput = document.getElementById("bannerImage");
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (banner) => {
    setFormData({
      description: banner.description || "",
      bannerImage: null,
    });
    setEditingId(banner._id);
    setImagePreview(banner.bannerImage);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await apiCalls.deleteBanner(id);
      setBanners((prev) => prev.filter((b) => b._id !== id));
      toast.success("🗑️ Banner deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete banner");
      fetchBanners();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return toast.error("Please select an image file");
    if (file.size > 5 * 1024 * 1024)
      return toast.error("File size must be less than 5MB");

    setFormData((prev) => ({ ...prev, bannerImage: file }));
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const filteredBanners = banners.filter((banner) =>
    banner.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBanners = [...filteredBanners].sort((a, b) => {
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

  const columns = [
    {
      key: "bannerImage",
      label: "Preview",
      sortable: true,
      render: (img, row) => (
        <div className="flex items-center justify-center p-2 group">
          {img ? (
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <img
                src={img}
                alt={row.description}
                className="w-32 h-16 object-cover transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = (
                    <div className="w-32 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-gray-500" />
                    </div>
                  );
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-32 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      sortable: true,
      render: (desc) => (
        <div className="max-w-md group">
          <p className="font-semibold text-gray-200 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {desc || "No description provided"}
          </p>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Edit className="w-3 h-3" />
            Click to edit
          </p>
        </div>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      sortable: true,
      render: (date) => (
        <div className="text-sm text-gray-200">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
            title="Edit Banner"
          >
            <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="cursor-pointer p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
            title="Delete Banner"
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center space-y-6 relative z-10">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-spin">
              <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Loading Banners
            </h3>
            <p className="text-purple-200/80 font-medium">
              Preparing your visual masterpiece...
            </p>
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="text-center mb-8 lg:mb-12 pt-8">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/10 mb-6 shadow-2xl">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-lg font-semibold text-white">
              Banner Management
            </span>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
            Visual Studio
          </h1>
          <p className="text-xl lg:text-2xl text-purple-200/90 max-w-4xl mx-auto leading-relaxed font-medium">
            Craft stunning promotional banners that captivate your audience and
            drive engagement with our advanced visual editor.
          </p>

          <div className="flex justify-center mt-8 flex-wrap gap-3">
            {[
              {
                icon: Palette,
                text: "Visual Editor",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Zap,
                text: "Instant Upload",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Star,
                text: "Live Preview",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Target,
                text: "Smart Analytics",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold`}
              >
                <item.icon className="w-4 h-4" />
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Grid3X3 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/20 shadow-lg"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Banner Gallery
                </h2>
                <p className="text-purple-200/80 font-medium">
                  Manage your promotional content
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/70" />
                <input
                  type="text"
                  placeholder="Search banners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-lg"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={fetchBanners}
                  disabled={loading}
                  className="cursor-pointer flex items-center gap-3 px-6 py-3 bg-white/5 text-purple-200 rounded-2xl hover:bg-white/10 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl border border-white/10 hover:border-white/20 font-semibold"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    resetForm();
                  }}
                  className="cursor-pointer flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold group"
                >
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  Create Banner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Banners",
              value: banners.length,
              color: "from-blue-500 to-cyan-500",
              icon: Grid3X3,
            },
            {
              label: "Active Status",
              value: "Live",
              color: "from-green-500 to-emerald-500",
              icon: Zap,
            },
            {
              label: "Storage Used",
              value: `${(banners.length * 0.5).toFixed(1)}MB`,
              color: "from-purple-500 to-pink-500",
              icon: Image,
            },
            {
              label: "Performance",
              value: "Optimal",
              color: "from-orange-500 to-red-500",
              icon: Star,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 group"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon
                  className={`w-8 h-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                />
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <h3 className="text-sm font-semibold text-purple-200/80 mb-2">
                {stat.label}
              </h3>
              <p
                className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Banners Table Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
                  <Image className="w-6 h-6 text-blue-400" />
                  
                  <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold">
                    {sortedBanners.length} items
                  </span>
                </h3>
                <p className="text-purple-200/70 font-medium">
                  Drag to reorder or edit your visual promotions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-purple-200 hover:bg-white/10 transition-all duration-300">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>
              </div>
            </div>
          </div>

          {sortedBanners.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                <Image className="w-16 h-16 text-purple-400/50" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No Banners Created
              </h3>
              <p className="text-purple-200/70 mb-8 text-lg max-w-md mx-auto">
                Start crafting your first stunning promotional masterpiece to
                engage your audience
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold text-lg"
              >
                Create First Banner
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="bg-white/5 border-b border-white/10">
                  <div className="grid grid-cols-12 gap-4 px-8 py-4 text-sm font-semibold text-purple-200/80">
                    {columns.map((column) => (
                      <div
                        key={column.key}
                        className="col-span-3 flex items-center gap-2"
                      >
                        {column.label}
                        {column.sortable && (
                          <button
                            onClick={() => requestSort(column.key)}
                            className="hover:text-white transition-colors duration-200"
                          >
                            <ArrowUpDown className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {sortedBanners.map((banner, index) => (
                    <div
                      key={banner._id}
                      className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-white/5 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {columns.map((column) => (
                        <div
                          key={column.key}
                          className="col-span-3 flex items-center"
                        >
                          {column.render ? (
                            column.render(banner[column.key], banner)
                          ) : (
                            <span className="text-white">
                              {banner[column.key]}
                            </span>

                            
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Create/Edit Modal */}

    <Modal
  title={
    <div className="flex items-center gap-4 px-8 py-1.5">
      {editingId ? (
        <>
          <Edit className="w-6 h-6 text-blue-400 drop-shadow-glow" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold text-2xl tracking-wide drop-shadow">
            Edit Banner
          </span>
        </>
      ) : (
        <>
          <Plus className="w-6 h-6 text-green-400 drop-shadow-glow" />
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold text-2xl tracking-wide drop-shadow">
            Create Banner
          </span>
        </>
      )}
    </div>
  }
  open={showModal}
  onClose={() => {
    setShowModal(false);
    resetForm();
  }}
  className="!p-0"
  size="xl"
>
  <div className="p-6 bg-gradient-to-br from-[#0f0f11] via-[#111113] to-[#0b0b0d] rounded-3xl shadow-2xl border border-white/10 backdrop-blur-2xl animate-in fade-in duration-300">
    <form onSubmit={handleCreateOrUpdate} className="space-y-6">
      {/* Description and Image Upload - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
            <Edit className="w-4 h-4 text-blue-400 drop-shadow-glow" />
            Banner Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full p-4 text-white/90 bg-white/10 border border-white/20 rounded-2xl
              focus:outline-none focus:ring-2 focus:ring-blue-500/40
              focus:border-blue-500/40 resize-none shadow-inner min-h-[100px]
              placeholder-white/40 backdrop-blur-xl transition-all duration-300"
            placeholder="Write an engaging banner message… (e.g., 'Mega Sale – 50% OFF!')"
            rows="3"
          />
        </div>
        
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
            <Upload className="w-4 h-4 text-green-400 drop-shadow-glow" />
            Banner Image{" "}
            {!editingId && <span className="text-red-400">*</span>}
          </label>
          <div
            className="border-2 border-dashed border-white/20 rounded-2xl p-4 text-center
                  hover:border-blue-400/50 hover:bg-white/10
                  transition-all duration-500 group shadow-xl bg-white/5 backdrop-blur-xl"
          >
            <input
              id="bannerImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required={!editingId}
            />
            <label
              htmlFor="bannerImage"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <div
                className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl
                      flex items-center justify-center text-white shadow-2xl
                      group-hover:scale-110 group-hover:rotate-1
                      transition-all duration-300"
              >
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  Click to Upload
                </p>
                <p className="text-xs text-blue-300">
                  JPG / PNG / GIF • Max 5MB • 1920×600
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Preview */}
      {imagePreview && (
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/10 fade-in">
          <button
            type="button"
            onClick={() => {
              setImagePreview(null);
              setFormData((prev) => ({ ...prev, bannerImage: null }));
            }}
            className="absolute top-3 right-3 p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-all shadow border border-red-300/30 backdrop-blur-md"
          >
            <X className="w-4 h-4 text-red-300" />
          </button>
          <img
            src={imagePreview}
            alt="Banner Preview"
            className="w-full h-40 object-cover rounded-xl shadow-xl ring-1 ring-white/20"
          />
          <div className="absolute bottom-3 left-3 bg-black/40 rounded-lg px-3 py-1.5 backdrop-blur-sm border border-white/20">
            <p className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-yellow-400" />
              Live Preview
            </p>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex gap-4 pt-3">
        {/* Cancel */}
        <button
          type="button"
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          disabled={uploading}
          className="cursor-pointer flex-1 px-6 py-3 border-2 border-white/20 text-white rounded-2xl
            hover:border-white/40 hover:bg-white/10 transition-all duration-300
            font-bold backdrop-blur-lg shadow-xl text-sm"
        >
          Cancel
        </button>
        {/* Submit */}
        <button
          type="submit"
          disabled={uploading || (!formData.bannerImage && !editingId)}
          className="cursor-pointer flex-1 flex items-center justify-center gap-2 px-6 py-3
            bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl
            shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 font-bold hover:scale-105 group text-sm"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="animate-pulse">
                {editingId
                  ? "Updating..."
                  : "Creating..."}
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              {editingId ? "Update Banner" : "Create Banner"}
            </>
          )}
        </button>
      </div>
    </form>
  </div>
</Modal>



        
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
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

export default Banners;
//==========================grok====

// import { useState, useEffect, useCallback } from "react";
// import { apiCalls } from "../services/api";
// import { toast } from "react-hot-toast";
// import Modal from "../components/Modal";
// import {
//   Image,
//   Edit,
//   Trash2,
//   Plus,
//   Upload,
//   RefreshCw,
//   Loader2,
//   X,
//   AlertTriangle,
//   Sparkles,
//   Palette,
//   Zap,
//   Star,
//   Target,
//   ArrowUpDown,
//   Filter,
//   Search,
//   Grid3X3,
// } from "lucide-react";

// const Banners = () => {
//   const [banners, setBanners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [formData, setFormData] = useState({
//     description: "",
//     bannerImage: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     try {
//       console.log("🔄 Fetching banners...");
//       const response = await apiCalls.getBannersAdmin({ page: 1, limit: 50 });
//       console.log("✅ API Response:", response.data);
//       setBanners(response.data.data || []);
//     } catch (error) {
//       console.error("❌ Error fetching banners:", error);
//       toast.error(error.response?.data?.message || "Failed to fetch banners");
//       setBanners([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleCreateOrUpdate = async (e) => {
//     e.preventDefault();
//     if (!formData.bannerImage && !editingId)
//       return toast.error("Please select an image");

//     setUploading(true);
//     try {
//       const submitData = new FormData();
//       submitData.append("description", formData.description);
//       if (formData.bannerImage)
//         submitData.append("bannerImage", formData.bannerImage);

//       if (editingId) {
//         await apiCalls.updateBanner(editingId, submitData);
//         toast.success("🎉 Banner updated successfully!");
//       } else {
//         await apiCalls.createBanner(submitData);
//         toast.success("✨ Banner created successfully!");
//       }

//       setShowModal(false);
//       resetForm();
//       fetchBanners();
//     } catch (error) {
//       console.error("❌ Error saving banner:", error);
//       toast.error(error.response?.data?.message || "Failed to save banner");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({ description: "", bannerImage: null });
//     setEditingId(null);
//     setImagePreview(null);
//     const fileInput = document.getElementById("bannerImage");
//     if (fileInput) fileInput.value = "";
//   };

//   const handleEdit = (banner) => {
//     setFormData({
//       description: banner.description || "",
//       bannerImage: null,
//     });
//     setEditingId(banner._id);
//     setImagePreview(banner.bannerImage);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;
//     try {
//       await apiCalls.deleteBanner(id);
//       setBanners((prev) => prev.filter((b) => b._id !== id));
//       toast.success("🗑️ Banner deleted successfully!");
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error(error.response?.data?.message || "Failed to delete banner");
//       fetchBanners();
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/"))
//       return toast.error("Please select an image file");
//     if (file.size > 5 * 1024 * 1024)
//       return toast.error("File size must be less than 5MB");

//     setFormData((prev) => ({ ...prev, bannerImage: file }));
//     const preview = URL.createObjectURL(file);
//     setImagePreview(preview);
//   };

//   const filteredBanners = banners.filter((banner) =>
//     banner.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const sortedBanners = [...filteredBanners].sort((a, b) => {
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
//       key: "bannerImage",
//       label: "Preview",
//       sortable: false,
//       render: (img, row) => (
//         <div className="flex items-center justify-center p-2 group relative">
//           <div
//             className={`w-32 h-16 rounded-2xl border-2 border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden ${
//               img ? "bg-transparent" : "bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
//             }`}
//           >
//             {img ? (
//               <img
//                 src={img}
//                 alt={row.description || "Banner"}
//                 className="w-full h-full object-cover transition-transform duration-500"
//               />
//             ) : (
//               <Image className="w-8 h-8 text-gray-400" />
//             )}
//             {img && (
//               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             )}
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: "description",
//       label: "Description",
//       sortable: true,
//       render: (desc) => (
//         <div className="max-w-md group">
//           <p className="font-semibold text-gray-200 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
//             {desc || "No description provided"}
//           </p>
//           <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
//             <Edit className="w-3 h-3" />
//             Click to edit
//           </p>
//         </div>
//       ),
//     },
//     {
//       key: "updatedAt",
//       label: "Last Updated",
//       sortable: true,
//       render: (date) => (
//         <div className="text-sm text-gray-200">
//           {new Date(date).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </div>
//       ),
//     },
//     {
//       key: "actions",
//       label: "Actions",
//       sortable: false,
//       render: (_, row) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Edit Banner"
//           >
//             <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
//           </button>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
//             title="Delete Banner"
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
//               Loading Banners
//             </h3>
//             <p className="text-purple-200/80 font-medium">
//               Preparing your visual masterpiece...
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
//               Banner Management
//             </span>
//             <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
//           </div>

//           <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
//             Visual Studio
//           </h1>
//           <p className="text-xl lg:text-2xl text-purple-200/90 max-w-4xl mx-auto leading-relaxed font-medium">
//             Craft stunning promotional banners that captivate your audience and
//             drive engagement with our advanced visual editor.
//           </p>

//           <div className="flex justify-center mt-8 flex-wrap gap-3">
//             {[
//               {
//                 icon: Palette,
//                 text: "Visual Editor",
//                 color: "from-blue-500 to-cyan-500",
//               },
//               {
//                 icon: Zap,
//                 text: "Instant Upload",
//                 color: "from-green-500 to-emerald-500",
//               },
//               {
//                 icon: Star,
//                 text: "Live Preview",
//                 color: "from-purple-500 to-pink-500",
//               },
//               {
//                 icon: Target,
//                 text: "Smart Analytics",
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
//                   Banner Gallery
//                 </h2>
//                 <p className="text-purple-200/80 font-medium">
//                   Manage your promotional content
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               {/* Search Bar */}
//               <div className="relative flex-1 lg:flex-initial">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300/70" />
//                 <input
//                   type="text"
//                   placeholder="Search banners..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full lg:w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-lg"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={fetchBanners}
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
//                   Create Banner
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Dashboard */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               label: "Total Banners",
//               value: banners.length,
//               color: "from-blue-500 to-cyan-500",
//               icon: Grid3X3,
//             },
//             {
//               label: "Active Status",
//               value: "Live",
//               color: "from-green-500 to-emerald-500",
//               icon: Zap,
//             },
//             {
//               label: "Storage Used",
//               value: `${(banners.length * 0.5).toFixed(1)}MB`,
//               color: "from-purple-500 to-pink-500",
//               icon: Image,
//             },
//             {
//               label: "Performance",
//               value: "Optimal",
//               color: "from-orange-500 to-red-500",
//               icon: Star,
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

//         {/* Banners Table Section */}
//         <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
//           <div className="p-8 border-b border-white/10">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <div>
//                 <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-2">
//                   <Image className="w-6 h-6 text-blue-400" />
                  
//                   <span className="text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-semibold">
//                     {sortedBanners.length} items
//                   </span>
//                 </h3>
//                 <p className="text-purple-200/70 font-medium">
//                   Drag to reorder or edit your visual promotions
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

//           {sortedBanners.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-32 h-32 mx-auto mb-8 p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
//                 <Image className="w-16 h-16 text-purple-400/50" />
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-4">
//                 No Banners Created
//               </h3>
//               <p className="text-purple-200/70 mb-8 text-lg max-w-md mx-auto">
//                 Start crafting your first stunning promotional masterpiece to
//                 engage your audience
//               </p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold text-lg"
//               >
//                 Create First Banner
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
//                         className="col-span-3 flex items-center gap-2"
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
//                   {sortedBanners.map((banner, index) => (
//                     <div
//                       key={banner._id}
//                       className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-white/5 transition-all duration-300 group"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       {columns.map((column) => (
//                         <div
//                           key={column.key}
//                           className="col-span-3 flex items-center"
//                         >
//                           {column.render ? (
//                             column.render(banner[column.key], banner)
//                           ) : (
//                             <span className="text-white">
//                               {banner[column.key]}
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
//                     Edit Banner
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Plus className="w-7 h-7 text-green-400 drop-shadow-glow" />
//                   <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent font-extrabold text-3xl tracking-wide drop-shadow">
//                     Create Banner
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
//             <form onSubmit={handleCreateOrUpdate} className="space-y-10">
//               {/* Description */}
//               <div className="space-y-2">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Edit className="w-5 h-5 text-blue-400 drop-shadow-glow" />
//                   Banner Description
//                 </label>

//                 <textarea
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       description: e.target.value,
//                     }))
//                   }
//                   className="w-full p-5 text-white/90 bg-white/10 border border-white/20 rounded-2xl 
//                      focus:outline-none focus:ring-2 focus:ring-blue-500/40 
//                      focus:border-blue-500/40 resize-none shadow-inner min-h-[130px]
//                      placeholder-white/40 backdrop-blur-xl transition-all duration-300"
//                   placeholder="Write an engaging banner message… (e.g., 'Mega Sale – 50% OFF!')"
//                   rows="3"
//                 />
//               </div>

//               {/* Image Upload */}
//               <div className="space-y-3">
//                 <label className="block text-sm font-bold text-white/90 tracking-wide flex items-center gap-2">
//                   <Upload className="w-5 h-5 text-green-400 drop-shadow-glow" />
//                   Banner Image{" "}
//                   {!editingId && <span className="text-red-400">*</span>}
//                 </label>

//                 <div
//                   className="border-2 border-dashed border-white/20 rounded-3xl p-8 text-center 
//                         hover:border-blue-400/50 hover:bg-white/10
//                         transition-all duration-500 group shadow-xl bg-white/5 backdrop-blur-xl"
//                 >
//                   <input
//                     id="bannerImage"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     required={!editingId}
//                   />

//                   <label
//                     htmlFor="bannerImage"
//                     className="cursor-pointer flex flex-col items-center gap-5"
//                   >
//                     <div
//                       className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl 
//                             flex items-center justify-center text-white shadow-2xl 
//                             group-hover:scale-110 group-hover:rotate-1 
//                             transition-all duration-300"
//                     >
//                       <Upload className="w-9 h-9" />
//                     </div>

//                     <div className="space-y-1">
//                       <p className="text-lg font-semibold text-white">
//                         Click to Upload or Drag & Drop
//                       </p>
//                       <p className="text-sm text-blue-300">
//                         JPG / PNG / GIF • Max 5MB • Best Size:{" "}
//                         <span className="font-bold">1920×600</span>
//                       </p>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               {/* Preview */}
//               {imagePreview && (
//                 <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 fade-in">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImagePreview(null);
//                       setFormData((prev) => ({ ...prev, bannerImage: null }));
//                     }}
//                     className="absolute top-4 right-4 p-2 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition-all shadow border border-red-300/30 backdrop-blur-md"
//                   >
//                     <X className="w-5 h-5 text-red-300" />
//                   </button>

//                   <img
//                     src={imagePreview}
//                     alt="Banner Preview"
//                     className="w-full h-56 object-cover rounded-xl shadow-xl ring-1 ring-white/20"
//                   />

//                   <div className="absolute bottom-4 left-4 bg-black/40 rounded-xl px-4 py-2 backdrop-blur-sm border border-white/20">
//                     <p className="text-sm font-semibold text-white flex items-center gap-2">
//                       <Sparkles className="w-4 h-4 text-yellow-400" />
//                       Live Preview
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex gap-6 pt-4">
//                 {/* Cancel */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     resetForm();
//                   }}
//                   disabled={uploading}
//                   className="flex-1 px-8 py-4 border-2 border-white/20 text-white rounded-2xl 
//                      hover:border-white/40 hover:bg-white/10 transition-all duration-300 
//                      font-bold backdrop-blur-lg shadow-xl"
//                 >
//                   Cancel
//                 </button>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={uploading || (!formData.bannerImage && !editingId)}
//                   className="flex-1 flex items-center justify-center gap-3 px-8 py-4 
//                      bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl 
//                      shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed 
//                      transition-all duration-300 font-bold hover:scale-105 group"
//                 >
//                   {uploading ? (
//                     <>
//                       <Loader2 className="w-6 h-6 animate-spin" />
//                       <span className="animate-pulse">
//                         {editingId
//                           ? "Updating Banner..."
//                           : "Creating Banner..."}
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
//                       {editingId ? "Update Banner" : "Create Banner"}
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

// export default Banners;
