import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-success mb-4">
                Connect Directly with Buyers Across Africa
              </h1>
              <p className="lead mb-4">
                Join thousands of farmers in Ghana and across Africa selling their produce directly to buyers. No middlemen, better prices.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link to="/register-farmer" className="btn btn-success btn-lg px-4 me-md-2">
                  Start Selling
                </Link>
                <button 
                  className="btn btn-outline-success btn-lg px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#tutorialVideo"
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Watch How
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src='african_farm.jpg' height={500} width={500}
                alt="African farmer with produce" 
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorial Modal */}
      <div className="modal fade" id="tutorialVideo" tabIndex="-1" aria-labelledby="tutorialVideoLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="tutorialVideoLabel">How to Join AgroConnect</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-0">
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/watch?v=WzGhWjD0ZK8" 
                  title="How to Register on AgroConnect" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-phone-fill text-success fs-1"></i>
                  </div>
                  <h3 className="h5 card-title">Easy Mobile Access</h3>
                  <p className="card-text">
                    Manage your farm sales right from your phone. Get notifications when buyers place orders.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-cash-coin text-success fs-1"></i>
                  </div>
                  <h3 className="h5 card-title">Better Prices</h3>
                  <p className="card-text">
                    Sell directly to buyers and get fair prices for your produce. No middlemen means more profit.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="feature-icon mb-3">
                    <i className="bi bi-truck text-success fs-1"></i>
                  </div>
                  <h3 className="h5 card-title">Easy Transport</h3>
                  <p className="card-text">
                    Connect with trusted transport providers to deliver your produce safely and on time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <div className="container">
          <h2 className="text-center mb-5">How AgroConnect Works</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="step text-center">
                <div className="step-number">1</div>
                <h3 className="h5">Register</h3>
                <p>Create your free farmer account</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step text-center">
                <div className="step-number">2</div>
                <h3 className="h5">List Products</h3>
                <p>Add your produce and set prices</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step text-center">
                <div className="step-number">3</div>
                <h3 className="h5">Get Orders</h3>
                <p>Receive orders from buyers</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step text-center">
                <div className="step-number">4</div>
                <h3 className="h5">Get Paid</h3>
                <p>Receive secure payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta py-5 bg-success text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Start Selling?</h2>
          <p className="lead mb-4">Join over 10,000 farmers already using AgroConnect</p>
          <Link to="/register" className="btn btn-light btn-lg px-5">
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}