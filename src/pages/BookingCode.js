import { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function BookingCode() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const uRL = 'https://papikos-api.herokuapp.com/';

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const [reservationId, setReservationId] = useState(0);
  useEffect(() => {
    axios.get(`${uRL}transactions`, config).then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.data.transactions.length; i += 1) {
        if (response.data.data.transactions[i].house_id === parseInt(window.location.pathname.split('/').pop(), 10)) {
          setReservationId(response.data.data.transactions[i].reservation_id);
          return;
        }
      }
    });
  }, []);

  const [toBookings, setToBookings] = useState(false);
  const handleToBookings = () => {
    setToBookings(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (toBookings) {
      navigate('/bookings');
    }
  }, [toBookings]);

  return (
    <div>
      <GeneralHeader />
      {
            isLoggedIn ? (
              <div>
                {
                    reservationId !== 0 ? (
                      <div className="mx-auto p-5" style={{ textAlign: 'center' }}>
                        <QRCode value={reservationId.toString()} className="mb-5" />
                        <p>
                          Reservation id:
                        </p>
                        <p><b>{reservationId}</b></p>
                        <p>Check your other bookings:</p>
                        <button className="btn btn-warning" type="button" onClick={handleToBookings}>Bookings</button>
                      </div>
                    ) : (
                      <div className="mx-auto p-5" style={{ textAlign: 'center' }}>
                        <h4>
                          Loading for booking&lsquo;s code...
                        </h4>
                      </div>
                    )
                }
              </div>
            ) : (
              <div className="mx-auto p-5" style={{ textAlign: 'center' }}>
                <h4>
                  Unauthorized
                </h4>
              </div>
            )
        }
      <Footer />
    </div>
  );
}
