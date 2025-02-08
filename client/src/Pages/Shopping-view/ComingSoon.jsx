import React from 'react';

const ComingSoon = () => {
  return (
    <div style={comingSoonStyle}>
      <h1>Coming Soon</h1>
      <p>This feature is under development. Stay tuned!</p>
    </div>
  );
};

const comingSoonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#f7f7f7',
};

export default ComingSoon;
