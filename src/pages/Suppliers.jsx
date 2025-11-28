import { useState, useEffect, useCallback } from 'react'
import { apiCalls } from '../services/api'
import { toast } from 'react-hot-toast'
import Pagination from '../components/Pagination'
import Modal from '../components/Modal'
import { Plus, Search, Filter, Download, Building, Mail, Phone, MapPin, Edit, Trash2, Users, Save, X } from 'lucide-react'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalSuppliers, setTotalSuppliers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingRow, setEditingRow] = useState(null)
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '',
    email: '', 
    companyName: '', 
    companyType: '',
    contactNumber: '', 
    officeAddress: '',
    productCategories: [],
    productSubCategories: []
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchSuppliers()
    }
  }, [page, limit])

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId
      return (searchValue) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          if (searchValue.trim() !== '') {
            handleSearch(searchValue)
          } else {
            fetchSuppliers()
          }
        }, 500) // 500ms delay
      }
    })(),
    []
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const fetchSuppliers = async () => {
    try {
      setLoading(true)
      const res = await apiCalls.getSuppliers({ page, limit })
      if (res.data && res.data.error === false) {
        setSuppliers(res.data.data.suppliers)
        setTotalSuppliers(res.data.pagination.totalElements)
        setTotalPages(res.data.pagination.totalPages)
      } else {
        toast.error(res.data?.message || 'Failed to fetch suppliers')
      }
    } catch (error) {
      console.error('Fetch suppliers error:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch suppliers')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (searchValue) => {
    if (!searchValue.trim()) {
      fetchSuppliers()
      return
    }

    try {
      setSearchLoading(true)
      
      // Try both search endpoints
      const [queryResults, nameResults] = await Promise.allSettled([
        apiCalls.searchSuppliersByQuery({ q: searchValue }),
        apiCalls.searchSuppliersByName({ firstName: searchValue, page: 1, limit: 50 })
      ])

      let combinedResults = []
      let searchSuppliers = []

      // Process query search results (by company name)
      if (queryResults.status === 'fulfilled' && queryResults.value.data) {
        const queryData = Array.isArray(queryResults.value.data) ? queryResults.value.data : []
        searchSuppliers = queryData.map(supplier => ({
          id: supplier.id || supplier._id,
          companyName: supplier.companyName,
          companyLogo: supplier.companyLogo,
          // These fields might be missing from query results, so we'll fetch details
          firstName: '',
          lastName: '',
          email: '',
          contactNumber: '',
          officeAddress: '',
          companyType: '',
          needsDetailFetch: true // Flag to indicate we need to fetch full details
        }))
        combinedResults = [...searchSuppliers]
      }

      // Process name search results (by firstName)
      if (nameResults.status === 'fulfilled' && nameResults.value.data) {
        const nameData = nameResults.value.data.suppliers || []
        const nameSearchSuppliers = nameData.map(supplier => ({
          id: supplier.id,
          companyName: supplier.companyName || '',
          firstName: supplier.name || '', // Note: backend returns 'name' for firstName
          lastName: '',
          email: '',
          contactNumber: '',
          officeAddress: '',
          companyType: '',
          productCategories: supplier.productCategories || [],
          productSubCategories: supplier.productSubCategories || [],
          products: supplier.products || []
        }))
        
        // Merge results, avoiding duplicates
        nameSearchSuppliers.forEach(supplier => {
          if (!combinedResults.find(s => s.id === supplier.id)) {
            combinedResults.push(supplier)
          }
        })
      }

      if (combinedResults.length > 0) {
        // Fetch full details for suppliers that need it
        const suppliersNeedingDetails = combinedResults.filter(s => s.needsDetailFetch)
        if (suppliersNeedingDetails.length > 0) {
          const detailPromises = suppliersNeedingDetails.map(supplier =>
            apiCalls.getSupplierById(supplier.id).catch(() => null)
          )
          
          const detailResults = await Promise.allSettled(detailPromises)
          
          detailResults.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value?.data) {
              const fullSupplier = result.value.data
              const supplierIndex = combinedResults.findIndex(s => s.id === suppliersNeedingDetails[index].id)
              if (supplierIndex !== -1) {
                combinedResults[supplierIndex] = {
                  ...combinedResults[supplierIndex],
                  firstName: fullSupplier.firstName || '',
                  lastName: fullSupplier.lastName || '',
                  email: fullSupplier.email || '',
                  contactNumber: fullSupplier.contactNumber || '',
                  officeAddress: fullSupplier.officeAddress || '',
                  companyType: fullSupplier.companyType || '',
                  needsDetailFetch: false
                }
              }
            }
          })
        }

        setSuppliers(combinedResults)
        setTotalSuppliers(combinedResults.length)
        setTotalPages(Math.ceil(combinedResults.length / limit))
        setPage(1)
        
        if (combinedResults.length === 1) {
          toast.success(`Found 1 supplier`)
        } else {
          toast.success(`Found ${combinedResults.length} suppliers`)
        }
      } else {
        setSuppliers([])
        setTotalSuppliers(0)
        setTotalPages(0)
        toast.error('No suppliers found')
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Search failed. Please try again.')
    } finally {
      setSearchLoading(false)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setPage(1)
    fetchSuppliers()
  }

  // Export functionality
  const handleExport = async () => {
    try {
      const res = await apiCalls.getSuppliers({ page: 1, limit: 1000 })
      
      if (res.data && res.data.error === false) {
        const suppliersData = res.data.data.suppliers
        
        const headers = ['Company Name', 'Contact Person', 'Email', 'Contact Number', 'Office Address', 'Company Type', 'Created Date']
        const csvData = suppliersData.map(supplier => [
          `"${supplier.companyName || ''}"`,
          `"${(supplier.firstName || '') + ' ' + (supplier.lastName || '')}".trim()`,
          `"${supplier.email || ''}"`,
          `"${supplier.contactNumber || ''}"`,
          `"${supplier.officeAddress || ''}"`,
          `"${supplier.companyType || ''}"`,
          `"${supplier.createdAt || ''}"`
        ])

        const csvContent = [
          headers.join(','),
          ...csvData.map(row => row.join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `suppliers_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        toast.success('Suppliers exported successfully')
      }
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export suppliers')
    }
  }

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault()
    setFormErrors({})
    
    try {
      if (!formData.email || !formData.companyName || !formData.contactNumber) {
        setFormErrors({
          email: !formData.email ? 'Email is required' : '',
          companyName: !formData.companyName ? 'Company name is required' : '',
          contactNumber: !formData.contactNumber ? 'Contact number is required' : ''
        })
        toast.error('Please fill all required fields')
        return
      }

      const contactNumberRegex = /^\d{3} \d{8}$/
      if (!contactNumberRegex.test(formData.contactNumber)) {
        setFormErrors({
          contactNumber: 'Contact number must be in format: XXX XXXXXXXXX (e.g., 974 55568329)'
        })
        toast.error('Invalid contact number format')
        return
      }

      if (editingId) {
        const updateData = {
          name: formData.firstName,
          email: formData.email,
          companyName: formData.companyName,
          contactNumber: formData.contactNumber,
          officeAddress: formData.officeAddress,
          productCategories: formData.productCategories,
          productSubCategories: formData.productSubCategories
        }
        await apiCalls.updateSupplier(editingId, updateData)
        toast.success('Supplier updated successfully')
      } else {
        const createData = {
          name: formData.firstName,
          email: formData.email,
          companyName: formData.companyName,
          contactNumber: formData.contactNumber,
          officeAddress: formData.officeAddress
        }
        await apiCalls.createSupplier(createData)
        toast.success('Supplier created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchSuppliers()
    } catch (error) {
      console.error('Create/Update error:', error)
      const errorMessage = error.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} supplier`
      
      if (error.response?.status === 409) {
        if (error.response.data.message.includes('Email')) {
          setFormErrors({ email: 'Email already exists. Please use a different email.' })
        }
      }
      
      toast.error(errorMessage)
    }
  }

  const handleInlineEdit = (supplier) => {
    setEditingRow(supplier.id)
    setFormData({
      firstName: supplier.firstName || '',
      lastName: supplier.lastName || '',
      email: supplier.email || '',
      companyName: supplier.companyName || '',
      companyType: supplier.companyType || '',
      contactNumber: supplier.contactNumber || '',
      officeAddress: supplier.officeAddress || '',
      productCategories: supplier.productCategories || [],
      productSubCategories: supplier.productSubCategories || []
    })
  }

  const handleInlineUpdate = async (supplierId) => {
    try {
      if (!formData.email || !formData.companyName || !formData.contactNumber) {
        toast.error('Please fill all required fields')
        return
      }

      const contactNumberRegex = /^\d{3} \d{8}$/
      if (!contactNumberRegex.test(formData.contactNumber)) {
        toast.error('Contact number must be in format: XXX XXXXXXXXX')
        return
      }

      const updateData = {
        name: formData.firstName,
        email: formData.email,
        companyName: formData.companyName,
        contactNumber: formData.contactNumber,
        officeAddress: formData.officeAddress,
        productCategories: formData.productCategories,
        productSubCategories: formData.productSubCategories
      }

      await apiCalls.updateSupplier(supplierId, updateData)
      toast.success('Supplier updated successfully')
      setEditingRow(null)
      resetForm()
      fetchSuppliers()
    } catch (error) {
      console.error('Inline update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update supplier')
    }
  }

  const handleInlineCancel = () => {
    setEditingRow(null)
    resetForm()
  }

  const handleEdit = (supplier) => {
    setFormData({
      firstName: supplier.firstName || '',
      lastName: supplier.lastName || '',
      email: supplier.email || '',
      companyName: supplier.companyName || '',
      companyType: supplier.companyType || '',
      contactNumber: supplier.contactNumber || '',
      officeAddress: supplier.officeAddress || '',
      productCategories: supplier.productCategories || [],
      productSubCategories: supplier.productSubCategories || []
    })
    setEditingId(supplier.id)
    setShowModal(true)
    setFormErrors({})
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) {
      return
    }

    try {
      await apiCalls.deleteSupplier(id)
      toast.success('Supplier deleted successfully')
      
      if (suppliers.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        fetchSuppliers()
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error.response?.data?.message || 'Failed to delete supplier')
    }
  }

  const resetForm = () => {
    setFormData({ 
      firstName: '', 
      lastName: '',
      email: '', 
      companyName: '', 
      companyType: '',
      contactNumber: '', 
      officeAddress: '',
      productCategories: [],
      productSubCategories: []
    })
    setEditingId(null)
    setEditingRow(null)
    setFormErrors({})
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  // Simple Table Component Implementation
  const SimpleTable = ({ data, columns }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const columns = [
    { 
      key: 'companyName', 
      label: 'Company',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">
              {editingRow === row.id ? (
                <input
                  type="text"
                  value={formData.companyName || ''}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-1 border border-gray-300 rounded text-sm"
                  required
                />
              ) : (
                value || 'N/A'
              )}
            </div>
            <div className="text-sm text-gray-500">
              {editingRow === row.id ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName || ''}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="flex-1 p-1 border border-gray-300 rounded text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName || ''}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="flex-1 p-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              ) : (
                `${row.firstName || ''} ${row.lastName || ''}`.trim() || 'No contact name'
              )}
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (value, row) => (
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">
            {editingRow === row.id ? (
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-1 border border-gray-300 rounded text-sm"
                required
              />
            ) : (
              value || 'N/A'
            )}
          </span>
        </div>
      )
    },
    { 
      key: 'contactNumber', 
      label: 'Contact',
      render: (value, row) => (
        <div className="flex items-center text-gray-600">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
          {editingRow === row.id ? (
            <input
              type="tel"
              value={formData.contactNumber || ''}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full p-1 border border-gray-300 rounded text-sm"
              required
            />
          ) : (
            value || 'N/A'
          )}
        </div>
      )
    },
    { 
      key: 'officeAddress', 
      label: 'Address',
      render: (value, row) => (
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">
            {editingRow === row.id ? (
              <input
                type="text"
                value={formData.officeAddress || ''}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            ) : (
              value || 'N/A'
            )}
          </span>
        </div>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          {editingRow === row.id ? (
            <>
              <button 
                onClick={() => handleInlineUpdate(row.id)} 
                className="cursor-pointer  flex items-center text-green-600 hover:text-green-800 hover:bg-green-50 px-3 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4 mr-1" /> Save
              </button>
              <button 
                onClick={handleInlineCancel} 
                className="cursor-pointer  flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => handleInlineEdit(row)} 
                className="cursor-pointer  flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" /> Quick Edit
              </button>
              <button 
                onClick={() => handleEdit(row)} 
                className="cursor-pointer  flex items-center text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" /> Full Edit
              </button>
              <button 
                onClick={() => handleDelete(row.id)} 
                className="cursor-pointer  flex items-center text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
            </>
          )}
        </div>
      )
    },
  ]

  const isLoading = loading || searchLoading

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
              <p className="text-gray-600 mt-2">Manage your supplier relationships and information</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <button 
                onClick={handleExport}
                className="cursor-pointer flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button 
                onClick={() => { setShowModal(true); resetForm(); }} 
                className="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Supplier
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Showing</p>
                <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
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
                placeholder="Search suppliers by company name or contact person..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {searchLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              {searchTerm && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Search
                </button>
              )}
            </div>
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              Searching for: "<span className="font-medium">{searchTerm}</span>"
              {suppliers.length > 0 && ` • Found ${suppliers.length} results`}
            </p>
          )}
        </div>

        {/* Suppliers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : suppliers.length > 0 ? (
            <>
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                  {searchTerm ? `Search results for "${searchTerm}"` : 'All suppliers'}
                  {editingRow && (
                    <span className="ml-2 text-orange-600 font-medium">• Editing mode active</span>
                  )}
                </p>
              </div>
              <SimpleTable 
                data={suppliers} 
                columns={columns} 
              />
            </>
          ) : (
            <div className="text-center py-12">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm ? `No suppliers found for "${searchTerm}"` : 'No suppliers found'}
              </p>
              {searchTerm ? (
                <button 
                  onClick={handleClearSearch}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Clear Search
                </button>
              ) : (
                <button 
                  onClick={() => { setShowModal(true); resetForm(); }} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Add Your First Supplier
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination - Only show if not searching or if search results are paginated */}
        {suppliers.length > 0 && !searchTerm && (
          <div className="mt-6">
            <Pagination 
              page={page} 
              limit={limit} 
              total={totalSuppliers}
              totalPages={totalPages}
              onPageChange={handlePageChange} 
            />
          </div>
        )}

        {/* Add/Edit Supplier Modal */}
        <Modal 
          title={editingId ? 'Edit Supplier' : 'Add New Supplier'} 
          open={showModal} 
          onClose={() => {
            setShowModal(false)
            resetForm()
          }}
        >
          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input 
                  type="text" 
                  placeholder="Enter first name" 
                  value={formData.firstName} 
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input 
                  type="text" 
                  placeholder="Enter last name" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required 
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input 
                  type="text" 
                  placeholder="Enter company name" 
                  value={formData.companyName} 
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input 
                  type="text" 
                  placeholder="XXX XXXXXXXXX (e.g., 974 55568329)" 
                  value={formData.contactNumber} 
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} 
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    formErrors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required 
                />
                {formErrors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.contactNumber}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">Format: XXX XXXXXXXXX (11 digits total)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type
                </label>
                <input 
                  type="text" 
                  placeholder="Enter company type" 
                  value={formData.companyType} 
                  onChange={(e) => setFormData({ ...formData, companyType: e.target.value })} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Office Address
              </label>
              <textarea 
                placeholder="Enter full office address (minimum 10 characters)" 
                value={formData.officeAddress} 
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })} 
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                minLength={10}
              />
              {formData.officeAddress && formData.officeAddress.length < 10 && (
                <p className="text-yellow-600 text-sm mt-1">Address should be at least 10 characters long</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                type="button"
                onClick={() => {
                  setShowModal(false)
                  resetForm()
                }} 
                className="cursor-pointer flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {editingId ? 'Update Supplier' : 'Create Supplier'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Suppliers