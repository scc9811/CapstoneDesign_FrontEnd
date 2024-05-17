import React, { useState } from 'react';

function SignUpPage() {
  // 각 입력 필드의 상태를 관리하는 useState 훅 사용.
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // 회원가입 버튼 클릭 시 실행.
  const handleSignUp = () => {
    const userData = {
        userId: userId,
        password: password,
        name: name
    };
    fetch('http://localhost:8080/user/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('회원가입 결과:', data);
    })
    .catch(error => {
        console.error('회원가입 오류:', error);
    });ç

    // 여기에 로직 추가 가능.    

  };

  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <label>
          ID: 
          <input 
            type="text" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Password: 
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          이름: 
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </label>
      </div>
      <button onClick={handleSignUp}>회원가입</button>
    </div>
  );
}

export default SignUpPage;
