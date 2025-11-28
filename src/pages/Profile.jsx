import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  CreditCard,
  ShoppingBag,
  Shield,
  Edit,
  Save,
  Trash2,
  Plus,
  ChevronRight,
  Eye,
  EyeOff,
  Download,
  LogOut,
  Star,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (234) 567-8900",
    joinDate: "January 2024",
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Business Avenue",
      apartment: "Suite 1200",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      lastFour: "1234",
      expiry: "12/27",
      name: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "5678",
      expiry: "06/26",
      name: "John Doe",
      isDefault: false,
    },
  ]);

  const [orders] = useState([
    {
      id: "ORD-1001",
      date: "2025-11-15",
      status: "delivered",
      statusText: "Delivered",
      total: "$299.99",
      items: 3,
      tracking: "TRK123456789",
      deliveryDate: "2025-11-18",
    },
    {
      id: "ORD-1002",
      date: "2025-11-10",
      status: "shipped",
      statusText: "Shipped",
      total: "$149.99",
      items: 1,
      tracking: "TRK123456788",
      deliveryDate: "2025-11-14",
    },
    {
      id: "ORD-1003",
      date: "2025-11-05",
      status: "processing",
      statusText: "Processing",
      total: "$89.99",
      items: 2,
      tracking: null,
      deliveryDate: null,
    },
  ]);

  const tabs = [
    {
      id: "personal",
      label: "Personal Info",
      icon: User,
      color: "text-blue-600",
    },
    {
      id: "security",
      label: "Login & Security",
      icon: Shield,
      color: "text-green-600",
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
      color: "text-orange-600",
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: CreditCard,
      color: "text-purple-600",
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      color: "text-red-600",
    },
  ];

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const savePersonalInfo = () => {
    setEditing(false);
    console.log("Personal info saved:", personalInfo);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        id: addresses.length + 1,
        type: "Other",
        street: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
        isDefault: false,
      },
    ]);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id
          ? { ...addr, isDefault: true }
          : { ...addr, isDefault: false }
      )
    );
  };

  const deletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const setDefaultPayment = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === id
          ? { ...method, isDefault: true }
          : { ...method, isDefault: false }
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "processing":
        return <Package className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const AddressCard = ({ address }) => (
    <div
      className={`border rounded-xl p-6 ${
        address.isDefault
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MapPin
            className={`w-5 h-5 ${
              address.isDefault ? "text-blue-600" : "text-gray-600"
            }`}
          />
          <div>
            <h3 className="font-semibold text-gray-900">{address.type}</h3>
            {address.isDefault && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Default
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!address.isDefault && (
            <button
              onClick={() => setDefaultAddress(address.id)}
              className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Set Default
            </button>
          )}
          <button
            onClick={() => deleteAddress(address.id)}
            className="cursor-pointer text-gray-400 hover:text-red-600 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p>{address.street}</p>
        {address.apartment && <p>{address.apartment}</p>}
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );

  const PaymentCard = ({ payment }) => (
    <div
      className={`border rounded-xl p-6 ${
        payment.isDefault
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <CreditCard className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {payment.type} •••• {payment.lastFour}
            </h3>
            <p className="text-sm text-gray-600">Expires {payment.expiry}</p>
            {payment.isDefault && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                Default
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!payment.isDefault && (
            <button
              onClick={() => setDefaultPayment(payment.id)}
              className="cursor-pointer text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Set Default
            </button>
          )}
          <button
            onClick={() => deletePayment(payment.id)}
            className="cursor-pointer text-gray-400 hover:text-red-600 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">Cardholder: {payment.name}</p>
    </div>
  );

  const OrderCard = ({ order }) => (
    <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{order.id}</h3>
          <p className="text-sm text-gray-600 mt-1">Placed on {order.date}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              order.status
            )}`}
          >
            {order.statusText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Total Amount</p>
          <p className="text-lg font-semibold text-gray-900">{order.total}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Items</p>
          <p className="text-gray-900">
            {order.items} item{order.items > 1 ? "s" : ""}
          </p>
        </div>
        {order.deliveryDate && (
          <div>
            <p className="text-sm font-medium text-gray-700">
              Expected Delivery
            </p>
            <p className="text-gray-900">{order.deliveryDate}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium text-sm">
            View Details
          </button>
          {order.tracking && (
            <button className="cursor-pointer text-gray-600 hover:text-gray-700 text-sm">
              Track Package
            </button>
          )}
        </div>
        <button className="cursor-pointer text-gray-600 hover:text-gray-700 text-sm">
          Buy Again
        </button>
      </div>
    </div>
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600 mt-1">
                Manage your profile, orders, and preferences
              </p>
            </div>
            <button  onClick={handleLogout} className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            {/* <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-3 transition text-red-600"
            >
              <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-medium">Logout</span>
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-8">
              {/* Profile Summary */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {personalInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {personalInfo.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Member since {personalInfo.joinDate}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors mb-1 ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          activeTab === tab.id ? tab.color : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Update your basic profile information
                      </p>
                    </div>
                    <button
                      onClick={
                        editing ? savePersonalInfo : () => setEditing(true)
                      }
                      className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        editing
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {editing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit className="w-4 h-4" />
                      )}
                      <span>{editing ? "Save Changes" : "Edit Profile"}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={personalInfo.name}
                        onChange={handlePersonalChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handlePersonalChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <input
                        type="text"
                        value={personalInfo.joinDate}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                  </div>

                  {editing && (
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Login & Security
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Password</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                        Change Password
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Add an extra layer of security
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Active Sessions
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Manage your logged-in devices
                        </p>
                      </div>
                      <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Saved Addresses
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Manage your delivery addresses
                      </p>
                    </div>
                    <button
                      onClick={addAddress}
                      className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <AddressCard key={address.id} address={address} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Payment Methods
                      </h2>
                      <p className="text-gray-600 mt-1">
                        Manage your saved payment options
                      </p>
                    </div>
                    <button className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Plus className="w-4 h-4" />
                      <span>Add Payment Method</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paymentMethods.map((payment) => (
                      <PaymentCard key={payment.id} payment={payment} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Order History
                      </h2>
                      <p className="text-gray-600 mt-1">
                        View and track your recent orders
                      </p>
                    </div>
                    <button className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                      View All Orders
                    </button>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
