import React from 'react';

function MyComponent() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>{currentDate}</div>
  );
}

export default MyComponent;