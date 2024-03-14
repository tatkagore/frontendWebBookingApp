import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRAdC50IiwiaWQiOjE3LCJpYXQiOjE3MTA0Mjk1MDYsImV4cCI6MTcxMDQzMzEwNn0.Xo33ZSDO-G96N73XZL1Jrf9Stllo--bYFsDC5Nb4hvc";

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/api/reservation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => response.json()),
      fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((response) => response.json()),
    ]).then(([reservationData, userData]) => {
      console.log(reservationData);
      console.log(userData);
      setReservations(reservationData);
      setUsers(userData);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Simplon Frontend</h1>
      <p className="paragraph">Front Booking App</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="reservationController">
          {reservations.map((reservation, index) => (
            <li className="reservation" key={index}>
              <p>Name : {getUserFullName(reservation.userId)}</p>
              <p>Number of clients : {reservation.numberOfGuests}</p>
              <p>Note : {reservation.note}</p>
              
            </li>
          ))}
        </ul>
      )}
    </>
  );

  function getUserFullName(userId) {
    const user = users.find((user) => user.id === userId);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    } else {
      return "Unknown User";
    }
  }
}

export default App;
