import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Client from '../../component/Client';
import Editor from '../../component/Editor';
import { initSocket } from '../../socket';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

// Path to preview image (change if your assets live elsewhere)
const PREVIEW_IMG = '/mnt/data/708b44d1-5458-4ced-856e-86ed9f85329d.png';

export default function CreateRoomWithPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const [clients, setClients] = useState([]);
    const pathParts = location.pathname.split('/');
    const roomId = pathParts[2]; 

    useEffect(()=>{
        const init = async () =>{
            socketRef.current = await initSocket(); // connecting with backend -> this function in the socket.jsx 
            
            // handling errors 
            const handleError = (e) => {
                console.log('Socket Error',e);
                toast.error("Socket Connection Failed");
                navigate('/');
            }

            socketRef.current.on('connect_error',(err)=> handleError(err));
            socketRef.current.on('connect_failed',(err)=> handleError(err));
            

            // console.log('UserName',location.state.username);
            socketRef.current.emit('join',{
                userName : location.state?.username,
                roomId
            });

            // listening to joined event 
            socketRef.current.on('joined',({clients,userName,socketId})=>{
                // sending alert 
                if(userName === location.state?.username){
                    toast.success('Joined Successfully');
                }
                else{
                    toast.success(`${userName} joined`)
                }
                // console.log(clients);
                setClients(clients);

                // sync code 
                socketRef.current.emit('sync-code',{
                    socketId,
                    code: codeRef.current
                });
            });

            // disocnnected listening 
            socketRef.current.on('disconnected',({socketId,userName})=>{
                toast.success(`${userName} Left`);
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId != socketId
                    )
                });
            })
        }
        init(); // calling 

        return () => {
            if (socketRef.current) { // turning off the listener
                socketRef.current.off('connect_error');
                socketRef.current.off('connect_failed');
                socketRef.current.off('joined');
                socketRef.current.off('disconnected');
                socketRef.current.disconnect();
            }
        }
    },[]);
     



    const copyRoomId = async () => {
        try {
            const pathParts = location.pathname.split('/');
            const roomId = pathParts[2];
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID Copied');
        } catch (err) {
            console.error('copy failed', err);
        }
    };



    const leaveRoom = () => navigate('/');

    if(!location.state){
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white flex items-center justify-center p-6">
            <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-[320px_1fr]">

                {/* LEFT SIDEBAR */}
                <aside className="bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-md bg-blue-800 text-white flex items-center justify-center font-bold">CC</div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">Mock Together</h3>
                                <p className="text-xs text-slate-500">Realtime editor</p>
                            </div>
                        </div>


                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-slate-700 mb-3">Members</h4>

                            {/* clients  */}
                            {
                                clients.map((client) => (
                                    <Client key={client.socketId} username = {client.userName}/>
                                ))
                            }

                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={copyRoomId}
                                className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
                            >
                                Copy Room ID
                            </button>
                            <button
                                onClick={leaveRoom}
                                className="w-full py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200 transition cursor-pointer"
                            >
                                Leave Room
                            </button>
                        </div>
                    </div>
                </aside>

                {/* RIGHT: only code editor */}
                <main className="h-full p-2 w-full">
                    <div className="h-full w-full border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <Editor socketRef = {socketRef} roomId={roomId} onCodeChange={(code) => codeRef.current = code}/>
                    </div>
                </main>
            </div>
        </div>
    );
}
