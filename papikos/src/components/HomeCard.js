import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomeCard({
  id, name, city, price, guest,
}) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const photosURL = `http://papikos-api.herokuapp.com/photos/firsts/${id}`;
  const [photoData, setPhotoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(photosURL).then((response) => {
      setPhotoData(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="border border-1 border-info rounded p-2 my-3 mx-5 col-12 col-xs-12 col-sm-12 col-md-4 col-lg-2">
      {
        loading ? 'loading...' : (
          <div role="button">
            {/* top */}
            <div className="position-relative mb-2" style={{ textAlign: 'center' }}>
              <img
                className="img-fluid"
                style={{ height: '12rem' }}
                src={photoData.data.photo.photo_url}
                alt=""
              />
            </div>
            {/* bottom */}
            <div>
              <p>{name}</p>
              <p>{city}</p>
              <p>
                {formatter.format(price).replace('Rp', 'IDR')}
                {' '}
                per Night
              </p>
              <p>
                For
                {' '}
                {guest}
                {' '}
                guests
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}
