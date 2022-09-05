import { useEffect, useState } from 'react';
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';

export default function Banner() {
  const [counter, setCounter] = useState({ state: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter.state < 2) {
        setCounter({ state: counter.state += 1 });
        return;
      }
      setCounter({ state: counter.state -= 2 });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = (event) => {
    setCounter(event.target.state);
    if (counter.state < 2) {
      setCounter({ state: counter.state += 1 });
      return;
    }
    setCounter({ state: counter.state -= 2 });
  };

  const handlePrev = (event) => {
    setCounter(event.target.state);
    if (counter.state > 0) {
      setCounter({ state: counter.state -= 1 });
      return;
    }
    setCounter({ state: counter.state += 2 });
  };

  const handleInd1 = () => {
    setCounter({ state: counter.state = 0 });
  };

  const handleInd2 = () => {
    setCounter({ state: counter.state = 1 });
  };

  const handleInd3 = () => {
    setCounter({ state: counter.state = 2 });
  };

  return (
    <div className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        <li className={counter.state === 0 ? 'active' : ''} onClick={handleInd1} />
        <li className={counter.state === 1 ? 'active' : ''} onClick={handleInd2} />
        <li className={counter.state === 2 ? 'active' : ''} onClick={handleInd3} />
      </ol>
      <div className="carousel-inner">
        <div className={counter.state === 0 ? 'carousel-item active' : 'carousel-item'}>
          <img
            className="d-block img-fluid mx-auto"
            src={banner1}
            alt="First slide"
          />
        </div>
        <div className={counter.state === 1 ? 'carousel-item active' : 'carousel-item'}>
          <img
            className="d-block img-fluid mx-auto"
            src={banner2}
            alt="Second slide"
          />
        </div>
        <div className={counter.state === 2 ? 'carousel-item active' : 'carousel-item'}>
          <img
            className="d-block img-fluid mx-auto"
            src={banner3}
            alt="Third slide"
          />
        </div>
      </div>
      <a className="carousel-control-prev w-50" role="button" data-slide="prev" onClick={handlePrev}>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next w-50" role="button" data-slide="next" onClick={handleNext}>
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}
