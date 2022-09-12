import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function UpdateProfile() {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [cityId, setCityId] = useState(0);
  const [cityName, setCityName] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCitiesRetrieved, setIsCitiesRetrieved] = useState(false);
  const [userFetched, setUserFetched] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isHost, setIsHost] = useState(false);

  const uRL = 'http://localhost:8080/';

  const data = JSON.stringify({
    full_name: fullName,
    password,
    address,
    city_id: parseInt(cityId, 10),
    role,
  });

  const token = `Bearer ${localStorage.getItem('token')}`;

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    axios.get(`${uRL}users/details`, config).then((response) => {
      setFullName(response.data.data.user_data.full_name);
      setCityId(response.data.data.user_data.city_id);
      setAddress(response.data.data.user_data.address);
      setRole(response.data.data.user_data.role);
      setUserFetched(true);
      if (role === 'user') {
        setIsUser(true);
        return;
      }
      setIsHost(true);
    });
  }, [userFetched]);

  useEffect(() => {
    axios.get(`${uRL}cities`).then((response) => {
      setCitiesData(response.data.data.cities);
      setIsCitiesRetrieved(true);
      console.log(response);
    });
  }, [isCitiesRetrieved]);

  useEffect(() => {
    setLoading(true);
    console.log(data);
    if (isSubmitted) {
      axios.patch(`${uRL}users/details`, data, config).then((response) => {
        if (response.status === 200) {
          setIsEdited(true);
          console.log(response);
        }
      }).catch((error) => {
        console.log(error);
        console.log(error.message);
      });
    }
  }, [isSubmitted]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setIsSubmitted(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
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
    if (isEdited) {
      navigate('/profile');
    }
  }, [isEdited]);

  return (
    <div>
      <GeneralHeader />
      {
        loading && fullName && password && cityName && cityId && address && role ? (
          <div>
            <div className="d-flex justify-content-center align-content-center p-4" style={{ height: '50vh', marginTop: '5rem' }}>
              <h2>Editing profile...</h2>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-content-center px-4" style={{ height: '50vh', marginTop: '1rem' }}>
            <div>
              <h2 className="p-2 mb-2" style={{ textAlign: 'center' }}>Edit Profile</h2>
              <form className="border border-1 border-info px-5 pt-5 pb-4">
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
                <div className="form-group">
                  <label>Role</label>
                  <select className="form-control" onChange={handleRole}>
                    <option
                      selected={isUser}
                      value="user"
                    >
                      User
                    </option>
                    <option
                      selected={isHost}
                      value="host"
                    >
                      Host
                    </option>
                  </select>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <button type="button" className="btn btn-info" onClick={handleSubmit} value="true">Edit Profile</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
      <Footer />
    </div>
  );
}
