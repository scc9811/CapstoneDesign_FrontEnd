import React from 'react';

const TestPage = () => {
  const handlePostRequest = () => {
    fetch('http://localhost:8080/user/getJwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key: 'value' })  // 필요한 데이터를 여기에 추가합니다
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('POST request succeeded with JSON response', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const handleGetRequest = () => {
    fetch('www.~~~.request2')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('GET request succeeded with JSON response', data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (
    <div>
      <button onClick={handlePostRequest}>Button 1 (POST)</button>
      <button onClick={handleGetRequest}>Button 2 (GET)</button>
    </div>
  );
};

export default TestPage;
