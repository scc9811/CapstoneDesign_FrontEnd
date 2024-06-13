import React, { useState, useEffect } from 'react';

function MainPage() {
  const [socketData, setSocketData] = useState(null);
  const [isAllowed, setIsAllowed] = useState(null);
  const [publicIP, setPublicIP] = useState('');

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
    const fetchPublicIP = async () => {
      try {
        const response = await fetch('http://localhost:8080/ping/getClientIP');
        const data = await response.text();
        setPublicIP(data);
      } catch (error) {
        console.error('Error fetching public IP:', error);
      }
    };
    fetchPublicIP();
  }, [])

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
      <h1 className='userIP'>

      Your Public IP : {publicIP} <br />
      Server IP : 54.180.58.154 <br />
      
      </h1>
      {/* <h1 className='userIP'>Your IP : </h1>
      <h1 className='userIP'>Server IP : </h1> */}
      <div className='myBox'>
        <h1>평균 응답시간 : {socketData.averageResponseTime}초</h1>
        {socketData.running ? null : (
          <div>
            <h1>패킷 손실 비율 : {socketData.packetLossRate}</h1>
            <button className='storeButton' onClick={storeResult}>결과 저장하기</button>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default MainPage;
