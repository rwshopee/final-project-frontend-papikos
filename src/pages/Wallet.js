import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function Wallet() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const uRL = 'http://localhost:8080/';

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`${uRL}users/details`, config).then((response) => {
      console.log(response);
      setName(response.data.data.user_data.full_name);
      setBalance(response.data.data.user_data.wallet.balance);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    setIsSubmitted(e.target.value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isSubmitted) {
      navigate('/wallet/topup');
    }
  }, [isSubmitted]);

  return (
    <div>
      {
          name !== '' ? (
            <div>
              <GeneralHeader />
              <div>
                <div className="p-5" style={{ textAlign: 'center' }}>
                  <h1>
                    Wallet
                  </h1>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="p-3" style={{ textAlign: 'left' }}>
                    <h3 className="mb-5">
                      User:
                      {' '}
                      {name}
                    </h3>
                    <h3>
                      Wallet Balance:
                      {' '}
                      {formatter.format(balance).replace('Rp', 'IDR')}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-info rounded-pill" onClick={handleSubmit} value="true">Top up!</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="d-flex justify-content-center align-content-center p-5" style={{ height: '50vh', marginTop: '5rem' }}>
                <h2>Loading wallet...</h2>
              </div>
            </div>
          )
        }
      <Footer />
    </div>
  );
}
