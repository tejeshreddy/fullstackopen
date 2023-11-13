import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Blog from '../components/Blog';
import userEvent from '@testing-library/user-event';

describe('blog component tests', () => {
  let blog = {
    title: 'first testing post',
    author: 'author1',
    url: 'blog/1',
    likes: '10',
  };
  let mockUpdateFunction = jest.fn();
  let mockDeleteFunction = jest.fn();

  test('renders note content', () => {
    // Query Selector method
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateFunction}
        deleteBlog={mockDeleteFunction}
      />
    );

    const div = container.querySelector('.note');
    expect(div).toHaveTextContent('first testing post - author1');
  });

  test('click the show button once and checking if likes and url is present', () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateFunction}
        deleteBlog={mockDeleteFunction}
      />
    );

    const button = component.getByText('show');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('blog/1');
    expect(component.container).toHaveTextContent('10');
  });

  test('like button twice calls the event handler twice', () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateFunction}
        deleteBlog={mockDeleteFunction}
      />
    );

    const likeButton = component.getByText('like');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockUpdateFunction).toHaveBeenCalledTimes(2);
  });
});
