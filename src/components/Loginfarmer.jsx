import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginFarmer() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const baseUrl = 'http://127.0.0.1:8000/api';

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/teacher-login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/sellerdashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <div className="overlay"></div>
        <div className="image-content">
          <h2>Welcome to AgroConnect</h2>
          <p>Access fresh produce directly from farmers across Ghana</p>
        </div>
      </div>
      
      <div className="login-form-section">
        <div className="form-wrapper">
          <div className="logo-container">
            <img src="/images/logo.png" alt="AgroConnect Logo" className="logo" />
          </div>
          
          <h1>Sign In</h1>
          <p className="text-muted mb-4">Welcome back! Please enter your details</p>

          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-success">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2" />
              ) : null}
              Sign In
            </button>

            <p className="text-center">
              Don't have an account?{' '}
              <Link to="/register-buyer" className="text-success">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}