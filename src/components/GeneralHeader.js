import { BsList, BsPersonCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/papikos.png';

export default function GeneralHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state, setState] = useState(false);
  const menuClass = `position-absolute mt-5 mr-5 text-left dropdown-menu${state ? 'show' : ''}`;

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = () => {
    setState(!state);
  };

  const [signedOut, setSignedOut] = useState(false);
  const [signOutRefresher, setSOR] = useState(false);
  useEffect(() => {
    if (isLoggedIn === true && signedOut) {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      setSOR(true);
    }
  }, [signedOut]);

  const handleSignOut = () => {
    if (!signedOut) {
      setSignedOut(true);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (signOutRefresher) {
      navigate('/');
    }
  }, [signOutRefresher]);

  return (
    <div className="sticky-top bg-white shadow-sm px-5 py-3 md:px-10">
      {
                isLoggedIn
                  ? (
                    <div className="row mr-0">
                      <div className="d-flex align-items-center col-8 col-xs-8 col-sm-8 col-md-6 col-lg-6">
                        <a href="/">
                          <img src={logo} alt="papikos logo" />
                        </a>
                      </div>
                      <div className="d-flex justify-content-end align-items-center col-4 col-xs-4 col-sm-4 col-md-6 col-lg-6">
                        <button className="btn shadow-none d-flex align-items-center justify-content-between rounded-pill border border-secondary bg-info p-2" type="button" onClick={handleChange}>
                          <div className="btn-group">
                            <BsList size={20} />
                            <div
                              className={menuClass}
                              aria-labelledby="dropdownMenuButton"
                              style={{
                                background: 'white', borderStyle: 'solid', borderRadius: '10px', borderColor: '#045D5D', borderWidth: '1px',
                              }}
                            >
                              <div className="p-2">
                                <a className="dropdown-item px-1" href="/profile">Profile</a>
                                <a className="dropdown-item px-1" href="/wallet">Wallet</a>
                                <a className="dropdown-item px-1" href="/bookings">Bookings</a>
                                <a type="button" role="button" className="dropdown-item px-1">Games</a>
                                <a type="button" role="button" className="dropdown-item px-1" onClick={handleSignOut} style={{ backgroundColor: 'darkred', color: 'white', textAlign: 'center' }}>Sign out</a>
                              </div>
                            </div>
                          </div>
                          <BsPersonCircle size={30} color="#045D5D" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end align-items-center col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4 pr-3">
                      <a href="/signin" className="mr-5" style={{ color: 'black' }}>Sign In</a>
                      <a href="/signup" style={{ color: 'darkred' }}>Sign Up</a>
                    </div>
                  )
            }
    </div>
  );
}
