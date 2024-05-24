// client\src\components\dashboard.component.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../css/board.css';

const Dashboard = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  axios.defaults.baseURL = 'http://localhost:5000';

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/rooms', { name: roomName });
      setRoomName('');
      navigate(`/room/${roomName}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <>
      <div className="container1">
        <form  className="form1" onSubmit={handleSubmit}>
          <input className='input1'
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button className='btn1' type="submit">Create Room</button>
        </form>
        <div className="room1">
          <h2>Rooms:</h2>
        </div>
        <ul>
          {rooms.map((room) => (
            <li key={room._id}>
              <button  onClick={() => navigate(`/room/${room.name}`)}>
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;