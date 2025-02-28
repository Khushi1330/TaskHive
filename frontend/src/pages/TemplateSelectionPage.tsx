import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, Briefcase, FlaskRound as Flask, Stethoscope, Trophy, Settings, ArrowRight, ArrowLeft, Cloud, Globe, Smartphone, Music, Paintbrush, BookOpen, TrendingUp, DollarSign, Rocket, Database, Atom, Thermometer, Pill, Microscope, Activity, Castle as Whistle, BarChart } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/layout/Navbar';

interface Template {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  subfields: Subfield[];
}

interface Subfield {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const TemplateSelectionPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedSubfield, setSelectedSubfield] = useState<Subfield | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useUser();
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'software',
      title: 'Software Engineer',
      icon: <Code className="h-8 w-8" />,
      color: 'bg-blue-500 dark:bg-blue-600',
      subfields: [
        {
          id: 'cloud',
          title: 'Cloud Engineer',
          icon: <Cloud className="h-6 w-6" />,
          description: 'Specialize in cloud infrastructure, deployment, and scalability.'
        },
        {
          id: 'web',
          title: 'Web Developer',
          icon: <Globe className="h-6 w-6" />,
          description: 'Build responsive and interactive web applications.'
        },
        {
          id: 'ios',
          title: 'iOS Developer',
          icon: <Smartphone className="h-6 w-6" />,
          description: 'Create native applications for Apple devices.'
        }
      ]
    },
    {
      id: 'arts',
      title: 'Arts',
      icon: <Palette className="h-8 w-8" />,
      color: 'bg-purple-500 dark:bg-purple-600',
      subfields: [
        {
          id: 'music',
          title: 'Music',
          icon: <Music className="h-6 w-6" />,
          description: 'Develop your skills in composition, performance, or production.'
        },
        {
          id: 'painting',
          title: 'Painting',
          icon: <Paintbrush className="h-6 w-6" />,
          description: 'Master various painting techniques and styles.'
        },
        {
          id: 'writing',
          title: 'Writing',
          icon: <BookOpen className="h-6 w-6" />,
          description: 'Hone your creative writing and storytelling abilities.'
        }
      ]
    },
    {
      id: 'business',
      title: 'Business',
      icon: <Briefcase className="h-8 w-8" />,
      color: 'bg-amber-500 dark:bg-amber-600',
      subfields: [
        {
          id: 'marketing',
          title: 'Marketing',
          icon: <TrendingUp className="h-6 w-6" />,
          description: 'Learn digital marketing, branding, and customer acquisition.'
        },
        {
          id: 'finance',
          title: 'Finance',
          icon: <DollarSign className="h-6 w-6" />,
          description: 'Develop skills in financial analysis and investment strategies.'
        },
        {
          id: 'startup',
          title: 'Startup Enthusiast',
          icon: <Rocket className="h-6 w-6" />,
          description: 'Build the skills needed to launch and grow a successful startup.'
        }
      ]
    },
    {
      id: 'science',
      title: 'Science',
      icon: <Flask className="h-8 w-8" />,
      color: 'bg-green-500 dark:bg-green-600',
      subfields: [
        {
          id: 'data',
          title: 'Data Science',
          icon: <Database className="h-6 w-6" />,
          description: 'Master data analysis, machine learning, and visualization.'
        },
        {
          id: 'physics',
          title: 'Physics',
          icon: <Atom className="h-6 w-6" />,
          description: 'Explore theoretical concepts and practical applications in physics.'
        },
        {
          id: 'chemistry',
          title: 'Chemistry',
          icon: <Thermometer className="h-6 w-6" />,
          description: 'Develop laboratory skills and theoretical knowledge in chemistry.'
        }
      ]
    },
    {
      id: 'medicine',
      title: 'Medicine',
      icon: <Stethoscope className="h-8 w-8" />,
      color: 'bg-red-500 dark:bg-red-600',
      subfields: [
        {
          id: 'doctor',
          title: 'Doctor',
          icon: <Stethoscope className="h-6 w-6" />,
          description: 'Prepare for medical school and clinical practice.'
        },
        {
          id: 'pharmacist',
          title: 'Pharmacist',
          icon: <Pill className="h-6 w-6" />,
          description: 'Learn about pharmaceuticals, drug interactions, and patient care.'
        },
        {
          id: 'biomedical',
          title: 'Biomedical Research',
          icon: <Microscope className="h-6 w-6" />,
          description: 'Conduct research to advance medical knowledge and treatments.'
        }
      ]
    },
    {
      id: 'sports',
      title: 'Sports',
      icon: <Trophy className="h-8 w-8" />,
      color: 'bg-sky-500 dark:bg-sky-600',
      subfields: [
        {
          id: 'athlete',
          title: 'Athlete',
          icon: <Activity className="h-6 w-6" />,
          description: 'Develop physical abilities and competitive skills in your sport.'
        },
        {
          id: 'coach',
          title: 'Coach',
          icon: <Whistle className="h-6 w-6" />,
          description: 'Learn coaching methodologies and team management.'
        },
        {
          id: 'analyst',
          title: 'Sports Analyst',
          icon: <BarChart className="h-6 w-6" />,
          description: 'Analyze performance data and develop strategic insights.'
        }
      ]
    },
    {
      id: 'custom',
      title: 'Custom Template',
      icon: <Settings className="h-8 w-8" />,
      color: 'bg-gray-500 dark:bg-gray-600',
      subfields: [
        {
          id: 'custom',
          title: 'Create Your Own',
          icon: <Settings className="h-6 w-6" />,
          description: 'Design a personalized growth path tailored to your unique goals.'
        }
      ]
    }
  ];

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template);
    setSelectedSubfield(null);
  };

  const handleSubfieldClick = (subfield: Subfield) => {
    setSelectedSubfield(subfield);
  };

  const handleBack = () => {
    if (selectedSubfield) {
      setSelectedSubfield(null);
    } else {
      setSelectedTemplate(null);
    }
  };

  const handleGetStarted = async () => {
    if (!selectedTemplate || !selectedSubfield) return;

    setIsLoading(true);

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No authentication token found.");
            navigate("/login");
            return;
        }

        const response = await fetch("http://localhost:5000/api/auth/update-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                selected_template: selectedTemplate.id,
                selected_subfield: selectedSubfield.id,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Profile updated successfully:", data);
            navigate("/dashboard");
        } else {
            console.error("Error updating profile:", data.message || "Unknown error");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
    } finally {
        setIsLoading(false);
    }
};



  return (
    <div className="min-h-screen hexagon-grid py-24">
      <Navbar />
      <div className="container-custom">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.05 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-light dark:text-accent-dark">
              Choose Your Path
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Select a template that aligns with your goals and aspirations. Each template provides a structured path to help you grow in your chosen field.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedTemplate ? (
              <motion.div
                key="templates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      whileHover={{ 
                        scale: 1.03,
                        backgroundColor: 'rgb(34, 197, 94)' // green-500 equivalent
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="card cursor-pointer hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-6"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className={`${template.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-4`}>
                        {template.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {template.subfields.length} specializations
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : !selectedSubfield ? (
              <motion.div
                key="subfields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="mb-6 flex items-center">
                  <button
                    onClick={handleBack}
                    className="flex items-center text-primary-light dark:text-accent-dark hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Templates
                  </button>
                </div>

                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <span className={`${selectedTemplate.color} w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`}>
                    {selectedTemplate.icon}
                  </span>
                  {selectedTemplate.title} Specializations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedTemplate.subfields.map((subfield, index) => (
                    <motion.div
                      key={subfield.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.01, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: 'rgb(34, 197, 94)' // green-500 equivalent
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="card cursor-pointer hover:shadow-xl transition-all duration-300 p-6"
                      onClick={() => handleSubfieldClick(subfield)}
                    >
                      <div className="flex items-center">
                        <div className={`${selectedTemplate.color} w-12 h-12 rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0`}>
                          {subfield.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{subfield.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {subfield.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.01 }}
                className="card"
              >
                <div className="mb-6 flex items-center">
                  <button
                    onClick={handleBack}
                    className="mt-2 flex items-center text-primary-light dark:text-accent-dark hover:text-green-400 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2 ml-2" />
                    Back to Specializations
                  </button>
                </div>

                <div className="text-center">
                  <div className="mb-6 inline-flex items-center justify-center">
                    <div className={`${selectedTemplate.color} w-20 h-20 rounded-full flex items-center justify-center text-white`}>
                      {selectedSubfield.icon}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-semibold mb-2">
                    {selectedSubfield.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    You've selected the {selectedSubfield.title} specialization within the {selectedTemplate.title} path.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={handleGetStarted}
                      disabled={isLoading}
                      className="btn-primary inline-flex items-center mb-5"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <span>Get Started</span>
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateSelectionPage;