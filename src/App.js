// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage.js';
import Page2 from './pages/page2.js';
import React, { useState } from 'react';
import axios from 'axios';


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/a" element={<Page1/>} />
//         <Route path="/b" element={<Page2/>} />
//       </Routes>
//     </Router>
//   );
// }


const App = () => {
  const [isICMPInboundAllowed, setIsICMPInboundAllowed] = useState(null);

  // 클라이언트 요청 함수
  const handleRequest = async () => {
    try {
      const response = await axios.post('http://localhost:8080/ping/isICMPInboundAllowed');
      // console.log(response)
      const { data } = response;
      setIsICMPInboundAllowed(data); // 요청 결과에 따라 상태를 업데이트
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsICMPInboundAllowed(false); // 요청 실패 시 false로 설정
    }
    
  };

  // 페이지 변경 함수
  const renderPage = () => {
    if (isICMPInboundAllowed === null) {
      return <p>Loading...</p>; // 요청이 아직 완료되지 않은 경우
    } else if (isICMPInboundAllowed === true) {
      return <MainPage />; // true일 때 page1 반환
    } else {
      return <Page2 />; // false일 때 page2 반환
    }
  };

  return (
    <div>
      <button onClick={handleRequest}>Send Request</button>
      {renderPage()}
    </div>
  );
};

// const Page1 = () => {
//   return <h1>Page 1</h1>;
// };

// const Page2 = () => {
//   return <h1>Page 2</h1>;
// };



export default App;