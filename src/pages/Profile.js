import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function Profile() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const uRL = 'http://localhost:8080/';

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState('');
  const [cityName, setCityName] = useState('');
  const [citiesData, setCitiesData] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get(`${uRL}users/details`, config).then((response) => {
      console.log(response);
      setEmail(response.data.data.user_data.email);
      setName(response.data.data.user_data.full_name);
      setCityId(response.data.data.user_data.city_id);
      setAddress(response.data.data.user_data.address);
      setRole(response.data.data.user_data.role);
      setUsersFetched(true);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    axios.get(`${uRL}cities`).then((response) => {
      setUsersFetched(false);
      setCitiesData(response.data.data.cities);
      console.log(response);
      for (let i = 0; i < citiesData.length; i += 1) {
        if (citiesData[i].id === cityId) {
          setCityName(citiesData[i].name);
          return;
        }
      }
    });
  }, [usersFetched]);

  const handleSubmit = (e) => {
    setIsSubmitted(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isSubmitted) {
      navigate('/profile/edit');
    }
  }, [isSubmitted]);

  return (
    <div>
      <GeneralHeader />
      {
          cityName ? (
            <div>
              <div>
                <div className="mt-5" style={{ textAlign: 'center' }}>
                  <h3>
                    Profile
                  </h3>
                </div>
                <div className="d-flex justify-content-center row">
                  <div className="col-8">
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        Email:
                        {' '}
                        {email}
                      </p>
                    </div>
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        Full Name:
                        {' '}
                        {name}
                      </p>
                    </div>
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        City ID:
                        {' '}
                        {cityId}
                      </p>
                    </div>
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        City Name:
                        {' '}
                        {cityName}
                      </p>
                    </div>
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        Address:
                        {' '}
                        {address}
                      </p>
                    </div>
                    <div className="my-3" style={{ textAlign: 'left' }}>
                      <p>
                        Role:
                        {' '}
                        {role}
                      </p>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                      <button type="button" className="btn btn-info" onClick={handleSubmit} value="true">Edit profile</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '5rem' }}>
                <h2>Loading profile...</h2>
              </div>
            </div>
          )
        }
      <Footer />
    </div>
  );
}
