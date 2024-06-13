import MainPage from './pages/MainPage.js';
import SignUpPage from './pages/SignUpPage.js';
import SignInPage from './pages/SignInPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirewallGuidePage from './pages/FirewallGuidePage.js';
import MyPage from './pages/MyPage.js';




const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/user/signUp" element={<SignUpPage />} />
          <Route path="/user/signIn" element={<SignInPage />} />
          <Route path='/guidePage' element={<FirewallGuidePage />} />
          <Route path="/user/myPage" element={<MyPage />} />
          <Route path="/" element={<MainPage />} />
          {/* <Route path="/" element={<TestPage/>} /> */}
          {/* <Route path="/" element={<SignInPage />} /> */}

        </Routes>
      </div>
    </Router>
  );
}



export default App;