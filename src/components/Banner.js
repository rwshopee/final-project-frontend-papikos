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
    <div className="row justify-content-center">
      <div className="col-12 col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-6 col-xxl-3" style={{ textAlign: 'center' }}>
        <div className="d-flex mx-auto carousel slide justify-content-center" data-ride="carousel">
          <ol className="carousel-indicators">
            <li className={counter.state === 0 ? 'active' : ''} onClick={handleInd1} />
            <li className={counter.state === 1 ? 'active' : ''} onClick={handleInd2} />
            <li className={counter.state === 2 ? 'active' : ''} onClick={handleInd3} />
          </ol>
          <div className="carousel-inner">
            <div className={counter.state === 0 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/games/coins">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner1}
                  alt="First slide"
                />
              </a>
            </div>
            <div className={counter.state === 1 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/games/coins">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner2}
                  alt="Second slide"
                />
              </a>
            </div>
            <div className={counter.state === 2 ? 'carousel-item active' : 'carousel-item'}>
              <a href="/games/coins">
                <img
                  className="d-block img-fluid mx-auto"
                  src={banner3}
                  alt="Third slide"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
