import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const wellnessPlans = [
  {
    title: "Basic Wellness Plan",
    description: "Perfect for beginners starting their wellness journey",
    features: [
      "Weekly fitness assessment",
      "Basic nutrition guidance",
      "Access to wellness resources",
      "Monthly progress tracking"
    ],
    price: "₹1000/month"
  },
  {
    title: "Premium Wellness Plan",
    description: "Comprehensive wellness program for serious health enthusiasts",
    features: [
      "Personalized fitness program",
      "Detailed nutrition planning",
      "Mental health support sessions",
      "Weekly progress tracking",
      "24/7 wellness support"
    ],
    price: "₹2000/month"
  },
  {
    title: "Elite Wellness Plan",
    description: "Ultimate wellness experience with maximum benefits",
    features: [
      "One-on-one fitness coaching",
      "Customized meal plans",
      "Regular mental health check-ins",
      "Advanced progress analytics",
      "Priority support access",
      "Exclusive wellness workshops"
    ],
    price: "₹3000/month"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const WellnessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Heart className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Wellness Programs
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Choose the perfect wellness plan to achieve your health and fitness goals
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {wellnessPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-xl border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {plan.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="text-2xl font-bold text-primary mb-6">
                  {plan.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-foreground">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-20 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-br from-primary/5 to-background rounded-2xl border-2 border-primary/20 p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community of health-conscious individuals and take control of your wellness journey today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              Join Now
            </motion.button>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default WellnessPage;
