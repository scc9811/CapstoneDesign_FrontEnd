// // import React from 'react';

// // const FirewallGuidePage = () => {
// //   return (
// //     <div>
// //       <h1>방화벽 설정을 확인해주세요.</h1>
// //       <button onClick={() => window.location.href = '/'}>
// //         방화벽 설정 완료. <br/>
// //         다시 테스트 시도하기.
// //       </button>
// //     </div>
// //   );
// // };

// // export default FirewallGuidePage;
// import React, { useState } from 'react';

// const FirewallGuidePage = () => {
//   const [message, setMessage] = useState('');

//   const handleButtonClick = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/ping/isICMPInboundAllowed');
//       const data = await response.json();
//       console.log('allowed = ', data.allowed);
//       if (data.allowed) {
//         window.location.href = '/';
//       } else {
//         setMessage('방화벽 설정을 다시 확인해주세요.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setMessage('서버에 오류가 발생했습니다. 나중에 다시 시도해주세요.');
//     }
//   };

//   return (
//     <div>
//       <h1>방화벽 설정을 확인해주세요.</h1>
//       <button onClick={handleButtonClick}>
//         방화벽 설정 완료. <br/>
//         다시 테스트 시도하기.
//       </button>
//       {message && <p>{message}</p>}
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

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      marginTop: '20px',
      color: 'red',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>방화벽 설정을 확인해주세요.</h1>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleButtonClick}
      >
        방화벽 설정 완료. <br />
        다시 테스트 시도하기.
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default FirewallGuidePage;
