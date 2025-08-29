import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase"; 

const BookingModal = ({ hotel, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    category: '',
    location: '',
    durationType: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    const checkInDate = new Date(form.checkIn);
    const checkOutDate = new Date(form.checkOut);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    if (selectedRoom && form.checkIn && form.checkOut && form.durationType) {
      const days = calculateDays();
      let multiplier = 1;

      if (form.durationType === 'allDay') multiplier = 1.5;

      const price = selectedRoom.price * days * multiplier;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [form.checkIn, form.checkOut, selectedRoom, form.durationType]);

  const resetForm = () => {
    setForm({
      checkIn: '',
      checkOut: '',
      guests: 1,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      category: '',
      location: '',
      durationType: '',
    });
    setSelectedRoom(null);
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      hotelName: hotel.name,
      roomName: selectedRoom.name,
      roomPrice: selectedRoom.price,
      ...form,
      totalPrice,
      createdAt: Timestamp.now(),
    };

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "bookings"), bookingData);
      setSuccessMessage("✅ Booking successfully saved!");

      setTimeout(() => {
        setIsSubmitting(false);
        resetForm();
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error("❌ Error saving booking:", error);
      alert("Failed to save booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl font-bold text-gray-600 hover:text-black">
          &times;
        </button>

        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-gray-700 mb-2">{hotel.description}</p>
            <p className="text-sm text-gray-600 mb-4">{hotel.background}</p>

            <h3 className="font-semibold mt-4 mb-2">Available Rooms</h3>
            <ul className="space-y-2">
              {hotel.rooms.map((room, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className={`block w-full text-left px-4 py-2 rounded border 
                      ${selectedRoom?.name === room.name ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {room.name} — ${room.price} per unit
                  </button>
                </li>
              ))}
            </ul>

            {selectedRoom && (
              <div className="mt-4 border-t pt-4">
                <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-40 object-cover rounded mb-2" />
                <p className="text-sm text-gray-700 mb-1">{selectedRoom.description}</p>
                <p className="text-sm text-green-700 font-semibold">Selected: {selectedRoom.name}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedRoom}
                className={`px-4 py-2 rounded text-white ${selectedRoom ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                Reserve Now
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">Booking Information</h2>

            {successMessage && (
              <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="firstName" placeholder="First Name" required className="border px-3 py-2 rounded" value={form.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" required className="border px-3 py-2 rounded" value={form.lastName} onChange={handleChange} />
                <input name="phone" placeholder="Phone" required className="border px-3 py-2 rounded" value={form.phone} onChange={handleChange} />
                <input name="email" type="email" placeholder="Email" required className="border px-3 py-2 rounded" value={form.email} onChange={handleChange} />
                <select name="category" required className="border px-3 py-2 rounded" value={form.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="single">Single</option>
                  <option value="couple">Couple</option>
                  <option value="family">Family</option>
                </select>
                <input name="location" placeholder="Location / Address" required className="border px-3 py-2 rounded" value={form.location} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium">Check-in Date</label>
                <input type="date" name="checkIn" required value={form.checkIn} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Check-out Date</label>
                <input type="date" name="checkOut" required value={form.checkOut} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Guests</label>
                <input type="number" name="guests" min="1" required value={form.guests} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium">Duration Type</label>
                <select name="durationType" required className="w-full border px-3 py-2 rounded" value={form.durationType} onChange={handleChange}>
                  <option value="">Select Duration</option>
                  <option value="day">Day</option>
                  <option value="night">Night</option>
                  <option value="allDay">All Day</option>
                </select>
              </div>

              {totalPrice > 0 && (
                <div className="mt-4 p-4 border rounded bg-green-50 text-green-800 font-medium">
                  Total Price: ${totalPrice.toFixed(2)} ({form.durationType}, {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'})
                </div>
              )}

              <div className="flex justify-between mt-4">
                <button type="button" onClick={() => setStep(1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
