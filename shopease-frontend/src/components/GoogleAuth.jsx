import { useEffect } from 'react';

const GoogleAuth = ({ onSuccess, onError }) => {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      console.warn('Google Client ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
          });
          
          window.google.accounts.id.renderButton(
            document.getElementById('google-signin-button'),
            {
              theme: 'outline',
              size: 'large',
              text: 'continue_with',
            }
          );
        } catch (error) {
          console.error('Google Sign-In initialization error:', error);
        }
      }
    };

    script.onerror = () => {
      console.error('Failed to load Google Sign-In script');
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Server error' }));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      onSuccess(data.token, data.user);
    } catch (error) {
      console.error('Google auth error:', error);
      onError(error.message || 'Google authentication failed');
    }
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <div className="google-auth-container">
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleAuth;
