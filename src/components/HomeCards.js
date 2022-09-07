import HomeCard from './HomeCard';

export default function HomeCards({ housesData, loading }) {
  return (
    <div>
      {
          loading ? <div className="p-5 mt-2" style={{ textAlign: 'center' }}><h3>loading...</h3></div> : (
            <div className="justify-content-center mx-2 p-5 mb-5 row">
              {housesData.map((house) => (
                <HomeCard
                  key={house.id}
                  id={house.id}
                  name={house.house_name}
                  city={house.city_name}
                  price={house.price_per_night}
                  guest={house.max_guest}
                />
              ))}
            </div>
          )
}
    </div>
  );
}
