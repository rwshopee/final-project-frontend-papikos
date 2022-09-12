import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function TopUp() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalSubmitted, setIsModalSubmitted] = useState(false);
  const uRL = 'http://localhost:8080/';

  const body = JSON.stringify({
    amount: parseInt(amount, 10),
    source_id: parseInt(source, 10),
  });

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    if (isSubmitted) {
      axios.post(`${uRL}topups`, body, config).then((response) => {
        console.log(response);
        window.alert('Top Up Success');
        window.location.href = '/wallet';
        setIsModalSubmitted(true);
      }).catch(() => {
        window.alert('Top Up Failed');
        window.location.href = '/wallet/topup';
      });
    }
  }, [isSubmitted]);

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
    if (isModalSubmitted) {
      navigate('/wallet');
    }
  }, [isModalSubmitted]);

  const handleSource = (e) => {
    setSource(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${uRL}users/details`, config).then((response) => {
      console.log(response);
      setName(response.data.data.user_data.full_name);
    });
  }, [isLoggedIn]);

  return (
    <div>
      <GeneralHeader />
      <div className="mt-4">
        <h2 style={{ textAlign: 'center' }}>Top Up</h2>
        <div className="p-5 d-flex justify-content-center">
          <form className="form-t" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="inputFrom">
                <label>From</label>
                <select defaultValue="1001" id="top-up-input" name="walletId" onChange={handleSource} className="form-select form-control">
                  <option value="1001">Bank Transfer</option>
                  <option value="1002">Visa Card</option>
                  <option value="1003">Cash</option>
                </select>
              </label>
              <text className="text-muted" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputFrom">
                <label>To</label>
                <input data-testid="to-input" type="number" className="form-control" id="inputTo" readOnly placeholder={name} />
              </label>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputFrom">
                <label>Amount</label>
                <input data-testid="amount-input" type="number" className="form-control" id="amount" name="amount" onChange={handleAmount} />
              </label>
            </div>
            <div className="mt-4" style={{ textAlign: 'center' }}>
              <button type="button" className="btn btn-info rounded-pill" onClick={handleSubmit} value="true">
                Top Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
