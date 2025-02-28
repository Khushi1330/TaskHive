import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  Trophy, 
  Users, 
  BookHeart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';
import Logo from '../ui/Logo';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, profile, signOut } = useUser();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Task Assigned',
      message: 'Your teacher has assigned a new task: "Create a responsive landing page"',
      time: '10 minutes ago',
      read: false,
    },
    {
      id: 2,
      title: 'Competition Starting Soon',
      message: 'The "Web Development Challenge" competition starts in 2 days.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Badge Level Up!',
      message: 'Congratulations! You\'ve reached Badge Level 2.',
      time: '1 day ago',
      read: true,
    },
  ]);

  const navItems = [
    { path: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Overview' },
    { path: '/dashboard/tasks', icon: <CheckSquare className="h-5 w-5" />, label: 'Tasks' },
    { path: '/dashboard/goals', icon: <BarChart3 className="h-5 w-5" />, label: 'Goals' },
    { path: '/dashboard/competitions', icon: <Trophy className="h-5 w-5" />, label: 'Competitions' },
    { path: '/dashboard/leaderboard', icon: <Users className="h-5 w-5" />, label: 'Leaderboard' },
    { path: '/dashboard/mentorship', icon: <Users className="h-5 w-5" />, label: 'Mentorship' },
    { path: '/dashboard/journal', icon: <BookHeart className="h-5 w-5" />, label: 'Journal' },
    { path: '/dashboard/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <Link to="/dashboard" className="flex items-center">
                <Logo className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden md:block">
                  Task Hive
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Points Display */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-darkPrimary-900 flex items-center justify-center">
                    <CheckSquare className="h-4 w-4 text-primary-600 dark:text-darkPrimary-400" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Task Points</p>
                    <p className="font-semibold">{profile?.task_points || 0}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Merit Points</p>
                    <p className="font-semibold">{profile?.merit_points || 0}</p>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-sm font-semibold">Notifications</h3>
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-primary-600 dark:text-darkPrimary-400 hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                              }`}
                            >
                              <p className="text-sm font-medium">{notification.title}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                            No notifications
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                 <div className="h-8 w-8 rounded-full bg-primary-500 dark:bg-darkPrimary-500 flex items-center justify-center text-white">
                    {profile?.name?.charAt(0) || (typeof user?.email === "string" ? user.email.charAt(0) : "U")}
                 </div>

                  <span className="hidden md:block text-sm font-medium">
                    {profile?.name || 'User'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium">
                        {typeof profile?.name === "string" ? profile.name : "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {typeof user?.email === "string" ? user.email : "No Email"}
                      </p>
                      </div>
                      <Link
                        to="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 flex flex-col h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-primary-100 text-primary-600 dark:bg-darkPrimary-900 dark:text-darkPrimary-400'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-gray-800 z-50"
              >
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                  <Link to="/dashboard" className="flex items-center">
                    <Logo className="h-8 w-8" />
                    <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                      Task Hive
                    </span>
                  </Link>
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <nav className="px-2 py-4 space-y-1">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                            isActive
                              ? 'bg-primary-100 text-primary-600 dark:bg-darkPrimary-900 dark:text-darkPrimary-400'
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                          onClick={toggleSidebar}
                        >
                          <span className="mr-3">{item.icon}</span>
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;