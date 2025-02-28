import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  Trash2, 
  Save,
  Upload,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';

const Settings: React.FC = () => {
  const { user, profile, updateProfile, signOut } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    language: 'en',
    darkMode: theme === 'dark',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      // In a real app, this would update the user's profile in the database
      await updateProfile({
        name: formData.name,
      });
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New passwords do not match.');
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, this would update the user's password
      // await supabase.auth.updateUser({ password: formData.newPassword });
      
      setSuccessMessage('Password updated successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setErrorMessage('Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleDarkMode = () => {
    toggleTheme();
    setFormData({
      ...formData,
      darkMode: !formData.darkMode,
    });
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog and then delete the account
    alert('This would delete your account in a real application.');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-gray-700 p-4">
            <nav className="space-y-1">
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <Lock className="mr-3 h-5 w-5" />
                Account & Security
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifications
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'appearance'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('appearance')}
              >
                <Moon className="mr-3 h-5 w-5" />
                Appearance
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'language'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('language')}
              >
                <Globe className="mr-3 h-5 w-5" />
                Language
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'privacy'
                    ? 'bg-primary-100 text-primary-700 dark:bg-darkPrimary-900 dark:text-darkPrimary-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="mr-3 h-5 w-5" />
                Privacy
              </button>
              
              <button
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md"
                onClick={signOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1 p-6">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-md flex items-start"
              >
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </motion.div>
            )}
            
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-md flex items-start"
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
            
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <button
                    className="text-primary-600 hover:text-primary-700 dark:text-darkPrimary-400 dark:hover:text-darkPrimary-300 text-sm font-medium"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSaveProfile}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="input"
                          value={formData?.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="input bg-gray-100 dark:bg-gray-600"
                          value={formData?.email}
                          onChange={handleInputChange}
                          disabled
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Email address cannot be changed
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="avatar" className="block text-sm font-medium mb-1">
                          Profile Picture
                        </label>
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full bg-primary-500 dark:bg-darkPrimary-500 flex items-center justify-center text-white text-xl mr-4">
                            {profile?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                          </div>
                          <button
                            type="button"
                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium flex items-center"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Upload New
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <button
                          type="submit"
                          className="btn-primary flex items-center"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-1" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-500 dark:bg-darkPrimary-500 flex items-center justify-center text-white">
                      {profile?.name?.charAt(0) ||
                       (typeof user?.email === "string" ? user.email.charAt(0) : "U")}
                    </div>

                      <div>
                        <h3 className="text-xl font-semibold">{profile?.name || 'User'}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                            <span className="text-xs text-amber-800 dark:text-amber-300">
                              Badge Level {profile?.badge_level || 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <User className="h-4 w-4 mr-1" />
                          <span>Account Type</span>
                        </div>
                        <p className="font-medium">Standard User</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Member Since</span>
                        </div>
                        <p className="font-medium">May 2025</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Trophy className="h-4 w-4 mr-1" />
                          <span>Task Points</span>
                        </div>
                        <p className="font-medium">{profile?.task_points || 0}</p>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Award className="h-4 w-4 mr-1" />
                          <span>Merit Points</span>
                        </div>
                        <p className="font-medium">{profile?.merit_points || 0}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account & Security</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          className="input"
                          value={formData?.currentPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          className="input"
                          value={formData?.newPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          className="input"
                          value={formData?.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-700 dark:text-red-300 rounded-md text-sm font-medium flex items-center"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications about tasks, competitions, and mentorship via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        className="sr-only peer"
                        checked={formData?.emailNotifications}
                        onChange={handleInputChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-darkPrimary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-darkPrimary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications on your device when someone interacts with you
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        className="sr-only peer"
                        checked={formData?.pushNotifications}
                        onChange={handleInputChange}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-darkPrimary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-darkPrimary-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium mb-4">Notification Types</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="task-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked
                        />
                        <label htmlFor="task-notifications" className="ml-2 block text-sm">
                          Task Updates
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="competition-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked
                        />
                        <label htmlFor="competition-notifications" className="ml-2 block text-sm">
                          Competition Announcements
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="mentorship-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked
                        />
                        <label htmlFor="mentorship-notifications" className="ml-2 block text-sm">
                          Mentorship Sessions
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="badge-notifications"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked
                        />
                        <label htmlFor="badge-notifications" className="ml-2 block text-sm">
                          Badge Level Updates
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="darkMode"
                        className="sr-only peer"
                        checked={formData?.darkMode}
                        onChange={handleToggleDarkMode}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-darkPrimary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-darkPrimary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'language' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Language Settings</h2>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium mb-1">
                    Display Language
                  </label>
                  <select
                    id="language"
                    name="language"
                    className="input"
                    value={formData?.language}
                    onChange={handleInputChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Profile Visibility</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Control who can see your profile and activity
                      </p>
                    </div>
                    <select className="input w-auto">
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show on Leaderboard</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow your name and progress to appear on leaderboards
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-darkPrimary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-darkPrimary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Data Collection</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow us to collect anonymous usage data to improve the platform
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-darkPrimary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600 dark:peer-checked:bg-darkPrimary-600"></div>
                    </label>
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

// Helper component for the success message
const CheckCircle: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Helper component for the trophy icon
const Trophy: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

// Helper component for the award icon
const Award: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

// Helper component for the calendar icon
const Calendar: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default Settings;