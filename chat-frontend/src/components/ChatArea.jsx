import React from 'react'
import Message from './Message'
import './Style/Style.css'
import MessageInput from './MessageInput'

const ChatArea = () => {
  return (
    <div className='chat-area'>
        <div className='chat-header'></div>
        <div className='messages'>
            <Message text="Hai" sent/>
            <Message text="I am good" received/>
        </div>
        <MessageInput/>
    </div>
  )
}

export default ChatArea
