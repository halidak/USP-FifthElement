import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { AuthProvider } from './context/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="833331273454-d6evuhek82t3encnt2bj14v4jdem554a.apps.googleusercontent.com">
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
   </GoogleOAuthProvider>
);

