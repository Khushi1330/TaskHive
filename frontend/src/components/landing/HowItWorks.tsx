import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    number: '01',
    title: 'Sign Up & Select a Template',
    description: 'Create an account and choose a goal template that aligns with your interests and career aspirations.',
    video: './Template.mp4',
  },
  {
    number: '02',
    title: 'Complete Daily Tasks',
    description: 'Work on assigned tasks from teachers and the community to earn points and build your skills.',
    video: './Task.mp4',
  },
  {
    number: '03',
    title: 'Participate in Competitions',
    description: 'Join competitions based on your badge level to showcase your skills and win rewards.',
    video: './Competition.mp4',
  },
  {
    number: '04',
    title: 'Level Up & Mentor Others',
    description: 'Earn badges, unlock advanced features, and eventually become a mentor to help others grow.',
    video: './Mentorship.mp4',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Task Hive Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A simple yet powerful process to help you grow personally and professionally
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              video={step.video}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StepProps {
  number: string;
  title: string;
  description: string;
  video: string;
  isReversed: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, video, isReversed }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start playing video when it comes into view
  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
        // Some browsers prevent autoplay, this is a fallback
      });
    } else if (!inView && videoRef.current) {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full lg:w-1/2">
        <motion.div
          className="relative overflow-hidden rounded-xl shadow-xl"
          initial={{ scale: 0.9 }}
          animate={inView ? { scale: 1 } : { scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <video
            ref={videoRef}
            src={video}
            className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition-transform duration-500"
            loop
            muted
            playsInline
            autoPlay
            controls={false}
          />
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-primary-200 dark:text-darkPrimary-900">
            {number}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">{title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;