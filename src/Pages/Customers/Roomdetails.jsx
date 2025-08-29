import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoom } from "../../Services/RoomService";
import { auth } from "../../Firebase/firebase";
import { bookRoom } from "../../Services/BookingService";

export default function Roomdetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [room, setRoom] = useState(null);
  const [dates, setDates] = useState({ in: "", out: "" });
  const [status, setStatus] = useState("");

  useEffect(()=>{ (async()=> setRoom(await getRoom(id)))(); }, [id]);

  const handleBook = async () => {
    if (!user) { nav("/login"); return; }
    setStatus("Checking…");
    try {
      const nights = Math.max(1, Math.ceil((new Date(dates.out)-new Date(dates.in))/(1000*60*60*24)));
      const total = nights * (room.pricePerNight || 0);
      await bookRoom({
        roomId: room.id,
        userId: user.uid,
        checkIn: dates.in,
        checkOut: dates.out,
        total
      });
      setStatus("Booked! Check your bookings page.");
      setTimeout(()=>nav("/bookings"), 800);
    } catch (e) {
      setStatus(e.message);
    }
  };

  if (!room) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <img src={room.images?.[0] || "https://picsum.photos/1200/500"} className="rounded-2xl w-full h-72 object-cover" />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{room.title}</h1>
          <p className="text-gray-600">{room.city} • {room.beds} beds • ⭐ {room.rating || 4.5}</p>
          <p className="mt-2">{room.description}</p>
        </div>
        <div className="min-w-[280px] bg-white border rounded-2xl p-4 shadow-sm">
          <div className="font-bold text-xl text-indigo-700 mb-2">${room.pricePerNight}/night</div>
          <div className="space-y-2">
            <input type="date" className="w-full border rounded-xl p-2" value={dates.in} onChange={e=>setDates({...dates,in:e.target.value})}/>
            <input type="date" className="w-full border rounded-xl p-2" value={dates.out} onChange={e=>setDates({...dates,out:e.target.value})}/>
            <button onClick={handleBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-2">Book now</button>
            {status && <p className="text-sm text-gray-700">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
