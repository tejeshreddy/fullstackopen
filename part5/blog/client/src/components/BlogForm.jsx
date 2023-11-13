import React, { useState } from 'react';

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    props.handleBlogCreation({ title: title, author: author, url: url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create Blog Post</h2>
      <form onSubmit={addBlog}>
        <div>
          <span>Title:</span>
          <input
            id="title"
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <span>Author:</span>
          <input
            id="author"
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <span>URL:</span>
          <input
            id="url"
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create New Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
