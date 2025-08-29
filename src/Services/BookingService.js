import {
  collection, addDoc, getDocs, query, where, Timestamp, doc, updateDoc
} from "firebase/firestore";
import { db } from "../Firebase/firebase";

const bookingsCol = collection(db, "bookings");

// naive overlap check: [a1,a2) overlaps [b1,b2) if a1 < b2 && b1 < a2
function overlaps(aIn, aOut, bIn, bOut) {
  return new Date(aIn) < new Date(bOut) && new Date(bIn) < new Date(aOut);
}

export async function isRoomAvailable(roomId, checkInISO, checkOutISO) {
  const qy = query(bookingsCol, where("roomId", "==", roomId), where("status", "in", ["confirmed","pending"]));
  const snap = await getDocs(qy);
  for (const d of snap.docs) {
    const b = d.data();
    if (overlaps(checkInISO, checkOutISO, b.checkIn, b.checkOut)) return false;
  }
  return true;
}

export async function bookRoom({ roomId, userId, checkIn, checkOut, total }) {
  const available = await isRoomAvailable(roomId, checkIn, checkOut);
  if (!available) throw new Error("Room not available for selected dates");
  const res = await addDoc(bookingsCol, {
    roomId, userId, checkIn, checkOut, total, status: "confirmed",
    createdAt: Timestamp.now(),
  });
  return res.id;
}

export async function listUserBookings(userId) {
  const qy = query(bookingsCol, where("userId", "==", userId));
  const snap = await getDocs(qy);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function listAllBookings() {
  const snap = await getDocs(bookingsCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function cancelBooking(id) {
  await updateDoc(doc(bookingsCol, id), { status: "cancelled" });
}
