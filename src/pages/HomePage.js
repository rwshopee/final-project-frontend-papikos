import { useState, useEffect } from 'react';
import { BsList, BsPersonCircle, BsSearch } from 'react-icons/bs';
import axios from 'axios';
import moment from 'moment';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import HomeCards from '../components/HomeCards';
import logo from '../assets/images/papikos.png';

export default function HomePage() {
  const [state, setState] = useState({
    isOpen: false,
  });

  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DDTHH:mm:ss'));

  const [searchType, setSearchType] = useState('name');
  const [sortBy, setSortBy] = useState('name');
  const [sort, setSort] = useState('asc');

  const [page, setPage] = useState(1);

  const [uRL, setURL] = useState('http://papikos-api.herokuapp.com/');

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
    console.log(uRL);
  };

  const handleSubmit = () => {
    setURL(`http://papikos-api.herokuapp.com/?search=${searchInput}&searchType=${searchType}&sortBy=${sortBy}&sort=${sort}&start=${startDate}&end=${endDate}&limit=8&page=${page}`);
    console.log(`URL ==== ${uRL}`);
  };

  const [housesData, setHousesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(uRL, {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }).then((response) => {
      setHousesData(response.data.data.houses_data);
      setLoading(false);
      console.log(response);
    });
  }, [uRL]);

  const menuClass = `position-absolute mt-5 mr-5 text-left dropdown-menu${state.isOpen ? 'show' : ''}`;

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
              onChange={(event) => setSearchInput(event.target.value)}
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
        <div className="d-flex justify-content-end align-items-center col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4 pr-3">
          <button className="btn shadow-none d-flex align-items-center justify-content-between rounded-pill border border-secondary bg-info p-2" type="button" onClick={handleChange}>
            <div className="btn-group">
              <BsList size={20} />
              <div
                className={menuClass}
                aria-labelledby="dropdownMenuButton"
                style={{
                  background: 'white', borderStyle: 'solid', borderColor: '#045D5D', borderWidth: '1px',
                }}
              >
                <div className="mt-3 mr-5">
                  <a className="dropdown-item p-0" href="/">Profile</a>
                  <a className="dropdown-item p-0" href="/">Top up</a>
                  <a className="dropdown-item p-0" href="/">Be a host</a>
                  <a className="dropdown-item p-0" href="/">Pick up</a>
                  <a className="dropdown-item p-0" href="/">Games</a>
                </div>
              </div>
            </div>
            <div className="">
              <BsPersonCircle size={30} color="#045D5D" />
            </div>
          </button>
        </div>
        {
                    searchInput && (
                    <div className="d-flex justify-content-xs-between justify-content-sm-between justify-content-md-center justify-content-lg-center p-0 mr-0 mt-5 mb-2 col-12">
                      <input type="date" onChange={handleSelectStart} />
                      <input type="date" onChange={handleSelectEnd} />
                    </div>
                    )
                }
        {
                    searchInput && (
                    <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
                      <p className="d-flex justify-content-start align-content-center mr-2 my-0 p-0">Search by:</p>
                      <select className="w-25" value={searchType} onChange={handleSearchType}>
                        <option value="name">Name</option>
                        <option value="city">City</option>
                      </select>
                    </div>
                    )
                }
        {
                    searchInput && (
                    <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
                      <p className="d-flex justify-content-start align-content-center mr-2 my-0 p-0">Sort by:</p>
                      <select className="w-25" value={sortBy} onChange={handleSortBy}>
                        <option value="name">Name</option>
                        <option value="city">City</option>
                        <option value="price">Price</option>
                      </select>
                    </div>
                    )
                }
        {
                    searchInput && (
                    <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 mb-2">
                      <select className="w-25" onChange={handleSort}>
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                      </select>
                    </div>
                    )
                }
        {
                    searchInput && (
                    <div className="d-flex justify-content-center align-content-center align-self-center col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                      <button type="submit" className="btn btn-info" onClick={handleSubmit} value="true">
                        Submit
                      </button>
                    </div>
                    )
        }
      </div>
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
          { housesData.length >= page * 8 ? <button type="submit" className="btn btn-outline-info" onClick={handleNext}> &gt; </button> : '' }
        </div>
      </div>
      <HomeCards housesData={housesData} loading={loading} />
      <Footer />
    </div>
  );
}
