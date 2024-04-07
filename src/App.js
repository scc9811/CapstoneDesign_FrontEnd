// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage.js';
import Page2 from './pages/page2.js';
import React, { useState , useEffect } from 'react';
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
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    // POST 요청 보내기
    axios.post('http://localhost:8080/ping/isICMPInboundAllowed')
      .then(response => {
        setIsAllowed(response.data.allowed);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행되도록 빈 배열을 두 번째 매개변수로 전달

  if (isAllowed === null) {
    // 데이터가 로딩 중일 때 보여줄 화면
    return <div>Loading...</div>;
  } else if (isAllowed) {
    // isAllowed가 true일 때 보여줄 화면
    return <MainPage />;
  } else {
    // isAllowed가 false일 때 보여줄 화면
    return <Page2 />;
  }
};



export default App;