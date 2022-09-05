import logo from '../assets/images/papikos.png';

export default function SignUp() {
  return (
    <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '2rem' }}>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <a href="/" className="d-none d-sm-none d-md-block">
            <img src={logo} alt="papikos logo" />
          </a>
        </div>
        <p className="mt-2" style={{ textAlign: 'center' }}>Sign Up</p>
        <form className="border border-1 border-info px-5 pt-5 pb-4">
          <div className="form-group">
            <label>Email address</label>
            <input
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label>City ID</label>
            <select className="form-control">
              <option>Select city id</option>
            </select>
          </div>
          <div className="form-group">
            <label>City name</label>
            <select className="form-control">
              <option>Select city name</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              className="form-control"
              placeholder="Enter address"
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-outline-info">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
