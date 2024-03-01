import React, { useState } from 'react';

const HomePage = ({ username, mobileNumber }) => {
  const [message, setMessage] = useState('');

  // return (
  //     <div className="container">
  //     <h1>Welcome to the home page!</h1>
  //     <p>Username: {username}</p>
  //     <p>Mobile Number: {mobileNumber}</p>
  //     <label htmlFor="message-input">Enter a message: </label>
  //   )
      
     
  return (
    
    <div>

      <h1>Welcome, {username}</h1>
      <p>Your Mobile Number: {mobileNumber}</p>

    </div>
  );
};

export default HomePage;
