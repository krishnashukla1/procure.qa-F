//===========================correct with action===============

import { useState, useEffect } from 'react'
import { apiCalls } from '../services/api'
import { toast } from 'react-hot-toast'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import { Plus, Search, Filter, Download, Folder, Edit, Trash2, Image, Tag, List, X, Upload, MoreVertical } from 'lucide-react'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '',
    categoryImage: null 
  })
  const [editingId, setEditingId] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [actionMenu, setActionMenu] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [page, limit])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await apiCalls.getAllCategoriesPaginated({ page, limit })
      setCategories(res.data.data.categories)
    } catch (error) {
      toast.error('Failed to fetch categories')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        if (formData.categoryImage) {
          const formDataToSend = new FormData()
          formDataToSend.append('name', formData.name)
          formDataToSend.append('description', formData.description)
          formDataToSend.append('categoryImage', formData.categoryImage)
          await apiCalls.updateCategoryWithImage(editingId, formDataToSend)
        } else {
          await apiCalls.updateCategory(editingId, {
            name: formData.name,
            description: formData.description
          })
        }
        toast.success('Category updated successfully')
      } else {
        if (formData.categoryImage) {
          const formDataToSend = new FormData()
          formDataToSend.append('name', formData.name)
          formDataToSend.append('description', formData.description)
          formDataToSend.append('categoryImage', formData.categoryImage)
          await apiCalls.createCategoryWithImage(formDataToSend)
        } else {
          await apiCalls.addCategory({
            name: formData.name,
            description: formData.description
          })
        }
        toast.success('Category created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchCategories()
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'create'} category`)
    }
  }

  const handleEdit = (category) => {
    setFormData({ 
      name: category.name, 
      description: category.description || '',
      categoryImage: null 
    })
    setEditingId(category._id)
    setImagePreview(category.categoryImagePath || null)
    setShowModal(true)
    setActionMenu(null)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await apiCalls.deleteCategory(id)
        toast.success('Category deleted successfully')
        fetchCategories()
      } catch (error) {
        toast.error('Failed to delete category')
      }
    }
    setActionMenu(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only JPEG, JPG, and PNG images are allowed')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }

      setFormData(prev => ({ ...prev, categoryImage: file }))
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
const handleExport = () => {
  try {
    // Create CSV content
    const headers = ['Category Name', 'Description', 'Image URL'];
    const csvContent = [
      headers.join(','),
      ...categories.map(category => [
        `"${category.name || ''}"`,
        `"${category.description || ''}"`,
        `"${category.categoryImagePath || ''}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `categories-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Categories exported successfully');
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Failed to export categories');
  }
};
  const removeImage = () => {
    setFormData(prev => ({ ...prev, categoryImage: null }))
    setImagePreview(null)
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', categoryImage: null })
    setEditingId(null)
    setImagePreview(null)
  }

  const handleModalClose = () => {
    setShowModal(false)
    resetForm()
  }

  const toggleActionMenu = (id, e) => {
    e?.stopPropagation()
    setActionMenu(actionMenu === id ? null : id)
  }

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActionMenu(null)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { 
      key: 'name', 
      label: 'Category Name',
      render: (value, row) => (
        <div className="flex items-center">
          {row.categoryImagePath ? (
            <img 
              src={row.categoryImagePath} 
              alt={value}
              className="w-10 h-10 rounded-lg object-cover mr-3"
            />
          ) : (
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Folder className="w-4 h-4 text-blue-600" />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            {row.description && (
              <p className="text-sm text-gray-500 truncate max-w-xs">{row.description}</p>
            )}
          </div>
        </div>
      )
    },
    { 
      key: 'description', 
      label: 'Description',
      render: (value) => (
        <div className="text-gray-600">
          {value || <span className="text-gray-400 italic">No description</span>}
        </div>
      )
    },
    { 
      key: 'categoryImagePath', 
      label: 'Image',
      render: (value) => (
        <div className="flex items-center">
          {value ? (
            <div className="flex items-center text-green-600">
              <Image className="w-4 h-4 mr-2" />
              <span className="text-sm">Uploaded</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-400">
              <Image className="w-4 h-4 mr-2" />
              <span className="text-sm">No image</span>
            </div>
          )}
        </div>
      )
    },
    // { 
    //   key: 'actions', 
    //   label: 'Actions',
    //   render: (value, row) => (
    //     <div className="relative">
    //       <button 
    //         onClick={(e) => toggleActionMenu(row._id, e)}
    //         className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    //       >
    //         <MoreVertical className="w-4 h-4" />
    //       </button>

    //       {actionMenu === row._id && (
    //         <div className="absolute right-0 top-10 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
    //           <button 
    //             onClick={(e) => {
    //               e.stopPropagation()
    //               handleEdit(row)
    //             }}
    //             className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    //           >
    //             <Edit className="w-4 h-4 mr-3 text-blue-600" />
    //             Edit Category
    //           </button>
              
    //           <button 
    //             onClick={(e) => {
    //               e.stopPropagation()
    //               handleDelete(row._id)
    //             }}
    //             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
    //           >
    //             <Trash2 className="w-4 h-4 mr-3" />
    //             Delete Category
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   )
    // },

    { 
  key: 'actions', 
  label: 'Actions',
  render: (value, row) => (
    <div className="flex items-center space-x-2">
      {/* Edit Button */}
      <button 
        onClick={() => handleEdit(row)} 
        className="cursor-pointer  flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
        title="Edit Category"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      {/* Delete Button */}
      <button 
        onClick={() => handleDelete(row._id)} 
        className="cursor-pointer  flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
        title="Delete Category"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
},
  ]

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
              <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-gray-600 mt-2">Organize your products with categories and subcategories</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              {/* <button className="flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-3 rounded-lg font-medium transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button> */}

              <button 
  onClick={handleExport}
  className="cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
>
  <Download className="w-4 h-4 mr-2" />
  Export
</button>
              <button 
                onClick={() => { 
                  setShowModal(true); 
                  resetForm();
                }} 
                className="cursor-pointer  flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <List className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Image className="w-6 h-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">With Images</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(cat => cat.categoryImagePath).length}
                </p>
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
                placeholder="Search categories by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table 
            data={filteredCategories} 
            columns={columns} 
          />
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination 
            page={page} 
            limit={limit} 
            total={categories.length > 0 ? 100 : 0}
            onPageChange={setPage} 
          />
        </div>

        {/* Add/Edit Category Modal */}
        <Modal 
          title={editingId ? 'Edit Category' : 'Add New Category'} 
          open={showModal} 
          onClose={handleModalClose}
        >
          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Enter category name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea 
                placeholder="Enter category description (optional)" 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors relative">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Category preview" 
                      className="w-32 h-32 object-cover rounded-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-xs mt-1">PNG, JPG, JPEG up to 5MB</p>
                  </>
                )}
                <input 
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <button
                  type="button"
                  onClick={() => document.querySelector('input[type="file"]')?.click()}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {imagePreview ? 'Change Image' : 'Choose Image'}
                </button>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={handleModalClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {editingId ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Categories