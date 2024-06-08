// import React from 'react';

// const FirewallGuidePage = () => {
//   return (
//     <div>
//       <h1>방화벽 설정을 확인해주세요.</h1>
//       <button onClick={() => window.location.href = '/'}>
//         방화벽 설정 완료. <br/>
//         다시 테스트 시도하기.
//       </button>
//     </div>
//   );
// };

// export default FirewallGuidePage;
import React, { useState } from 'react';

const FirewallGuidePage = () => {
  const [message, setMessage] = useState('');

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:8080/ping/isICMPInboundAllowed');
      const data = await response.json();
      console.log('allowed = ', data.allowed);
      if (data.allowed) {
        window.location.href = '/';
      } else {
        setMessage('방화벽 설정을 다시 확인해주세요.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('서버에 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h1>방화벽 설정을 확인해주세요.</h1>
      <button onClick={handleButtonClick}>
        방화벽 설정 완료. <br/>
        다시 테스트 시도하기.
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FirewallGuidePage;
