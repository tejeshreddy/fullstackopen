import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll(user).then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      {!user ? (
        <>
          <form onSubmit={handleLogin}>
            <div>
              <span>Username:</span>
              <input
                type="text"
                name="Username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <span>Password:</span>
              <input
                type="password"
                name="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
