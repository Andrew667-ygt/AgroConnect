import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function RegisterBuyer() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    WarehouseLocation: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTP = async () => {
    try {
      // API call to send OTP
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });
      setOtpSent(true);
    } catch (error) {
      console.error('OTP sending failed:', error);
    }
  };

  const verifyOTP = async () => {
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phone: formData.phone,
          otp: formData.otp 
        })
      });
      if (response.ok) {
        setStep(3);
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Final registration submission
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="register-page">
      {/* New Left Side Animation Panel */}
      <div className="animation-panel">
        {step === 1 && (
          <div className="animation-container fade-in">
            <img 
              src="/gifs/farmer-field.gif" 
              alt="Farmer in field" 
              className="main-animation"
            />
            <h3 className="text-white mt-4">Join Ghana's Largest Farming Network</h3>
            <p className="text-light">Connect directly with buyers across Africa</p>
          </div>
        )}
        
        {step === 2 && (
          <div className="animation-container fade-in">
            <img 
              src="/gifs/phone-verification.gif" 
              alt="Phone verification" 
              className="main-animation"
            />
            <h3 className="text-white mt-4">Secure Phone Verification</h3>
            <p className="text-light">We ensure your account stays protected</p>
          </div>
        )}

        {step === 3 && (
          <div className="animation-container fade-in">
            <img 
              src="/gifs/farming-success.gif" 
              alt="Successful farming" 
              className="main-animation"
            />
            <h3 className="text-white mt-4">Ready to Start Buying</h3>
            <p className="text-light">Your journey to better farm purchases begins here</p>
          </div>
        )}
      </div>

      {/* Existing Registration Card - wrapped in a container */}
      <div className="form-container">
        <div className="registration-card">
          <div className="registration-progress mb-4">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {step === 1 && (
            <div className="step-content">
              <img 
                src="/gifs/welcome-buyer.gif" 
                alt="Welcome" 
                className="welcome-gif mb-4"
              />
              <h2>Welcome to AgroConnect!</h2>
              <p className="text-muted mb-4">Let's get you started with your buyer account</p>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="mb-3">
                  <label className="form-label">Buyer Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Buyer Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-success w-100"
                >
                  Next
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <img 
                src="/gifs/otp-verification.gif" 
                alt="OTP Verification" 
                className="otp-gif mb-4"
              />
              <h2>Verify Your Phone</h2>
              <p className="text-muted mb-4">We'll send a code to your phone</p>
              {!otpSent ? (
                <button 
                  className="btn btn-success w-100" 
                  onClick={sendOTP}
                >
                  Send Code
                </button>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); verifyOTP(); }}>
                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control otp-input"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength="6"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Verify
                  </button>
                </form>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <img 
                src="/gifs/complete-profile.gif" 
                alt="Complete Profile" 
                className="profile-gif mb-4"
              />
              <h2>Complete Your Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Farm Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Complete Registration
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}