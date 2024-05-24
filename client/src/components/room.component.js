// Display room id from url
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './codeEditor.component';
import Whiteboard from './whiteboard.component';
import VideoChat from './videoChat.component';
import TextChat from './textChat.component'
import { SocketProvider } from '../context/SocketProvider';
import '../css/mainpage.css';



const Room = () => {
    const { roomId } = useParams();
    const [showVideoChat, setShowVideoChat] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState(null);
    const [isVideoChat, setIsVideoChat] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    


    const toggleWhiteboard = () => {
        setIsOpen(!isOpen);
      };

      const closeComponent = () => {
        setActiveComponent(null);
      };

      const openVideoChat = () => {
        setIsVideoChatOpen(true);
      };
    
      const closeVideoChat = () => {
        setIsVideoChatOpen(false);
      };
      
      const toggleVideo = () => {
        setIsVideoOpen(!isVideoOpen);
      };

      const toggleComponent = () => {
    
            setIsVideoChat(previsVideoChat => !previsVideoChat);
      }

    return (
        <SocketProvider>

            <div className='containers'>
            <nav className="navbars">
                
                <h1>Room: {roomId}</h1>
                <ul className="navbar-nav">

            <li className="nav-item">
              
              <button onClick={toggleWhiteboard} className="toggle">
                 {isOpen ? 'Close Whiteboard' : 'Open Whiteboard'}
               </button>

              <button onClick={() => setShowVideoChat(!showVideoChat)} className="toggle">
              Chat
          </button>
            <button onClick={toggleVideo} className='toggle'>
              {isVideoOpen ? 'Close Video' : 'Open Video'}
             </button>
            <button onClick={toggleComponent} className='toggle'>Toggle chats</button>

            </li>
            <li className="nav-item">
            </li>
          </ul>

        </nav>
            
               <div className='container'>
                 <div className='main-container'>
                    <CodeEditor />
                </div>
                <div className='whiteboard-container'>
                      { isOpen && <Whiteboard /> }

                </div>
                <div className='chat-container'>
                    { isVideoChat ?  <VideoChat/> :<TextChat />} 
                </div>
                </div>
          
            </div>
        </SocketProvider>
    );
}

export default Room;