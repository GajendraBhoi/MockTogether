import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function CreateRoom() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId.trim() || !username.trim()){
      toast.error('Fill  Credentials');
      return;
    }
    navigate(`/room/${roomId}?user=${username}`,{
      state:{ // we can use this state the redirected page
        username,
      }
    });
  };


  const createNewRoomId = (e) => {
    e.preventDefault();
    const roomId = uuidv4();
    // console.log(roomId);
    setRoomId(roomId);
    toast.success('RoomId Created');
  }

  const handleEnterKeyPress = (e) => { // callling the function on enter press 
    e.preventDefault();
    // console.log('event ', e.code);
    if(e.code === 'Enter'){
      handleSubmit(); 
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-10 shadow-lg">
        <div className=" press-start-2p-regular flex flex-col items-center text-center">

          <div className="text-center mb-8">
            <h2 className="press-start-2p-regular text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800">MOCKTOGETHER</h2>
          </div>

          <h1 className="press-start-2p-regular font-bold mb-8 text-gray-700">Enter the ROOM ID</h1>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <input
              type="text"
              name="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="ROOM ID"
              className="press-start-2p-regular w-[1/2] bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-xl px-5 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onKeyUp={handleEnterKeyPress}
              // required
            />

            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="USERNAME"
              className=" press-start-2p-regular w-[1/2] bg-gray-50 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-xl px-5 py-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              onKeyUp={handleEnterKeyPress}
              // required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="press-start-2p-regular  uppercase bg-blue-900 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200 ease-in-out cursor-pointer"
              >
                JOIN
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-600">Don't have a room ID? </span>
              <button
                type="button"
                onClick={createNewRoomId}
                className="hover:underline font-medium ml-1  text-blue-900 cursor-pointer"
              >
                Create New RoomID
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}