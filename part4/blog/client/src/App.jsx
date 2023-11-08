import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notificationMessage, setNotificationMessage] = useState({
    message: '',
    alertClass: '',
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON);
      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll(user).then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      setUser(loggedUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.postBlog({
      title: title,
      author: author,
      url: url,
    });

    setBlogs(blogs.concat(newBlog));
    setNotificationMessage({
      message: `a new blog ${newBlog.title} by ${newBlog.author} has been created`,
      alertClass: 'success',
    });
    setTimeout(() => {
      setNotificationMessage({});
    }, 5000);
  };

  return (
    <>
      {!user ? (
        <>
          <Notification notificationMessage={notificationMessage} />
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
          <Notification notificationMessage={notificationMessage} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <h2>Create Blog Post</h2>
          <form onSubmit={handleBlogCreation}>
            <div>
              <span>Title:</span>
              <input
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              <span>Author:</span>
              <input
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              <span>URL:</span>
              <input
                type="text"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type="submit">Create New Blog</button>
          </form>
        </>
      )}
    </>
  );
};

export default App;
