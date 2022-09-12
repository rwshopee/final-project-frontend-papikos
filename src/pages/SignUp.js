import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/papikos.png';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [cityId, setCityId] = useState(100001);
  const [cityName, setCityName] = useState('Jakarta');
  const [citiesData, setCitiesData] = useState([]);
  const [address, setAddress] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCitiesRetrieved, setIsCitiesRetrieved] = useState(false);

  const uRL = 'https://papikos-api.herokuapp.com/';

  const user = JSON.stringify({
    email,
    full_name: fullName,
    password,
    city_id: cityId,
    city_name: cityName,
    address,
  });

  useEffect(() => {
    axios.get(`${uRL}cities`).then((response) => {
      setCitiesData(response.data.data.cities);
      setIsCitiesRetrieved(true);
      console.log(response);
    });
  }, [isCitiesRetrieved]);

  useEffect(() => {
    setLoading(true);
    if (isValid) {
      axios.post(`${uRL}signup`, user).then((response) => {
        if (response.status === 200) {
          setIsSignedUp(true);
        }
      });
    }
  }, [isValid]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsSubmitted(e.target.value);
  };

  const handleCity = (event) => {
    setCityId(event.target.value);
  };

  useEffect(() => {
    for (let i = 0; i < citiesData.length; i += 1) {
      if (citiesData[i].id === cityId) {
        setCityName(citiesData[i].name);
        return;
      }
    }
  }, [cityId]);

  useEffect(() => {
    setLoading(false);
    if (isSignedUp) {
      navigate('/signin');
    }
  }, [isSignedUp]);

  useEffect(() => {
    if (isSubmitted) {
      if (email !== '' && fullName !== '' && password !== '' && cityName !== '' && cityId !== 0 && address !== '') {
        setIsValid(true);
      }
    }
  }, [isSubmitted]);

  return (
    loading ? (
      <div>
        <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '5rem' }}>
          <h2>Signing up...</h2>
        </div>
      </div>
    ) : (
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ outline: 'none' }}
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                className="form-control"
                placeholder="Enter full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                style={{ outline: 'none' }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ outline: 'none' }}
              />
            </div>
            <div className="form-group">
              <label>City name</label>
              <select className="form-control" onChange={handleCity}>
                {citiesData.map((cities) => (
                  <option
                    key={cities.id}
                    selected={cityName}
                    value={cities.id}
                  >
                    {cities.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>City ID</label>
              <input
                className="form-control"
                placeholder={cityId}
                value={cityId}
                readOnly
                style={{ outline: 'none' }}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                className="form-control"
                placeholder="Enter address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                style={{ outline: 'none' }}
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button type="button" className="btn btn-outline-info" onClick={handleSubmit} value="true">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
