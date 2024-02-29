import React, { useState } from 'react';

const HomePage = ({ username, mobileNumber }) => {
  return (
    
    <div>
      <h1>Welcome, {username}</h1>
      <p>Your Mobile Number: {mobileNumber}</p>
    </div>
  );
};

export default HomePage;
