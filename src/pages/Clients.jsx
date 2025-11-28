

// Clients.jsx - Final Corrected Frontend Code with Supplier Fix
// Key change: Use s.id for suppliers (matches API response structure)
import { useState, useEffect } from 'react'
import { apiCalls } from '../services/api'
import { toast } from 'react-hot-toast'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import { Edit, Trash2, Plus, Search, Filter, Download, Users, Building, Mail, Phone, Package, Tag, UserCheck } from 'lucide-react'

const Clients = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phoneNo: '',
    email: '',
    product: '',
    subCategory: '',
    supplier: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [subcategories, setSubcategories] = useState([])

  // Move resetForm up here to avoid TDZ
  const resetForm = () => {
    setFormData({
      name: '',
      companyName: '',
      phoneNo: '',
      email: '',
      product: '',
      subCategory: '',
      supplier: '',
    })
    setEditingId(null)
  }

  useEffect(() => {
    fetchClients()
    fetchDropdownData()
  }, [page, limit])

  // Debug suppliers structure after fetch
  useEffect(() => {
    if (suppliers.length > 0) {
      console.log('🔍 First supplier object:', suppliers[0])  // Should log { id: '...', companyName: '...' }
      console.log('🔍 All suppliers count:', suppliers.length)
      suppliers.forEach((s, index) => {
        console.log(`🔍 Supplier ${index + 1}: ID=${s.id}, Name="${s.companyName}"`)
      })
    } else {
      console.log('❌ No suppliers loaded - check fetchDropdownData logs')
    }
  }, [suppliers])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const res = await apiCalls.getClients({ page, limit })
      setClients(res.data.clients || res.data.data?.clients || [])
    } catch (error) {
      console.error('❌ Fetch clients error:', error)
      toast.error('Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  const fetchDropdownData = async () => {
    try {
      const [prodRes, supRes, subRes] = await Promise.all([
        apiCalls.getProducts({ page: 1, limit: 50 }),
        apiCalls.getSuppliers({ page: 1, limit: 50 }),
        apiCalls.getAllSubcategories({ page: 1, limit: 50 }),
      ])
     
      // Debug: Check what data is returned
      console.log('📦 Products response structure:', prodRes.data);
      console.log('📦 Suppliers response structure:', supRes.data);
      console.log('📦 Subcategories response structure:', subRes.data);
     
      // Handle consistent data extraction
      const extractData = (res, key) => res.data?.[key] || res.data?.data?.[key] || []
      
      setProducts(extractData(prodRes, 'products'))
      setSuppliers(extractData(supRes, 'suppliers'))
      setSubcategories(extractData(subRes, 'subcategories'))
      
      console.log('✅ Dropdown data loaded - Products:', extractData(prodRes, 'products').length, 'Suppliers:', extractData(supRes, 'suppliers').length, 'Subcats:', extractData(subRes, 'subcategories').length)
    } catch (error) {
      console.error('❌ Failed to load dropdowns:', error);
      toast.error('Failed to load dropdowns')
    }
  }

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault()
   
    // Debug: Check what data is being sent
    console.log('📤 Sending form data:', formData);
    console.log('📤 Supplier value:', formData.supplier);
    console.log('📤 Supplier type:', typeof formData.supplier);
    console.log('📤 Is supplier a valid ID?', formData.supplier && formData.supplier.length === 24 && /^[0-9a-fA-F]{24}$/.test(formData.supplier))
   
    // Client-side ID validation (simple regex proxy for ObjectId)
    const isValidObjectIdProxy = (id) => id && typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id);
    if (formData.product && !isValidObjectIdProxy(formData.product)) {
      return toast.error('Invalid Product ID selected');
    }
    if (formData.subCategory && !isValidObjectIdProxy(formData.subCategory)) {
      return toast.error('Invalid SubCategory ID selected');
    }
    if (formData.supplier && !isValidObjectIdProxy(formData.supplier)) {
      return toast.error('Invalid Supplier ID selected - must be a valid ObjectId');
    }

    try {
      if (editingId) {
        await apiCalls.updateClient(editingId, formData)
        toast.success('Client updated successfully')
      } else {
        await apiCalls.createClient(formData)
        toast.success('Client created successfully')
      }
      setShowModal(false)
      resetForm()
      fetchClients()
    } catch (error) {
      console.error('❌ API Error:', error.response?.data || error.message);
      toast.error(`Failed to ${editingId ? 'update' : 'create'} client: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleEdit = (client) => {
    console.log('Editing client:', client); // Debug log
   
    setFormData({
      name: client.name || '',
      companyName: client.companyName || '',
      phoneNo: client.phoneNo || '',
      email: client.email || '',
      product: client.product?._id || client.product || '',
      subCategory: client.subCategory?._id || client.subCategory || '',
      supplier: client.supplier?._id || client.supplier || '', // Backend populates with _id
    })
    setEditingId(client._id)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this client?')) {
      try {
        await apiCalls.deleteClient(id)
        toast.success('Client deleted successfully')
        fetchClients()
      } catch (error) {
        toast.error('Failed to delete client')
      }
    }
  }

  const handleExport = () => {
    try {
      const headers = ['Name', 'Company Name', 'Phone', 'Email', 'Product', 'SubCategory', 'Supplier']
      const csvContent = [
        headers.join(','),
        ...clients.map(client => [
          `"${client.name || ''}"`,
          `"${client.companyName || ''}"`,
          `"${client.phoneNo || ''}"`,
          `"${client.email || ''}"`,
          `"${client.product?.ItemCode || ''}"`,
          `"${client.subCategory?.name || ''}"`,
          `"${client.supplier?.companyName || ''}"`
        ].join(','))
      ].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
     
      link.setAttribute('href', url)
      link.setAttribute('download', `clients-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
     
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
     
      toast.success('Clients exported successfully')
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export clients')
    }
  }

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phoneNo?.includes(searchTerm)
  )

  const columns = [
    {
      key: 'name',
      label: 'Client',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{row.companyName}</p>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contact',
      render: (value, row) => (
        <div className="space-y-1">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm">{value}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span className="text-sm">{row.phoneNo}</span>
          </div>
        </div>
      )
    },
    {
      key: 'product',
      label: 'Product',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <Package className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {row.product?.ItemCode || 'No product'}
            </p>
            <p className="text-xs text-gray-500">
              {row.product?.ProductName || ''}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'supplier',
      label: 'Supplier',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="bg-amber-100 p-2 rounded-lg mr-3">
            <Building className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">
              {row.supplier?.companyName || 'No supplier'}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
            title="Edit Client"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="cursor-pointer flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            title="Delete Client"
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
              <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
              <p className="text-gray-600 mt-2">Manage your client relationships and information</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
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
                  resetForm();  // Now defined, no TDZ error
                }}
                className="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </button>
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </div>
         
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Companies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(clients.map(c => c.companyName)).size}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">With Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.filter(c => c.product).length}
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
                placeholder="Search clients by name, company, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <button className="cursor-pointer flex items-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
        {/* Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table
            data={filteredClients}
            columns={columns}
          />
        </div>
        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            page={page}
            limit={limit}
            total={clients.length > 0 ? 100 : 0}
            onPageChange={setPage}
          />
        </div>
        {/* Add/Edit Client Modal */}
        <Modal
          title={editingId ? 'Edit Client' : 'Add New Client'}
          open={showModal}
          onClose={() => {
            setShowModal(false)
            resetForm()
          }}
        >
          <form onSubmit={handleCreateOrUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    placeholder="+974 XXX XXXX"
                    value={formData.phoneNo}
                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="cursor-pointer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">Select Product</option>
                    {products.map(prod => (
                      <option key={prod._id || prod.id} value={prod._id || prod.id}>
                        {prod.ProductName} ({prod.ItemCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SubCategory</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                    className="cursor-pointer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">Select SubCategory</option>
                    {subcategories.map(sub => (
                      <option key={sub._id || sub.id} value={sub._id || sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={formData.supplier}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      console.log('🔍 Selected supplier value:', selectedValue, 'Type:', typeof selectedValue);  // Debug select change
                      setFormData({
                        ...formData,
                        supplier: selectedValue
                      })
                    }}
                    className="cursor-pointer w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(s => (
                      <option 
                        key={s.id}  // Use 'id' from API response (not _id)
                        value={s.id}  // Send 'id' to backend (matches DB _id string)
                      >
                        {s.companyName}  // Display companyName
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
                {editingId ? 'Update Client' : 'Create Client'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Clients
