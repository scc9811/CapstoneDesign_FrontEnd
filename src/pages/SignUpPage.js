import React, { useState } from 'react';
import './Style.css';

function SignUpPage() {
  // 각 입력 필드의 상태를 관리하는 useState 훅 사용.
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 회원가입 버튼 클릭 시 실행.
  const handleSignUp = () => {
    const userData = {
        email: email,
        password: password,
        nickName: nickName
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
        if (data.result == true) {
            // 회원가입 성공 시 로그인 페이지로 리디렉션
            window.location.href = '/user/signIn';
        } else {
            // 회원가입 실패 시 알림창 띄우기
            alert('이미 가입된 이메일입니다.\n다시 확인해주세요.');
        }
    })
    .catch(error => {
        console.error('회원가입 오류:', error);
    });

    // 여기에 로직 추가 가능.    

  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form style={{height: '550px'}}>
        <h4>SignUp Here</h4>

        <label>Email</label>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <label>NickName</label>
        <input type="text" placeholder="NickName" value={nickName} onChange={(e) => setNickName(e.target.value)} />

        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;
