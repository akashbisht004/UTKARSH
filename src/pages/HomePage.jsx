import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useRef } from 'react';
import { MapPin, Brain, Shield } from 'lucide-react';

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

const HeroSection = ({ onScrollToFeatures }) => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={staggerContainer}
    className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
  >
    {/* Background dots */}
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(200,220,255,0.5)_1px,transparent_1px)] bg-[length:20px_20px] z-0" />
    
    <motion.div
      variants={fadeInUp}
      className="relative z-10 text-center max-w-4xl mx-auto"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-4xl md:text-6xl font-bold text-foreground mb-6"
      >
        Welcome to Nirog AI
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        className="text-2xl md:text-3xl text-foreground/90 mb-8"
      >
        Your trusted partner in health and wellness.
      </motion.p>
      <motion.div
        variants={fadeInUp}
        className="space-y-6 text-muted-foreground mb-12"
      >
        <p className="text-lg leading-relaxed">
          Experience the future of healthcare with our AI-powered platform. Get personalized health insights, 
          connect with healthcare providers, and manage your wellness journey with cutting-edge technology.
        </p>
        <p className="text-lg leading-relaxed">
          Our intelligent system combines advanced AI algorithms with medical expertise to provide you with 
          comprehensive healthcare solutions tailored to your needs.
        </p>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onScrollToFeatures()}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
        >
          Explore Features
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-background text-foreground border border-border px-8 py-3 rounded-full font-medium hover:bg-background/80 transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  </motion.section>
);

const FeatureHighlight = ({ title, description, icon: Icon }) => (
  <motion.div
    variants={fadeInUp}
    className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-colors"
  >
    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

function HomePage() {
  const navigate = useNavigate();
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <HeroSection onScrollToFeatures={scrollToFeatures} />

        {/* Quick Features Section */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="py-20 px-6"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our platform can transform your healthcare experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureHighlight
              title="AI-Powered Diagnosis"
              description="Get instant preliminary health assessments using advanced AI algorithms"
              icon={Brain}
            />
            <FeatureHighlight
              title="Smart Hospital Locator"
              description="Find the nearest healthcare facilities with real-time information"
              icon={MapPin}
            />
            <FeatureHighlight
              title="Secure Health Records"
              description="Manage your medical history with enterprise-grade security"
              icon={Shield}
            />
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="bg-primary/5 py-20"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-foreground mb-6"
            >
              Ready to Transform Your Healthcare Experience?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8"
            >
              Join thousands of users who are already benefiting from our AI-powered healthcare platform.
            </motion.p>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default HomePage;
