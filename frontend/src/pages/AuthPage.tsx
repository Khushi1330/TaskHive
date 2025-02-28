import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, ToggleLeft as Google } from 'lucide-react';
import Logo from '../components/ui/Logo';
import { useUser } from '../context/UserContext';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useUser(); // ✅ Kept signIn for authentication
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsSignUp(params.get('signup') === 'true');
  }, [location]);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/templates';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email); // ✅ Set user before navigating
    navigate('/templates'); // ✅ Redirect to Template Selection Page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center">
                <Logo className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">Task Hive</span>
              </div>
              <div className="w-5"></div> {/* Empty div for flex alignment */}
            </div>

            <h2 className="text-2xl font-bold text-center mb-6">
              {isSignUp ? 'Create an Account' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="input pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input pl-10"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input pl-10"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full mb-4"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="relative flex items-center justify-center mb-4">
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
                <div className="px-3 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">or</div>
                <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
              </div>

              <button
                type="button"
                className="btn-secondary w-full flex items-center justify-center"
              >
                <Google className="h-5 w-5 mr-2" />
                Continue with Google
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              {isSignUp ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/auth"
                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-darkPrimary-500 dark:hover:text-darkPrimary-400"
                  >
                    Sign in
                  </Link>
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/auth?signup=true"
                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-darkPrimary-500 dark:hover:text-darkPrimary-400"
                  >
                    Sign up
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
