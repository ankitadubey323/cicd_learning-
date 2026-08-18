import React, { useState } from 'react';
import API from '../api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/todos';
    }catch(er){
      setErr(er?.response?.data?.message || 'Failed');
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
