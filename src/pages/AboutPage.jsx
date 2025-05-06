import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageSquare, Stethoscope, Brain, Shield, Clock, ChevronDown } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const scrollToFeatures = (ref) => {
  ref.current?.scrollIntoView({ behavior: 'smooth' });
};

{/* feature card */}  
const FeatureCard = ({ icon: Icon, title, description, features, delay }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    className="group relative bg-card p-6 rounded-2xl shadow-lg border border-border/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden max-w-sm mx-auto"
  >
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Icon container */}
    <motion.div
      variants={iconVariants}
      className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary/20 transition-colors duration-300"
    >
      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
    </motion.div>

    {/* Content */}
    <div className="relative z-10 text-center">
      <h3 className="text-xl font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + (index * 0.1) }}
            className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 group-hover:scale-125 transition-transform duration-300" />
            {feature}
          </motion.li>
        ))}
      </ul>
    </div>
  </motion.div>
);

function AboutPage() {

  const navigate = useNavigate();
  const featuresRef = useRef(null);

  {/* features */}
  const features = [
    {
      icon: MapPin,
      title: "Smart Hospital Locator",
      description: "Find the nearest hospitals and healthcare facilities using OpenStreetMap integration. Get real-time directions.",
      features: [
        "Real-time location tracking",
        "Facility ratings and reviews",
        "Emergency services information"
      ]
    },
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Our intelligent chatbot analyzes your symptoms and provides preliminary medical advice using advanced AI algorithms.",
      features: [
        "24/7 symptom analysis",
        "Integration with medical records"
      ]
    },
   
    {
      icon: Shield,
      title: "Secure Data Management",
      description: "Your health data is protected with security and encryption protocols.",
      features: [
        "End-to-end encryption",
        "Secure data backups",
        "Access control management"
      ]
    },
    {
      icon: Clock,
      title: "Smart Appointment System",
      description: "Scheduling system that optimizes your healthcare appointments and follow-ups.",
      features: [
        "Automated scheduling",
        "Reminder system",
      ]
    }
  ];

  return (
    <>
      <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[90vh] flex items-center justify-center px-6"
        >
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>
          
          <div className="relative max-w-7xl mx-auto text-center z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-8"
            >
              Revolutionizing Healthcare with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
            >
              Empowering patients and healthcare providers with cutting-edge AI technology for better healthcare outcomes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              
              <motion.button
                onClick={() => scrollToFeatures(featuresRef)}
                className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: 5 }}
              >
                <span className="text-sm mb-2">Explore Features</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div ref={featuresRef} className="max-w-7xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-powered platform transforms healthcare delivery
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary/5 py-20"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Ready to Experience the Future of Healthcare?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of users who are already benefiting from our AI-powered healthcare platform.
            </p>
            <motion.button
              onClick={() => {
                navigate('/login');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
      </Layout>
    </>
  );
}

export default AboutPage;