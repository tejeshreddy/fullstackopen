import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Login from './components/Login';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const blogFormRef = React.createRef();

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
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
      setNotificationMessage({
        message: 'Invalid Credentials',
        alertClass: 'error',
      });
      setTimeout(() => {
        setNotificationMessage({});
      }, 5000);
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate);
      setNotificationMessage({
        message: `Blog ${updatedBlog.title} has been updated successfully`,
        alertClass: 'success',
      });
      setBlogs(
        blogs.map((blog) => (blog.id !== updateBlog.id ? blog : updateBlog))
      );
      setTimeout(() => {
        setNotificationMessage({});
      }, 5000);
    } catch (exception) {
      setNotificationMessage({
        message: `Blog ${blogToUpdate.title} has been updated successfully`,
        alertClass: 'error',
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleBlogCreation = async (blog) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.postBlog(blog);

    setBlogs(blogs.concat(newBlog));
    setNotificationMessage({
      message: `a new blog ${newBlog.title} by ${newBlog.author} has been created`,
      alertClass: 'success',
    });
    setTimeout(() => {
      setNotificationMessage({});
    }, 5000);
  };

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const removeBlog = async (blog) => {
    if (window.confirm(`Confirm deletion of ${blog.title} blog`)) {
      try {
        const deletedBlog = await blogService.removeBlog(blog);
        console.log(deletedBlog);
        setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id));
        setNotificationMessage({
          message: `Blog ${deletedBlog.title} has been deleted successfully`,
          alertClass: 'success',
        });
        setTimeout(() => {
          setNotificationMessage({});
        }, 5000);
      } catch (exception) {
        setNotificationMessage({
          message: `Blog ${blog.title} couldn't be deleted`,
          alertClass: 'error',
        });
        setTimeout(() => {
          setNotificationMessage({});
        }, 5000);
      }
    }
  };

  return (
    <>
      <Notification notificationMessage={notificationMessage} />
      {!user ? (
        <>
          <Login
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => {
              setUsername(target.value);
            }}
            handlePasswordChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm handleBlogCreation={handleBlogCreation} />
          </Togglable>

          <div>
            {blogs.sort(byLikes).map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
