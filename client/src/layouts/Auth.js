import React, { Suspense } from 'react';

const loading = () => <div className="text-center"></div>;

const AuthLayout = ({ children }) => <Suspense fallback={loading()}>{children || null}</Suspense>;

export default AuthLayout;
