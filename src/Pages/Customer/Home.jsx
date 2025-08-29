import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BookingModal from "../../components/BookingModal"; 

const hotels = [
  {
    id: 1,
    name: 'Ocean View Resort',
    image: 'https://images.unsplash.com/photo-1559385301-0187cb6eff46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5fGVufDB8fDB8fHww',
    description: 'Enjoy luxurious stays with a stunning ocean view, spa, and yacht access.',
    background: 'Located on a private beach, this resort is a favorite among international travelers.',
    rooms: [
      {
        name: 'Deluxe Suite',
        image: 'https://image-tc.galaxy.tf/wiwebp-3n1gjbjz9cotvcltuewxe2w0h/family-enjoying-quality-time-in-the-hotel-room.webp?width=1920',
        description: 'Spacious suite with king bed, balcony, and ocean views.',
        price: 200,
      },
      {
        name: 'Sea View Room',
        image: 'https://www.travelandleisure.com/thmb/JIoqZXurmgjBU-aRjKthU7oKu8A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1-71d7208a004a48b7bc1617a7e77183ea.jpg',
        description: 'Comfortable room with modern amenities and panoramic sea views.',
        price: 150,
      },
      {
        name: 'Presidential Suite',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-tB2aBRx9WQhGSPAsf3gN5AOqtOk5tbzAYg&s',
        description: 'Ultra-luxury suite with private pool, lounge, and full-service bar.',
        price: 500,
      },
    ],
  },
  {
    id: 2,
    name: 'Mountain Retreat',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MHx8bHV4dXJ5fGVufDB8fDB8fHww',
    description: 'A secluded tropical paradise with scenic mountain views and peaceful hiking trails.',
    background: 'Perfect for adventurers and those looking to unplug from city life.',
    rooms: [
      {
        name: 'Cabin',
        image: 'https://coventryloghomes.com/wp-content/uploads/2020/04/Getaway-2-scaled.jpg',
        description: 'Rustic cabin with fireplace and wood interiors—cozy vibes all around.',
        price: 120,
      },
      {
        name: 'Mountain Suite',
        image: 'https://haexpeditions.com/wp-content/uploads/2020/05/Everest-Gear-List.jpg',
        description: 'Spacious suite with mountain views and modern comforts.',
        price: 180,
      },
      {
        name: 'Lodge Room',
        image: 'https://www.wildernessdestinations.com/media/guebj5vt/wilderness-bisate-villas-rwanda-volcanoes-national-park.jpg',
        description: 'Affordable, warm, and perfect for families or groups.',
        price: 100,
      },
    ],
  },
  {
    id: 3,
    name: 'City Lights Hotel',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGx1eHVyeXxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Experience vibrant city life with modern comforts and stylish design.',
    background: 'Perfect for explorers who want to be at the heart of the action.',
    rooms: [
      {
        name: 'Restaurant',
        image: 'https://w0.peakpx.com/wallpaper/40/532/HD-wallpaper-restorant-colours-restaurant.jpg',
        description: 'Chic on-site restaurant serving international and local cuisine.',
        price: 50,
      },
      {
        name: 'Bar',
        image: 'https://x3jh6o6w.cdn.imgeng.in/assets/uploads/Starhotels-Collezione/THE_GORE/DINING/bar-190.jpg?imgeng=/w_1440',
        description: 'Stylish bar—perfect for cocktails and socializing.',
        price: 40,
      },
      {
        name: 'Lodge Room',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/485917309.jpg?k=03e40b86a4209dcd198c701c1f4f00712bc62f4e885a12b14301e3946ec6cc9a&o=',
        description: 'Cozy and centrally located, great for city explorers.',
        price: 110,
      },
    ],
  },
  {
    id: 4,
    name: 'Luxury Suites',
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bHV4dXJ5fGVufDB8fDB8fHww',
    description: 'Indulge in top-tier luxury with exclusive service and premium amenities.',
    background: 'A favorite among international dignitaries and discerning travelers.',
    rooms: [
      {
        name: 'Luxury Cabin',
        image: 'https://www.atout-commerces.be/media/cache/resolve/my_uploads/uploads/6213488d602c9_21-02-2022-rphoto-speed-move-1.jpg',
        description: 'Fast, personalized service in a sophisticated cabin-style suite.',
        price: 250,
      },
      {
        name: 'Restaurant & Bar',
        image: 'https://c8.alamy.com/comp/2DEF017/lively-bar-inside-the-szara-resto-bar-cracow-krakw-county-lesser-poland-voivodeship-poland-europe-2DEF017.jpg',
        description: 'Upscale dining and social space for fine fare and drinks.',
        price: 70,
      },
      {
        name: 'Guest Room',
        image: 'https://hommes.studio/wp-content/uploads/Bedroom-Interior-Design-Collection-By-Hommes-Studio.jpg',
        description: 'Warm and inviting, ideal for families or couples.',
        price: 160,
      },
    ],
  },
  {
    id: 5,
    name: 'Great Hotel',
    image: 'https://www.greathotelkiyovu.rw/images/insta-5.jpg',
    description: 'A coastal gem combining comfort and adventure.',
    background: 'Perfect for those who love relaxing by the pool and exploring local flavors.',
    rooms: [
      {
        name: 'Swimming Pool',
        image: 'https://lh5.googleusercontent.com/p/AF1QipMQ7bKw1OhK8U913xuDkar_yYiQkVRDJGZjgT7o=w640-h640-k-no',
        description: 'The best place to relax and soak up the sun.',
        price: 30,
      },
      {
        name: 'Restaurant',
        image: 'https://1clickhotel.com/wp-content/uploads/2018/03/restora-1-1-2.jpg',
        description: 'Varied menu showcasing local and international dishes.',
        price: 45,
      },
      {
        name: 'Lodge Room',
        image: 'https://explore-mag.com/wp-content/uploads/2024/06/the-room-1150x767.webp',
        description: 'Affordable and cozy—great for couples or solo travelers.',
        price: 90,
      },
    ],
  },
  {
    id: 6,
    name: 'Sport View Hotel',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/a3/c7/62/heaven-restaurant-boutique.jpg?w=1200&h=-1&s=1',
    description: 'Where athletic passions meet serene comfort—perfect for active travelers.',
    background: 'Unplug and recharge after a match or marathon.',
    rooms: [
      {
        name: 'Swimming Pool',
        image: 'https://scdn.aro.ie/Sites/50/cartonhouse/uploads/images/FullLengthImages/Large/Final_Swimming_Pool_shot.jpg',
        description: 'Pool space accessible to both adults and children.',
        price: 35,
      },
      {
        name: 'Restaurant & Bar',
        image: 'https://cache.marriott.com/content/dam/marriott-renditions/KGLMC/kglmc-soko-0054-hor-feat.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1920px:*',
        description: 'Delicious meals and refreshing drinks in one sleek venue.',
        price: 60,
      },
      {
        name: 'Lodge Room',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max640/455640725.webp?k=5aad04e6041c6772745728576d77267bd6d8d8de75d800b2436907d68cfdc114&o=',
        description: 'Comfortable and versatile—ideal for families or groups.',
        price: 100,
      },
    ],
  },
];


const Home = () => {
  const navigate = useNavigate();
  const [selectedHotel, setSelectedHotel] = useState(null); 

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
     
      

       <button
        onClick={() => {
          localStorage.removeItem('token'); 
          navigate('/login'); 
        }}
        className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-semibold"
      >
        🔒 Logout
      </button>

      <h1 className="text-3xl font-bold text-center mb-8">Welcome to our Hotels 🎉</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition">
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => setSelectedHotel(hotel)} 
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <BookingModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}
    </div>
  );
};

export default Home;
