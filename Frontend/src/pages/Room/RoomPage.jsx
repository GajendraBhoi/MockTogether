import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaUsers, FaRegCommentDots, FaCog, FaShare, FaUser, FaCrown } from 'react-icons/fa';
import Editor from '@monaco-editor/react';
import { useAuth } from '../../context/AuthContext';

const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [roomData, setRoomData] = useState({
        name: 'Python Collaboration',
        language: 'c++',
        owner: 'Alex Johnson',
        participants: 4,
        maxParticipants: 8,
    });

    const [code, setCode] = useState('# Welcome to CodeTogether!\nprint("Hello World!")');
    const [output, setOutput] = useState('');
    const [activeTab, setActiveTab] = useState('participants');
    const [isLoading, setIsLoading] = useState(true);
    const [chatMessages, setChatMessages] = useState([
        { id: 1, user: 'Alex Johnson', message: 'Welcome everyone!', time: '10:30 AM' },
        { id: 2, user: 'Sam Wilson', message: 'Thanks for inviting me!', time: '10:31 AM' },
        { id: 3, user: 'Jamie Smith', message: "Let's build something awesome!", time: '10:32 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const participants = [
        { id: 1, name: 'Alex Johnson', isOwner: true, isOnline: true },
        { id: 2, name: 'Sam Wilson', isOwner: false, isOnline: true },
        { id: 3, name: 'Jamie Smith', isOwner: false, isOnline: true },
        { id: 4, name: 'Taylor Brown', isOwner: false, isOnline: false },
    ];

    // ✅ Redirect to login if unauthenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const runCode = () => {
        setOutput('Running code...');
        setTimeout(() => {
            setOutput(`Hello World!\nCode executed successfully at ${new Date().toLocaleTimeString()}`);
        }, 1500);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newChat = {
            id: chatMessages.length + 1,
            user: 'You',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages([...chatMessages, newChat]);
        setNewMessage('');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Room link copied to clipboard!');
    };

    if (authLoading || isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-blue-900 text-xl font-medium">Loading room...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-blue-50 text-gray-800">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-blue-200 shadow">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="mr-4 text-blue-600 hover:text-blue-800"
                    >
                        &larr;
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-blue-900">{roomData.name}</h1>
                        <div className="flex items-center text-sm text-blue-700 mt-1">
                            <span className="flex items-center mr-4">
                                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                {participants.filter(p => p.isOnline).length} online
                            </span>
                            <span className="flex items-center">
                                <span className="bg-blue-200 text-xs px-2 py-1 rounded mr-2">{roomData.language}</span>
                                {roomData.participants}/{roomData.maxParticipants} participants
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleCopyLink}
                        className="flex items-center bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg transition"
                    >
                        <FaShare className="mr-2" /> Share
                    </button>
                    <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                        <FaCog className="mr-2" /> Settings
                    </button>
                </div>
            </div>

            {/* Main */}
            <div className="flex flex-1 overflow-hidden">
                {/* Editor */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-hidden">
                        <Editor
                            height="100%"
                            language={roomData.language}
                            value={code}
                            onChange={(value) => setCode(value)}
                            onMount={handleEditorDidMount}
                            theme="light"
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                automaticLayout: true,
                            }}
                        />
                    </div>

                    {/* Output */}
                    <div className="h-48 bg-white border-t border-blue-200 flex flex-col">
                        <div className="flex items-center justify-between px-4 py-2 bg-blue-100">
                            <h3 className="font-medium text-blue-900">Output</h3>
                            <button
                                onClick={runCode}
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                                <FaPlay className="mr-2" /> Run Code
                            </button>
                        </div>
                        <pre className="flex-1 overflow-auto p-4 font-mono text-sm text-blue-900 bg-white">
                            {output || 'Output will appear here...'}
                        </pre>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 flex flex-col border-l border-blue-200 bg-white">
                    {/* Tabs */}
                    <div className="flex border-b border-blue-200 bg-blue-100">
                        <button
                            className={`flex-1 py-3 flex items-center justify-center ${activeTab === 'participants' ? 'bg-white text-blue-700 font-semibold' : 'hover:bg-blue-200'}`}
                            onClick={() => setActiveTab('participants')}
                        >
                            <FaUsers className="mr-2" /> Participants
                        </button>
                        <button
                            className={`flex-1 py-3 flex items-center justify-center ${activeTab === 'chat' ? 'bg-white text-blue-700 font-semibold' : 'hover:bg-blue-200'}`}
                            onClick={() => setActiveTab('chat')}
                        >
                            <FaRegCommentDots className="mr-2" /> Chat
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-auto">
                        {activeTab === 'participants' ? (
                            <div className="p-4">
                                <h3 className="font-medium mb-3 text-blue-900">Participants ({participants.length})</h3>
                                <ul>
                                    {participants.map((p) => (
                                        <li key={p.id} className="flex items-center py-2 border-b border-blue-100">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                    <FaUser />
                                                </div>
                                                {p.isOnline && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                )}
                                            </div>
                                            <div className="ml-3">
                                                <div className="flex items-center">
                                                    <span className="font-medium text-blue-800">{p.name}</span>
                                                    {p.isOwner && <FaCrown className="ml-2 text-yellow-500" />}
                                                </div>
                                                <span className={`text-xs ${p.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {p.isOnline ? 'Online' : 'Offline'}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-auto p-4 bg-blue-50">
                                    {chatMessages.map((msg) => (
                                        <div key={msg.id} className={`mb-4 ${msg.user === 'You' ? 'text-right' : ''}`}>
                                            <div className={`inline-block max-w-xs px-4 py-2 rounded-lg ${msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-900'}`}>
                                                {msg.user !== 'You' && <div className="font-medium text-sm">{msg.user}</div>}
                                                <div>{msg.message}</div>
                                                <div className={`text-xs opacity-70 ${msg.user === 'You' ? 'text-right' : ''}`}>{msg.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSendMessage} className="p-4 border-t border-blue-200 bg-white">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-blue-100 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
