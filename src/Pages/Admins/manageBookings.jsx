import { useEffect, useState } from "react";
import { listAllBookings, cancelBooking } from "../../Services/BookingService";

export default function ManageBookings() {
  const [items, setItems] = useState([]);
  async function refresh(){ setItems(await listAllBookings()); }
  useEffect(()=>{ refresh(); }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-3">Manage Bookings</h2>
      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Dates</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(b=>(
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.roomId}</td>
                <td className="p-3">{b.userId}</td>
                <td className="p-3">{b.checkIn} → {b.checkOut}</td>
                <td className="p-3">${b.total}</td>
                <td className="p-3">
                  {b.status==="confirmed" ? (
                    <button className="px-3 py-1 rounded-xl border"
                            onClick={async()=>{ await cancelBooking(b.id); refresh(); }}>
                      Cancel
                    </button>
                  ) : <span className="text-gray-500">{b.status}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
