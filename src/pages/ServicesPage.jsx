import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Brain, Heart, Microscope, Pill, Activity } from 'lucide-react';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const services = [
  {
    icon: Stethoscope,
    title: "Virtual Consultations",
    description: "Connect with healthcare professionals from the comfort of your home through secure video consultations.",
    features: ["24/7 Availability", "Secure Video Calls", "Digital Prescriptions"]
  },
  {
    icon: Brain,
    title: "AI Health Analysis",
    description: "Get personalized health insights and recommendations powered by advanced artificial intelligence.",
    features: ["Health Predictions", "Personalized Insights", "Risk Assessment"]
  },
  {
    icon: Heart,
    title: "Health Monitoring",
    description: "Track your vital signs and health metrics with our advanced monitoring system.",
    features: ["Real-time Tracking", "Health Reports", "Alert System"]
  },
  {
    icon: Microscope,
    title: "Lab Services",
    description: "Access to a network of certified laboratories for all your diagnostic needs.",
    features: ["Home Collection", "Online Reports", "Expert Analysis"]
  },
  {
    icon: Pill,
    title: "Pharmacy Services",
    description: "Order medicines online and get them delivered to your doorstep.",
    features: ["Medicine Delivery", "Prescription Management", "Price Comparison"]
  },
  {
    icon: Activity,
    title: "Wellness Programs",
    description: "Comprehensive wellness programs designed to improve your overall health.",
    features: ["Fitness Plans", "Nutrition Guidance", "Mental Health Support"]
  }
];

function ServicesPage() {
  const navigate = useNavigate(); 
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative pt-32 pb-20 px-6 overflow-hidden"
        >
          {/* Background dots */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,220,255,0.5)_1px,transparent_1px)] bg-[length:20px_20px] z-0" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-foreground mb-8"
            >
              Our Healthcare Services
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8"
            >
              Experience comprehensive healthcare solutions designed to meet your needs. 
              From virtual consultations to advanced health monitoring, we provide a wide range 
              of services to ensure your well-being is always our top priority.
            </motion.p>
          </div>
        </motion.section>

        {/* Services Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="w-full pt-3 border-t border-primary/10">
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-background to-primary/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,51,102,0.1)_1px,transparent_1px)] bg-[length:40px_40px] z-0" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8"
            >
              Join our community of health-conscious individuals and take the first step 
              towards better health today.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Join Now
            </motion.button>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}

export default ServicesPage;