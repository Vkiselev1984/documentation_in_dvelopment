import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      const data = await res.json();
      login({ username: data.username, role: data.role, token: data.token });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '2rem auto' }}>
      <h2>Login</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      {error && <div className="alert alert-danger py-1">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
}

export default LoginForm;
