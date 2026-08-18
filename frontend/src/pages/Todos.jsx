import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Todos(){
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');

  async function load(){
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href = '/login';
      return;
    }

    try{
      const res = await API.get('/api/todos');
      setTodos(res.data);
    }catch(er){
      setErr('Failed to load');
    }
  }

  useEffect(()=>{ load(); }, []);

  async function add(e){
    e.preventDefault();
    try{
      const res = await API.post('/api/todos', { text });
      setTodos(prev => [res.data, ...prev]);
      setText('');
    }catch(er){ setErr('Failed'); }
  }

  async function toggle(id, completed){
    try{
      const res = await API.put(`/api/todos/${id}`, { completed: !completed });
      setTodos(prev => prev.map(t => t._id===id?res.data:t));
    }catch(er){ setErr('Failed'); }
  }

  async function remove(id){
    try{
      await API.delete(`/api/todos/${id}`);
      setTodos(prev => prev.filter(t => t._id!==id));
    }catch(er){ setErr('Failed'); }
  }

  if(!localStorage.getItem('token')){
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="todos">
      <h2>Your Todos</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={add} className="form-inline">
        <input placeholder="New todo" value={text} onChange={e=>setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t._id} className={t.completed? 'done':''}>
            <label>
              <input type="checkbox" checked={!!t.completed} onChange={()=>toggle(t._id, t.completed)} />
              <span>{t.text}</span>
            </label>
            <button onClick={()=>remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
