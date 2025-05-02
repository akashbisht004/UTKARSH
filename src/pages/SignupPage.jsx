import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import AuthLayout from '../components/auth/AuthLayout';

const SignupPage = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join us today"
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Sign in"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage; 