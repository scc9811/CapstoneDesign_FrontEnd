import React, { useState, useEffect } from 'react';

function MainPage() {
  const [socketData, setSocketData] = useState(null);

  useEffect(() => {
    // WebSocket 연결
    // const ws = new WebSocket('ws://scc9811.site:8080/socketConnection');
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
  }, []);

  if (!socketData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>averageResponseTime: {socketData.averageResponseTime}</h1>
      {socketData.running ? null : (
        <h1>packetLossRate: {socketData.packetLossRate}</h1>
      )}
    </div>
  );
}

export default MainPage;
