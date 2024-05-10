const HomePage = () => {
  
  return (
      <div>
          <ul className="nav">
              <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Active</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
          </ul>
          <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                      <span className="info-box-icon bg-info elevation-1"><i className="fas fa-address-card"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text text-center h6">Legajos Activos</span>
                          <span className="info-box-number text-center h4">30</span>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                      <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-bell"></i></span>
                      <div className="info-box-content">
                          <span className="info-box-text text-center h6">Alarmas Activas</span>
                          <span className="info-box-number text-center h4">12</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default HomePage;
