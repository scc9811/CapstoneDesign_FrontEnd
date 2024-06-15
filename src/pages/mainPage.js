import React, { useState, useEffect } from 'react';

function MainPage() {
  const [socketData, setSocketData] = useState(null);
  const [isAllowed, setIsAllowed] = useState(null);
  const [publicIP, setPublicIP] = useState('');
  const [responseCount, setResponseCount] = useState(0); // 응답 횟수 상태 추가


  const storeResult = async() => {
    const { averageResponseTime } = socketData;
    // Save averageResponseTime to localStorage
    localStorage.setItem('averageResponseTime', averageResponseTime);

    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    console.log('token : ', token);
    if (token) {
      // token 있으면 --> 백엔드 서버로 userEmail, nickName 요청 가능.
      try {
        const response = await fetch('http://scc9811.site:8080/ping/storeResult', {
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
          window.location.href = '/user/myPage';
        } else {
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
        const response = await fetch('http://scc9811.site:8080/ping/getClientIP');
        const data = await response.text();
        setPublicIP(data);
      } catch (error) {
        console.error('Error fetching public IP:', error);
      }
    };
    fetchPublicIP();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://scc9811.site:8080/ping/isICMPInboundAllowed');
        const data = await response.json();
        setIsAllowed(data.allowed);
        console.log('data.allowed = ', data.allowed);
      } catch (error) {
        console.error('Error fetching data:', error);
        window.location.href = '/guidePage';
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isAllowed) {
      // WebSocket 연결
      const ws = new WebSocket('ws://scc9811.site:8080/socketConnection');

      // 소켓 연결될 때 실행되는 함수
      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      // 메시지를 수신할 때 실행되는 함수
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setSocketData(data);
        setResponseCount(prevCount => prevCount + 1);
      };

      // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
      return () => {
        ws.close();
      };
    }
  }, [isAllowed]);

  if (isAllowed === null) {
    return (
      <div>
        <h1 className='userIP'>방화벽 확인 필요.</h1>
        <button onClick={() => window.location.href = '/guidePage'}>
          방화벽 가이드로 이동
        </button>
      </div>
    );
  }

  if (!isAllowed) {
    return (
      <div>
        <div className='guideButtonBox'>
          <h1 className='userIP'>방화벽 확인 필요.</h1>
          <button onClick={() => window.location.href = '/guidePage'}>
            방화벽 가이드로 이동
          </button>
        </div>
      </div>
    );
  }

  if (!socketData) {
    return (
      <div>
        <h1 className='userIP'>방화벽 확인 필요.</h1>
        <button onClick={() => window.location.href = '/guidePage'}>
          방화벽 가이드로 이동
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='userIP'>
        Your Public IP : {publicIP} <br />
        Server IP : 54.180.58.154 <br />
      </h1>
      <div className='myBox'>
        <h1>평균 응답시간 : {socketData.averageResponseTime}초</h1>
        {socketData.running ? null : (
          <div>
            <h1>패킷 손실 비율 : {socketData.packetLossRate}</h1>
            <button className='storeButton' onClick={storeResult}>결과 저장하기</button>
          </div>
        )}
        <h2>응답 횟수 : {responseCount}</h2> {/* 응답 횟수 표시 */}
      </div>
    </div>
  );
}

export default MainPage;
