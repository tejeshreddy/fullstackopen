import { useState } from 'react';

const Blog = (props) => {
  const blog = props.blog;
  const [visible, setVisible] = useState(true);
  const buttonLabel = visible ? 'hide' : 'show';
  const showWhenVisible = { display: visible ? '' : 'none' };
  const [blogObject, setBlogObject] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikeCount = () => {
    const newBlog = { ...blogObject, likes: blogObject.likes + 1 };
    props.updateBlog(newBlog);

    setBlogObject(newBlog);
  };

  const removeBlog = () => {
    props.removeBlog(blogObject);
  };

  return (
    <div style={blogStyle}>
      <div>
        <div>
          {blog.title} - {blog.author}
          <button
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>
            likes {blogObject.likes}
            <button onClick={increaseLikeCount}>like</button>
          </p>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
