import React from 'react'
import ChatArea from '../components/ChatArea'
import Sidebar from '../components/Sidebar'
import '../components/Style/Style.css'

const HomePage = () => {
  return (
    <>
        <div className='chat-container'>
            <Sidebar/>
            <ChatArea/>
        </div>
    </>
  )
}

export default HomePage
