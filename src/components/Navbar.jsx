import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <img src="farm.jpg" alt="Logo" width="50" height="50" className="d-inline-block align-text-top me-2"/>
          <Link className="navbar-brand" to="/">Heculus AgroConnect</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent"
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="btn btn-warning" to="/login-buyer" role="button">
                  <i className="bi bi-person-circle me-2"></i> Sign In
                </Link>
              </li>
              {/* <li className="nav-item mb-0 ms-2">
                <Link className="btn btn-success" to="/login-farmer" role="button">
                  <i className="bi bi-person-circle me-2"></i> Login as Farmer
                </Link>
              </li> */}
              <li className="nav-item mb-0 ms-2">
                <Link className="btn btn-dark text-white rounded" to="/add-to-chart" role="button">
                  <i className="bi bi-cart3 me-2"></i>
                </Link>
              </li>
              <li className="nav-item mb-0 ms-2">
                <Link className="btn btn-dark text-white rounded"  role="button">
                  <i className="bi bi-person me-2"></i>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Colorful columns below navbar */}
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-4 py-2 text-center text-white" style={{backgroundColor: '#28a745'}}>
            For Farmers
          </div>
          <div className="col-md-4 py-2 text-center text-white" style={{backgroundColor: '#7513a9ff'}}>
            For Buyers
          </div>
          <div className="col-md-4 py-2 text-center text-white" style={{backgroundColor: '#dc3545'}}>
            For Logistics
          </div>
        </div>
      </div>

      {/* Advertising Section */}
        <div className="container-fluid p-0 bg-light mb-4">
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="african_farm.jpg" class="d-block w-10" alt="..." />
                  <div class="carousel-caption d-none d-md-block text-dark"> 
                    <h5>Hisence</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="african_farm.jpg" class="d-block w-10" alt="..." />
                  <div class="carousel-caption d-none d-md-block text-dark">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src="african_farm.jpg" class="d-block w-10 " alt="..." />
                  <div class="carousel-caption d-none d-md-block text-dark">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
          </div>
        </div>
    </>
  );
}
