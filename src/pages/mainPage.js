import React, { useState, useEffect } from 'react';
import './Style.css';

function MainPage() {
  const [socketData, setSocketData] = useState(null);
  const [isAllowed, setIsAllowed] = useState(null);

  const storeResult = async() => {
    const { averageResponseTime } = socketData;
    // Save averageResponseTime to localStorage
    localStorage.setItem('averageResponseTime', averageResponseTime);

    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // if (token) --> 바꿔야됨.
    console.log('token : ', token);
    if (token) {
      // token 있으면 --> 백엔드 서버로 userEmail, nickName 요청 가능.
      try {
        const response = await fetch('http://localhost:8080/ping/storeResult', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ averageResponseTime })
        });
        console.log('요청결과 : ', response);
        if(response.ok) {
          alert('저장 완료');
          // window.location.href = '/user/myPage';   <- 나중에 myPage 완성하고 연결할것.
        }

        else {
          // throw new Error('Network response was not ok');
          alert('로그인이 필요합니다');
          window.location.href = '/user/signIn';
        }
      } catch (error) {
        alert('로그인이 필요합니다');
          window.location.href = '/user/signIn';
      }
    } else {
      window.location.href = '/user/signIn';
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/ping/isICMPInboundAllowed');
        const data = await response.json();
        setIsAllowed(data.allowed);
        console.log('data.allowed = ', data.allowed);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isAllowed === null) return;

    if (!isAllowed) {
      // allowed가 false인 경우 guidePage로 리다이렉트
      window.location.href = '/guidePage';
      return;
    }

    // WebSocket 연결
    const ws = new WebSocket('ws://localhost:8080/socketConnection');

    // 소켓 연결될 때 실행되는 함수
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    // 메시지를 수신할 때 실행되는 함수
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSocketData(data);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      ws.close();
    };
  }, [isAllowed]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  if (!socketData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form></form>
      <h1>averageResponseTime: {socketData.averageResponseTime}</h1>
      {socketData.running ? null : (
        <div>
          <h1>packetLossRate: {socketData.packetLossRate}</h1>
          <button onClick={storeResult}>결과 저장하기</button>
        </div>
      )}
    </div>
  );
  
}

export default MainPage;
