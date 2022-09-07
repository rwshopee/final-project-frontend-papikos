import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/papikos.png';

export default function SignIn() {
  const uRL = 'http://papikos-api.herokuapp.com/signin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = JSON.stringify({
    email,
    password,
  });

  useEffect(() => {
    setLoading(true);
    if (isLoggedIn === false && isSubmitted) {
      axios.post(uRL, user).then((response) => {
        localStorage.setItem('token', response.data.data.data.id_token);
        setIsLoggedIn(true);
        setIsSubmitted(false);
      }).catch(() => {
        setIsError(true);
        console.log(isSubmitted);
      });
    }
  }, [isSubmitted]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    setLoading(false);
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsSubmitted(false);
    setIsError(false);
    setLoading(false);
  }, [isError]);

  return (
    loading ? (
      <div>
        <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '5rem' }}>
          <h2>Signing in...</h2>
        </div>
      </div>
    ) : (
      <div>
        <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '2rem' }}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <a href="/" className="d-none d-sm-none d-md-block">
                <img src={logo} alt="papikos logo" />
              </a>
            </div>
            <p className="mt-2" style={{ textAlign: 'center' }}>Sign In</p>
            <form className="border border-1 border-info px-5 pt-5 pb-4">
              <div className="form-group">
                <label>Email address</label>
                <input
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ outline: 'none' }}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ outline: 'none' }}
                />
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button type="button" className="btn btn-outline-info" onClick={handleSubmit} value="true">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
