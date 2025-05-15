import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import AuthLayout from '../components/auth/AuthLayout';
const LoginPage = () => {
  
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle=""
      footerText="Don't have an account?"
      footerLink="/signup"
      footerLinkText="Sign up"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage; 