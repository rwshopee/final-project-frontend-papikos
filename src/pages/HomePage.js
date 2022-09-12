import { useState, useEffect } from 'react';
import { BsList, BsPersonCircle, BsSearch } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import HomeCards from '../components/HomeCards';
import logo from '../assets/images/papikos.png';

export default function HomePage() {
  const [state, setState] = useState({
    isOpen: false,
  });

  const [searchInput, setSearchInput] = useState('');
  const [inputInserted, setInsertedInput] = useState(false);

  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'));

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchType, setSearchType] = useState('name');
  const [sortBy, setSortBy] = useState('name');
  const [sort, setSort] = useState('asc');

  const [page, setPage] = useState(1);
  const [uRL, setURL] = useState('http://localhost:8080/');

  const [totalHouses, setTotalHouses] = useState(0);

  const token = `Bearer ${localStorage.getItem('token')}`;

  const handleChange = (event) => {
    setState(event.target.state);
    setState({ isOpen: !state.isOpen });
  };

  const handleSelectStart = (event) => {
    setStartDate(moment(new Date(event.target.value)).format('YYYY-MM-DDTHH:mm:ss'));
    console.log(startDate);
  };

  const handleSelectEnd = (event) => {
    setEndDate(moment(new Date(event.target.value)).format('YYYY-MM-DDTHH:mm:ss'));
    console.log(endDate);
  };

  const handleSearchType = (event) => {
    setSearchType(event.target.value);
    console.log(searchType);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
    console.log(sortBy);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
    console.log(sort);
  };

  const handleNext = () => {
    setPage(page + 1);
    setURL(`http://papikos-api.herokuapp.com/?search=${searchInput}&searchType=${searchType}&sortBy=${sortBy}&sort=${sort}&start=${startDate}&end=${endDate}&page=${page + 1}`);
    console.log(uRL);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      setURL(`http://papikos-api.herokuapp.com/?search=${searchInput}&searchType=${searchType}&sortBy=${sortBy}&sort=${sort}&start=${startDate}&end=${endDate}&limit=8&page=${page - 1}`);
    }
  };

  const handleSubmit = () => {
    if (inputInserted) {
      setURL(`http://papikos-api.herokuapp.com/?search=${searchInput}&searchType=${searchType}&sortBy=${sortBy}&sort=${sort}&start=${startDate}&end=${endDate}&limit=8&page=${page}`);
      return;
    }
    setURL(`http://localhost:8080/?sortBy=${sortBy}&sort=${sort}`);
  };

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${uRL}users/details`, config).then((response) => {
      console.log(response);
      setName(response.data.data.user_data.full_name);
    });
  }, [isLoggedIn]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsLoggedIn(true);
    }
  }, []);

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

  const menuClass = `position-absolute mt-5 mr-5 text-left dropdown-menu${state.isOpen ? 'show' : ''}`;

  const handleInput = (e) => {
    setSearchInput(e.target.value);
    setInsertedInput(true);
  };

  const [housesData, setHousesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('URL', uRL);
    axios.get(uRL).then((response) => {
      setHousesData(response.data.data.houses_data);
      setTotalHouses(response.data.data.houses_data.length);
      setLoading(false);
      console.log(response);
    });
  }, [uRL]);

  return (
    <div>
      <div className="sticky-top bg-white shadow-sm px-5 py-3 md:px-10 row mr-0">
        {/* left */}
        <div className="d-flex align-items-center col-8 col-xs-8 col-sm-4 col-md-4 col-lg-4">
          <a href="/" className="d-none d-sm-none d-md-block">
            <img src={logo} alt="papikos logo" />
          </a>
          <div className="d-flex align-items-center w-100 rounded-pill border border-info p-2 d-block d-sm-none">
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="form-control border border-0 ml-2 mr-auto"
              id="search-bar"
              placeholder="Search houses..."
              style={{ outline: 'none' }}
            />
            <div className="d-block d-sm-none mx-2" id="search-button">
              <BsSearch />
            </div>
          </div>
        </div>
        {/* middle */}
        <div className="col-4 d-none d-sm-block">
          <div className="d-flex align-items-center rounded-pill border border-info p-2">
            <input
              value={searchInput}
              onChange={handleInput}
              className="form-control border border-0 ml-2 mr-auto"
              id="search-bar"
              placeholder="Search houses..."
              style={{ outline: 'none' }}
            />
            <div className="d-none d-sm-none d-md-block mx-2">
              <BsSearch />
            </div>
          </div>
        </div>
        {/* right */}
        {
          isLoggedIn ? (
            <div className="d-flex justify-content-end align-items-center col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4 pr-3">
              <button className="btn shadow-none d-flex align-items-center justify-content-between rounded-pill border border-secondary bg-info p-2" type="button" onClick={handleChange}>
                <div className="btn-group">
                  <BsList size={20} />
                  <div
                    className={menuClass}
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      background: 'white', borderStyle: 'solid', borderRadius: '10px', borderColor: '#045D5D', borderWidth: '1px', position: 'relative',
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
          ) : (
            <div className="d-flex justify-content-end align-items-center col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4 pr-3">
              <a href="/signin" className="mr-5" style={{ color: 'black' }}>Sign In</a>
              <a href="/signup" style={{ color: 'darkred' }}>Sign Up</a>
            </div>
          )
        }
      </div>
      <div className="mb-4">
        <div className="d-flex justify-content-center p-0 mr-0 mt-3 mb-2 col-12">
          <input type="date" className="mr-2" onChange={handleSelectStart} />
          <input type="date" onChange={handleSelectEnd} />
        </div>
        <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
          <p className="d-flex justify-content-start align-content-center mr-2 my-0 p-0">Search by:</p>
          <select className="w-25" value={searchType} onChange={handleSearchType}>
            <option value="name">Name</option>
            <option value="city">City</option>
          </select>
        </div>
        <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
          <p className="d-flex justify-content-start align-content-center mr-2 my-0 p-0">Sort by:</p>
          <select className="w-25" value={sortBy} onChange={handleSortBy}>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
          <select className="w-25" onChange={handleSort}>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
        <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mt-4">
          <button type="submit" className="btn btn-info" onClick={handleSubmit} value="true">
            List houses!
          </button>
        </div>
      </div>
      {
        name !== '' && isLoggedIn ? (
          <div className="row m-5 justify-content-end align-content-center">
            <div className="col-12">
              <h4>
                Welcome to Papikos
                {' '}
                {name}
              </h4>
            </div>
          </div>
        ) : ''
      }
      <Banner />
      <div className="d-flex row mx-5 px-5 mt-5">
        <div className="d-flex col-4 justify-content-end">
          { page > 1 ? <button type="submit" className="btn btn-outline-info" onClick={handlePrev}> &lt; </button> : '' }
        </div>
        <div className="d-flex col-4 justify-content-center">
          <p>
            Page: &nbsp; &nbsp;
            {' '}
            {page}
          </p>
        </div>
        <div className="d-flex col-4">
          { totalHouses >= (page - 1) * 8 ? <button type="submit" className="btn btn-outline-info" onClick={handleNext}> &gt; </button> : '' }
        </div>
      </div>
      <HomeCards housesData={housesData} loading={loading} />
      <Footer />
    </div>
  );
}
