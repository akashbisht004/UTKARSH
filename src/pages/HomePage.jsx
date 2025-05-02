import Layout from '../components/layout/Layout';



function Home() {


  return (
    <Layout>

      {/* Hero section */}
      <section
        style={{
          color: '#003366',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100vh',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle, rgba(200, 220, 255, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            zIndex: 0,
          }}
        ></div>

        <h1
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Welcome to Nirog AI
        </h1>
        <p
          style={{
            fontSize: '2.5rem',
            marginBottom: '30px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Your trusted partner in health and wellness.
        </p>
        <br />
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '30px',
            lineHeight: '1.8',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
        </p>
        <p
          style={{
            fontSize: '1rem',
            marginBottom: '30px',
            lineHeight: '1.8',
            maxWidth: '800px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Lorem ipsum dolor sit quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <button
          style={{
            backgroundColor: '#00509e',
            color: '#ffffff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '1rem',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 1,
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = 'none';
          }}
        >
          Learn More
        </button>
      </section>
      {/* Features section */}
      
    </Layout>
  );
}

export default Home;
