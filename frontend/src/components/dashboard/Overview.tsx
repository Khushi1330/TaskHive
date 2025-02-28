import React from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  BarElement
} from 'chart.js';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTheme } from '../../context/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Overview: React.FC = () => {
  const { profile } = useUser();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  // Chart colors
  const primaryColor = isDark ? 'rgb(16, 185, 129)' : 'rgb(22, 163, 74)';
  const inProgressColor = '#155E95'; // Custom dark blue color for in progress
  const pendingColor = '#D84040'; // Grey color for pending
  const textColor = isDark ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
  const gridColor = isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.2)';
  
  // Progress chart data
  const progressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Task Points',
        data: [10, 15, 8, 12, 20, 18, 25],
        borderColor: primaryColor,
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  const progressOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };
  
  // Task completion data - Updated colors: completed (green), in progress (dark blue #2D336B), pending (grey)
  const taskCompletionData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          primaryColor,
          inProgressColor,
          pendingColor,
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const taskCompletionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          boxWidth: 12,
          padding: 10,
          font: {
            size: 11,
          },
        },
      },
    },
    cutout: '65%',
  };
  
  // Competition performance data
  const competitionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Competition Rank',
        data: [8, 7, 5, 6, 4, 3],
        backgroundColor: primaryColor,
        borderRadius: 6,
      },
    ],
  };
  
  const competitionOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        reverse: true,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };
  
  // Upcoming tasks
  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete React Component Library',
      dueDate: 'Today',
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Write Technical Documentation',
      dueDate: 'Tomorrow',
      priority: 'Medium',
      status: 'Not Started',
    },
    {
      id: 3,
      title: 'Review Pull Requests',
      dueDate: 'In 2 days',
      priority: 'Low',
      status: 'Not Started',
    },
  ];
  
  // Upcoming competitions
  const upcomingCompetitions = [
    {
      id: 1,
      title: 'Web Development Challenge',
      startDate: 'May 15, 2025',
      participants: 128,
      prize: '500 Merit Points',
    },
    {
      id: 2,
      title: 'UI Design Competition',
      startDate: 'May 20, 2025',
      participants: 64,
      prize: '300 Merit Points',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Last updated:</span>
          <span className="text-sm font-medium">Today, 10:30 AM</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Task Points</p>
              <p className="text-2xl font-bold">{profile?.task_points || 0}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+12% from last week</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Merit Points</p>
              <p className="text-2xl font-bold">{profile?.merit_points || 0}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+5% from last week</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Badge Level</p>
              <p className="text-2xl font-bold">{profile?.badge_level || 1}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">{100 - (profile?.merit_points || 0)} points to next level</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Tasks</p>
              <p className="text-2xl font-bold">{upcomingTasks.length}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <Clock className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-xs text-amber-500">1 due today</span>
          </div>
        </motion.div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
          <div className="h-64">
            <Line data={progressData} options={progressOptions} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <h2 className="text-lg font-semibold mb-4">Competition Performance</h2>
          <div className="h-64">
            <Bar data={competitionData} options={competitionOptions} />
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:col-span-1"
        >
          <h2 className="text-lg font-semibold mb-4">Task Completion</h2>
          {/* Fixed height container with proper sizing */}
          <div className="h-56 flex items-center justify-center">
            <div className="w-full h-full">
              <Doughnut data={taskCompletionData} options={taskCompletionOptions} />
            </div>
          </div>
          
          {/* Updated legend explanation with circular color indicators */}
            <div className="mt-3 flex justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: primaryColor }}></div>
                <span>Completed: 65%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: inProgressColor }}></div>
                <span>In Progress: 20%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: pendingColor }}></div>
                <span>Pending: 15%</span>
              </div>
            </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            <Link to="/dashboard/tasks" className="text-primary-600 dark:text-darkPrimary-400 text-sm hover:underline flex items-center">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Due: {task.dueDate}
                    </span>
                    <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                    <span className={`text-xs flex items-center ${
                      task.priority === 'High' 
                        ? 'text-red-500' 
                        : task.priority === 'Medium' 
                          ? 'text-amber-500' 
                          : 'text-blue-500'
                    }`}>
                      <AlertCircle className="h-3 w-3 mr-1" /> {task.priority}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.status === 'Completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : task.status === 'In Progress' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upcoming Competitions</h2>
          <Link to="/dashboard/competitions" className="text-primary-600 dark:text-darkPrimary-400 text-sm hover:underline flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingCompetitions.map((competition) => (
            <div key={competition.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold text-lg">{competition.title}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>Starts: {competition.startDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <span>{competition.participants} Participants</span>
                </div>
                <div className="flex items-center text-sm">
                  <Trophy className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-amber-500">{competition.prize}</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-primary-600 hover:bg-primary-700 dark:bg-darkPrimary-600 dark:hover:bg-darkPrimary-700 text-white rounded-md text-sm font-medium transition-colors">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;