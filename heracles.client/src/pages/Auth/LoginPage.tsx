// pages/Auth/LoginPage.tsx

import { useState } from "react";
import apiClient from "../../api/apiClient";
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  };

  return (
    <div className="login-page">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;