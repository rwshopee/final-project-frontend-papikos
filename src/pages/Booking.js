import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import GeneralHeader from '../components/GeneralHeader';
import Footer from '../components/Footer';

export default function Booking() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photosRetrieved, setPhotosRetrieved] = useState(false);
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

  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    axios.get(`${uRL}photos/${window.location.pathname.split('/').pop()}`, config).then((response) => {
      console.log(response);
      setPhotos(response.data.data.photos);
      setPhotosRetrieved(true);
    });
  }, [isLoggedIn]);

  const [firstId, setFirstId] = useState(0);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (photosRetrieved) {
      axios.get(`${uRL}photos/firsts/${window.location.pathname.split('/').pop()}`, config).then((response) => {
        console.log(response);
        setFirstId(response.data.data.photo.id);
        setCounter(response.data.data.photo.id);
      });
    }
  }, [photosRetrieved]);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((counter - firstId) < (photos.length - 1)) {
        setCounter(counter + 1);
        return;
      }
      setCounter(firstId);
    }, 5000);
    return () => clearInterval(interval);
  }, [counter]);

  const handleNext = () => {
    if ((counter - firstId) < (photos.length - 1)) {
      setCounter(counter + 1);
      return;
    }
    setCounter(firstId);
  };

  const handlePrev = () => {
    if (counter > firstId) {
      setCounter(counter - 1);
      return;
    }
    setCounter(firstId + (photos.length - 1));
  };

  const [houseData, setHouseData] = useState([]);
  const [loadHouses, setLoadHouses] = useState(true);

  useEffect(() => {
    axios.get(`${uRL}houses/${window.location.pathname.split('/').pop()}`).then((response) => {
      setHouseData(response.data.data.house);
      setLoadHouses(false);
      console.log(response);
    });
  }, [photosRetrieved]);

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const [isBooked, setIsBooked] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [checkBookings, setCheckBookings] = useState(false);
  const [toBookings, setToBookings] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [sDateSelected, setSDateSelected] = useState(false);
  const [eDateSelected, setEDateSelected] = useState(false);
  const [houseChecked, setHouseChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [reservationId, setReservationId] = useState(0);
  const paymentBody = JSON.stringify({
    reservation_id: reservationId,
  });

  useEffect(() => {
    axios.get(`${uRL}houses/bookings`, config).then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.data.bookings_data.length; i += 1) {
        if (response.data.data.bookings_data[i].house_id === parseInt(window.location.pathname.split('/').pop(), 10)) {
          setIsBooked(true);
          setReservationId(response.data.data.bookings_data[i].id);
          setTotalPrice(response.data.data.bookings_data[i].total_price);
          break;
        }
      }
      setHouseChecked(true);
    });
  }, []);

  const handleBook = () => {
    setCheckBookings(true);
  };

  const handleToBookings = () => {
    setToBookings(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (toBookings) {
      navigate('/bookings');
    }
  }, [toBookings]);

  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'));

  const handleSelectStart = (event) => {
    setStartDate(moment(new Date(event.target.value)).format('YYYY-MM-DDTHH:mm:ssZ'));
    setSDateSelected(true);
    console.log(startDate);
  };

  const handleSelectEnd = (event) => {
    setEndDate(moment(new Date(event.target.value)).format('YYYY-MM-DDTHH:mm:ssZ'));
    setEDateSelected(true);
    console.log(endDate);
  };

  useEffect(() => {
    if (sDateSelected && eDateSelected) {
      setDateSelected(true);
    }
  }, [eDateSelected]);

  const body = JSON.stringify({
    check_in_date: startDate.toString(),
    check_out_date: endDate.toString(),
  });

  useEffect(() => {
    if (checkBookings && dateSelected) {
      axios.post(`${uRL}houses/bookings/${window.location.pathname.split('/').pop()}`, body, config).then((response) => {
        console.log(response);
        window.alert('Booking successful');
        setReservationId(response.data.data.reservation_data.id);
        setTotalPrice(response.data.data.reservation_data.total_price);
        setIsBooked(true);
      }).catch(() => {
        window.alert('Booking failed');
      });
    }
  }, [checkBookings]);

  useEffect(() => {
    axios.get(`${uRL}transactions`, config).then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.data.transactions.length; i += 1) {
        if (response.data.data.transactions[i].house_id === parseInt(window.location.pathname.split('/').pop(), 10)) {
          setIsPaid(true);
          return;
        }
      }
    });
  }, []);

  const [isPaymentButtonClicked, setIsPaymentButtonClicked] = useState(false);
  const handlePayment = () => {
    setIsPaymentButtonClicked(true);
  };

  const [code, setCode] = useState(0);
  useEffect(() => {
    if (!isPaid && isBooked && reservationId !== 0) {
      axios.post(`${uRL}payment`, paymentBody, config).then((response) => {
        console.log(response);
        window.alert('Payment successful');
        setCode(reservationId);
      }).catch(() => {
        window.alert('Payment failed');
      });
    }
  }, [isPaymentButtonClicked]);

  useEffect(() => {
    if (code !== 0) {
      navigate(`/bookings/code/${window.location.pathname.split('/').pop()}`);
    }
  }, [code]);

  return (
      <div>
        <GeneralHeader />
        {
          firstId !== 0 && houseChecked ? (
              <div>
                <div className="d-flex justify-content-center">
                  <div className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      {
                        photos.map((photo) => (
                            <div className={counter === photo.id ? 'carousel-item active' : 'carousel-item'} key={photo.id}>
                              <img className="d-block img-fluid mx-auto" src={photo.photo_url} alt="" style={{ width: '500px', height: '375px' }} />
                            </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className="d-flex mt-5 row">
                  <div className="d-flex col-6 justify-content-end"><button className="btn btn-info" type="button" onClick={handlePrev}> Prev  &nbsp; &lt; </button></div>
                  <div className="d-flex col-6"><button className="btn btn-info" type="button" onClick={handleNext}> &gt; &nbsp; Next </button></div>
                </div>
                <div className="d-flex my-5 row justify-content-center">
                  <div className="col-8 col-xs-8 col-sm-8 col-md-8 col-lg-4 border border-1 border-info rounded-2 p-3">
                    {
                      isBooked ? (
                          <div className="p-0 m-0" style={{ textAlign: 'center' }}>
                            <p>Already booked,</p>
                            {
                              isPaid ? (
                                  <div>
                                    <p>
                                      and already
                                      {' '}
                                      <b> paid </b>
                                      <br />
                                      {' '}
                                    </p>
                                    <p>Visit bookings to re-check booking code and information:</p>
                                  </div>
                              ) : (
                                  <div style={{ textAlign: 'center' }}>
                                    <p>
                                      <b>pay</b>
                                      {' '}
                                      to get the booking code.
                                    </p>
                                    <p>
                                      Total fee:
                                      {' '}
                                      {' '}
                                      {' '}
                                      { formatter.format(totalPrice).replace('Rp', 'IDR') }
                                    </p>
                                    <button className="btn btn-success mb-3" type="button" onClick={handlePayment}>Pay</button>
                                  </div>
                              )
                            }
                            {
                              !isPaid ? <p>Visit bookings:</p> : ''
                            }
                            <button className="btn btn-warning" type="button" onClick={handleToBookings}>Bookings</button>
                          </div>
                      ) : (
                          <div style={{ textAlign: 'center' }}>
                            <div className="mb-2">
                              <input className="mb-xs-2 mb-sm-2 mr-md-2 mr-lg-2" type="date" onChange={handleSelectStart} />
                              <input type="date" onChange={handleSelectEnd} />
                            </div>
                            <button className="btn btn-info w-25" type="button" onClick={(handleBook)}>Book</button>
                          </div>
                      )
                    }
                  </div>
                </div>
                {
                  !loadHouses ? (
                      <div className="mb-5">
                        <div className="row mb-5">
                          <div className="d-flex col-12 justify-content-center">
                            <p>
                              {houseData.house_name}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-5 justify-content-center">
                          <div className="d-flex col-8 col-xs-8 col-sm-8 col-md-4 col-lg-4 justify-content-between">
                            <p>
                              City:
                            </p>
                            <p className="justify-content-end">
                              {houseData.city_name}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-5 justify-content-center">
                          <div className="d-flex col-8 col-xs-8 col-sm-8 col-md-4 col-lg-4 justify-content-between">
                            <p>
                              Price per Night:
                            </p>
                            <p className="justify-content-end">
                              {formatter.format(houseData.price_per_night).replace('Rp', 'IDR')}
                            </p>
                          </div>
                        </div>
                        <div className="row mb-5 justify-content-center">
                          <div className="d-flex col-8 col-xs-8 col-sm-8 col-md-4 col-lg-4 justify-content-between">
                            <p>
                              Max number of guest(s):
                            </p>
                            <p className="justify-content-end">
                              {houseData.max_guest}
                            </p>
                          </div>
                        </div>
                        <p className="d-flex justify-content-center">Description</p>
                        <div className="row justify-content-center">
                          <div className="col-8 col-xs-8 col-sm-8 col-md-4 col-lg-4"><p className="p=5" style={{ textAlign: 'justify' }}>{houseData.description}</p></div>
                        </div>
                      </div>
                  ) : <div><h3 className="d-flex justify-content-center">Loading house...</h3></div>
                }
              </div>
          ) : <div className="d-flex justify-content-center mt-5"><h2>Loading house...</h2></div>
        }
        <Footer />
      </div>
  );
}
