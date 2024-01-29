
import React from 'react';
import ChatArea from '../components/ChatArea';
import Sidebar from '../components/Sidebar';
import '../components/Style/Style.css';
import { useShowUsersQuery } from '../Services/User/UserApi';
import { getToken } from '../Services/localStorageToken';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

const HomePage = () => {
  const { token } = getToken();
  const { data: users, iserror, error } = useShowUsersQuery({ token });

  let usersdata;
  usersdata = users ? (
    users.map((user) => (
      <div key={user.id} className="user-item">
        <Sidebar user={user} />
      </div>
    ))
  ) : null;

  return (
    <>
      <div className='chat-container'>
        <div className="sidebar">
          {usersdata}
        </div>
        <ChatArea />
      </div>
    </>
  );
};

export default HomePage;
