import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  ShoppingBag,
  Mail,
  Globe,
  CreditCard,
  Lock,
  Edit,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Download,
  ChevronRight,
  MapPin,
  Heart,
  Package,
  Smartphone,
  ShieldCheck,
  Database,
  LogOut
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [accountInfo, setAccountInfo] = useState({
    name: "Krishna Shukla",
    email: "krishnaprasad@example.com",
    phone: "+91 1234567890",
    username: "krishna",
    language: "English",
    currency: "INR",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    promotions: false,
    priceAlerts: true,
    stockNotifications: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "Public",
    dataSharing: false,
    personalizedAds: true,
    twoFactorAuth: false,
  });

  const [communication, setCommunication] = useState({
    newsletter: true,
    marketingEmails: false,
    feedback: true,
    productUpdates: true,
  });

  const tabs = [
    { id: "account", label: "Account", icon: User, color: "text-blue-600" },
    { id: "notifications", label: "Notifications", icon: Bell, color: "text-purple-600" },
    { id: "privacy", label: "Privacy & Security", icon: Shield, color: "text-green-600" },
    { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "text-orange-600" },
    { id: "communication", label: "Communication", icon: Mail, color: "text-pink-600" },
    { id: "data", label: "Data & Privacy", icon: Database, color: "text-red-600" },
  ];

  const handleAccountChange = (e) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
  };

  const saveAccountInfo = () => {
    setEditing(false);
    // Simulate API call
    console.log("Account settings saved:", accountInfo);
  };

  const ToggleSwitch = ({ checked, onChange, label, description }) => (
    <div className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-900 mb-1">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <label className="relative inline-flex items-center cursor-pointer ml-4">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );

  const SettingCard = ({ title, description, action, actionText, icon: Icon, children }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {Icon && (
            <div className="p-2 bg-gray-100 rounded-lg">
              <Icon className="w-5 h-5 text-gray-600" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
        </div>
        {action && (
          <button
            onClick={action}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>{actionText}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
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
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account preferences and privacy settings</p>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={handleLogout} className="cursor-pointer px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

             {/* <button  onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button> */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 sticky top-8">
              <nav className="p-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`cursor-pointer w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : "text-gray-400"}`} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "account" && (
              <div className="space-y-6">
                <SettingCard
                  title="Personal Information"
                  description="Update your personal details and contact information"
                  icon={User}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={accountInfo.name}
                        onChange={handleAccountChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={accountInfo.email}
                        onChange={handleAccountChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={accountInfo.phone}
                        onChange={handleAccountChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={accountInfo.username}
                        onChange={handleAccountChange}
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    {editing ? (
                      <>
                        <button
                          onClick={() => setEditing(false)}
                          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveAccountInfo}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Information</span>
                      </button>
                    )}
                  </div>
                </SettingCard>

                <SettingCard
                  title="Preferences"
                  description="Set your language and currency preferences"
                  icon={Globe}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        name="language"
                        value={accountInfo.language}
                        onChange={handleAccountChange}
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        name="currency"
                        value={accountInfo.currency}
                        onChange={handleAccountChange}
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>INR - Indian Rupee</option>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>GBP - British Pound</option>
                      </select>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <SettingCard
                  title="Notification Preferences"
                  description="Choose how you want to be notified about your account activity"
                  icon={Bell}
                >
                  <div className="divide-y divide-gray-200">
                    <ToggleSwitch
                      checked={notifications.email}
                      onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                      label="Email Notifications"
                      description="Receive updates via email"
                    />
                    <ToggleSwitch
                      checked={notifications.push}
                      onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                      label="Push Notifications"
                      description="Get alerts on your device"
                    />
                    <ToggleSwitch
                      checked={notifications.sms}
                      onChange={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                      label="SMS Alerts"
                      description="Text message notifications"
                    />
                    <ToggleSwitch
                      checked={notifications.orderUpdates}
                      onChange={() => setNotifications({ ...notifications, orderUpdates: !notifications.orderUpdates })}
                      label="Order Updates"
                      description="Track your order status"
                    />
                    <ToggleSwitch
                      checked={notifications.priceAlerts}
                      onChange={() => setNotifications({ ...notifications, priceAlerts: !notifications.priceAlerts })}
                      label="Price Alerts"
                      description="Get notified when prices drop"
                    />
                    <ToggleSwitch
                      checked={notifications.stockNotifications}
                      onChange={() => setNotifications({ ...notifications, stockNotifications: !notifications.stockNotifications })}
                      label="Stock Notifications"
                      description="Alerts for back in stock items"
                    />
                    <ToggleSwitch
                      checked={notifications.promotions}
                      onChange={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                      label="Promotional Offers"
                      description="Deals and special offers"
                    />
                  </div>
                </SettingCard>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <SettingCard
                  title="Privacy Settings"
                  description="Control your privacy and data sharing preferences"
                  icon={ShieldCheck}
                >
                  <div className="divide-y divide-gray-200">
                    <div className="py-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                        className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option>Public - Anyone can see your profile</option>
                        <option>Private - Only you can see your profile</option>
                        <option>Friends Only - Only your connections can see</option>
                      </select>
                    </div>
                    <ToggleSwitch
                      checked={privacySettings.personalizedAds}
                      onChange={() => setPrivacySettings({ ...privacySettings, personalizedAds: !privacySettings.personalizedAds })}
                      label="Personalized Advertising"
                      description="Show ads based on your interests and shopping behavior"
                    />
                    <ToggleSwitch
                      checked={privacySettings.dataSharing}
                      onChange={() => setPrivacySettings({ ...privacySettings, dataSharing: !privacySettings.dataSharing })}
                      label="Data Sharing with Partners"
                      description="Share analytics with trusted business partners"
                    />
                    <ToggleSwitch
                      checked={privacySettings.twoFactorAuth}
                      onChange={() => setPrivacySettings({ ...privacySettings, twoFactorAuth: !privacySettings.twoFactorAuth })}
                      label="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                    />
                  </div>
                </SettingCard>

                <SettingCard
                  title="Security"
                  description="Manage your account security settings"
                  icon={Lock}
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Current Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter current password"
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
                        <button className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}

            {activeTab === "shopping" && (
              <div className="space-y-6">
                <SettingCard
                  title="Shipping & Addresses"
                  description="Manage your delivery addresses and preferences"
                  icon={MapPin}
                  action={() => console.log("Manage addresses")}
                  actionText="Manage"
                >
                  <p className="text-sm text-gray-600">2 saved addresses</p>
                </SettingCard>

                <SettingCard
                  title="Payment Methods"
                  description="Your saved payment options"
                  icon={CreditCard}
                  action={() => console.log("Manage payments")}
                  actionText="Manage"
                >
                  <p className="text-sm text-gray-600">1 credit card • 1 digital wallet</p>
                </SettingCard>

                <SettingCard
                  title="Wishlist & Saved Items"
                  description="Your favorite products and saved for later items"
                  icon={Heart}
                  action={() => console.log("View wishlist")}
                  actionText="View All"
                >
                  <p className="text-sm text-gray-600">12 items in wishlist</p>
                </SettingCard>

                <SettingCard
                  title="Order Preferences"
                  description="Customize your shopping experience"
                  icon={Package}
                >
                  <div className="divide-y divide-gray-200">
                    <ToggleSwitch
                      checked={true}
                      onChange={() => {}}
                      label="Express Checkout"
                      description="Skip review page for faster purchases"
                    />
                    <ToggleSwitch
                      checked={false}
                      onChange={() => {}}
                      label="Auto-Reorder"
                      description="Automatically reorder frequently purchased items"
                    />
                    <ToggleSwitch
                      checked={true}
                      onChange={() => {}}
                      label="Save Cart Items"
                      description="Keep cart items for 30 days"
                    />
                  </div>
                </SettingCard>
              </div>
            )}

            {activeTab === "communication" && (
              <div className="space-y-6">
                <SettingCard
                  title="Email Preferences"
                  description="Choose what emails you want to receive"
                  icon={Mail}
                >
                  <div className="divide-y divide-gray-200">
                    <ToggleSwitch
                      checked={communication.newsletter}
                      onChange={() => setCommunication({ ...communication, newsletter: !communication.newsletter })}
                      label="Newsletter"
                      description="Weekly updates and featured products"
                    />
                    <ToggleSwitch
                      checked={communication.marketingEmails}
                      onChange={() => setCommunication({ ...communication, marketingEmails: !communication.marketingEmails })}
                      label="Marketing Emails"
                      description="Special offers and promotions"
                    />
                    <ToggleSwitch
                      checked={communication.productUpdates}
                      onChange={() => setCommunication({ ...communication, productUpdates: !communication.productUpdates })}
                      label="Product Updates"
                      description="New features and improvements"
                    />
                    <ToggleSwitch
                      checked={communication.feedback}
                      onChange={() => setCommunication({ ...communication, feedback: !communication.feedback })}
                      label="Feedback Requests"
                      description="Help us improve by sharing your experience"
                    />
                  </div>
                </SettingCard>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <SettingCard
                  title="Data Export"
                  description="Download a copy of your personal data"
                  icon={Download}
                >
                  <p className="text-sm text-gray-600 mb-4">
                    Request a copy of all your account data, including order history, preferences, and personal information.
                  </p>
                  <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Request Data Export</span>
                  </button>
                </SettingCard>

                <SettingCard
                  title="Account Deletion"
                  description="Permanently delete your account and all associated data"
                  icon={Trash2}
                >
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Danger Zone</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Once you delete your account, there is no going back. This action is permanent and cannot be undone.
                          All your data, including order history and preferences, will be permanently erased.
                        </p>
                        <button className="cursor-pointer mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SettingCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
