import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [roomData, setRoomData] = useState({
        roomName: '',
        language: '',
        maxParticipants: 4
    });

    const navigate = useNavigate();
    const languages = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Ruby', 'PHP'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Creating room:', roomData);
        // Navigate to the room after creation
        navigate(`/room/${roomData.roomName}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                <h1 className="text-3xl font-bold text-center mb-2">CODE TOGETHER</h1>
                <h2 className="text-xl font-semibold text-center mb-6">Create Room</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                            Room Name
                        </label>
                        <input
                            type="text"
                            id="roomName"
                            name="roomName"
                            value={roomData.roomName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter room name"
                        />
                    </div>

                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            value={roomData.language}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                            <option value="">Select...</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">
                            Max Participants
                        </label>
                        <input
                            type="number"
                            id="maxParticipants"
                            name="maxParticipants"
                            min="1"
                            max="5"
                            value={roomData.maxParticipants}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                    >
                        CREATE ROOM →
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;