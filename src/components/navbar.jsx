import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-lg font-bold">Hotel Booking</h1>
      {currentUser ? (
        <span>Welcome, {currentUser.email}</span>
      ) : (
        <button className="bg-white text-blue-600 px-3 py-1 rounded">
          Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
