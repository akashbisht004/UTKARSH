import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useRef } from 'react';


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

const HeroSection = ({ navigate }) => (
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
        Welcome to Nirogh
      </motion.h1>
        <motion.p
        variants={fadeInUp}
        className="text-2xl md:text-3xl text-foreground/90 mb-8">
          Neural Intelligence for Remote Observation of Good Health
        </motion.p>
    
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
        
      </motion.div>
      <motion.div
        variants={fadeInUp}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/about')}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
        >
          Know More
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
        <HeroSection navigate={navigate} />

        {/* Action Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative py-32 overflow-hidden bg-gradient-to-b from-background to-primary/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,51,102,0.1)_1px,transparent_1px)] bg-[length:40px_40px] z-0" />
          
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeInUp}
                className="text-left"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Start Your Health Journey Today
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Take the first step towards better health with our AI-powered platform. 
                  Get personalized insights and connect with healthcare professionals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">AI-Powered Health Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">24/7 Virtual Consultations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-lg">Personalized Health Plans</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
                
                <div className="relative bg-gradient-to-br from-primary/20 via-background/80 to-background/90 backdrop-blur-sm p-8 rounded-2xl border-2 border-primary/30 shadow-xl hover:border-primary/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,80,158,0.15)_1px,transparent_1px)] bg-[length:20px_20px] rounded-2xl" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-foreground mb-6">
                      Ready to Get Started?
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Join our community of health-conscious individuals and take control of your wellness journey.
                    </p>
                    <div className="space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 80, 158, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/login')}
                        className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg"
                      >
                        Create Your Account
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/about')}
                        className="w-full bg-background/90 text-foreground border-2 border-primary/30 px-6 py-3 rounded-lg font-medium hover:bg-background hover:border-primary/50 transition-all duration-300"
                      >
                        Learn More About Our Features
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default HomePage;
