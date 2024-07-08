import { useState } from "react";
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://social-media-platform-api-beta.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const dc =jwtDecode(data.accessToken);
      console.log(dc);
      
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('isAuthenticated', "True");
       
      window.location.href = '/';
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.log(error)
    }
  };

 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xs sm:max-w-md">
        <div className="flex justify-between mb-4">
          <div className="text-lg font-bold">Twitter</div>
          <div className="text-lg font-bold">Sign In</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              username
            </label>
            <input
              type="username"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <a href="/register">Dont have an account? Register →</a>
          </span>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;