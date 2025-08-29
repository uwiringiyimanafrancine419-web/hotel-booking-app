// Firestore schema:
// rooms: { id, title, city, pricePerNight, beds, rating, amenities[], images[], description }
// bookings: { id, roomId, userId, checkIn (ISO), checkOut (ISO), total, status }

import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where
} from "firebase/firestore";
import { db } from "../Firebase/firebase";

const roomsCol = collection(db, "rooms");

export async function listRooms(filters = {}) {
  // simple filter by city or maxPrice
  let q = roomsCol;
  if (filters.city || filters.maxPrice) {
    const clauses = [];
    if (filters.city) clauses.push(where("city", "==", filters.city));
    // Firestore doesn't support arbitrary compound queries well; keep simple
    // You can add composite indexes for price if needed
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getRoom(id) {
  const snap = await getDoc(doc(roomsCol, id));
  if (!snap.exists()) throw new Error("Room not found");
  return { id: snap.id, ...snap.data() };
}

// Admin-only helpers
export async function createRoom(data) {
  const res = await addDoc(roomsCol, data);
  return res.id;
}
export async function updateRoom(id, data) {
  await updateDoc(doc(roomsCol, id), data);
}
export async function removeRoom(id) {
  await deleteDoc(doc(roomsCol, id));
}
