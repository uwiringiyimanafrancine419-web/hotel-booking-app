import { useEffect, useState } from "react";
import { listRooms } from "../../Services/RoomService";
import { listAllBookings } from "../../Services/BookingService";

export default function Admindashboard() {
  const [stats, setStats] = useState({ rooms:0, bookings:0, revenue:0 });

  useEffect(()=>{ (async()=>{
    const [rooms, bookings] = await Promise.all([listRooms(), listAllBookings()]);
    const revenue = bookings.filter(b=>b.status==="confirmed")
      .reduce((s,b)=>s+(b.total||0),0);
    setStats({ rooms: rooms.length, bookings: bookings.length, revenue });
  })(); }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-5">Admin dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Rooms", value: stats.rooms },
          { label: "Bookings", value: stats.bookings },
          { label: "Revenue", value: `$${stats.revenue}` },
        ].map((c)=>(
          <div key={c.label} className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="text-gray-500">{c.label}</div>
            <div className="text-3xl font-bold">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
