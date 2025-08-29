import { useEffect, useState } from "react";
import { createRoom, listRooms, updateRoom, removeRoom } from "../../Services/RoomService";

export default function ManageRooms() {
  const empty = { title:"", city:"", pricePerNight:0, beds:1, description:"" };
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(empty);

  async function refresh(){ setRooms(await listRooms()); }
  useEffect(()=>{ refresh(); }, []);

  const save = async (e) => {
    e.preventDefault();
    if (form.id) { await updateRoom(form.id, form); }
    else { await createRoom({ ...form, rating:4.6, images:[] }); }
    setForm(empty); await refresh();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-3">Manage Rooms</h2>
      <form onSubmit={save} className="bg-white border rounded-2xl p-4 shadow-sm grid sm:grid-cols-5 gap-3">
        <input className="border rounded-xl p-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
        <input className="border rounded-xl p-2" placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>
        <input className="border rounded-xl p-2" placeholder="Beds" type="number" value={form.beds} onChange={e=>setForm({...form,beds:+e.target.value})}/>
        <input className="border rounded-xl p-2" placeholder="Price/night" type="number" value={form.pricePerNight} onChange={e=>setForm({...form,pricePerNight:+e.target.value})}/>
        <button className="bg-indigo-600 text-white rounded-xl p-2">{form.id ? "Update" : "Create"}</button>
        <textarea className="sm:col-span-5 border rounded-xl p-2" placeholder="Description"
                  value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      </form>

      <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(r=>(
          <li key={r.id} className="bg-white border rounded-2xl p-4 shadow-sm">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-gray-600">{r.city} • ${r.pricePerNight}</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 rounded-xl border" onClick={()=>setForm(r)}>Edit</button>
              <button className="px-3 py-1 rounded-xl border hover:bg-red-50" onClick={async()=>{ await removeRoom(r.id); refresh(); }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
