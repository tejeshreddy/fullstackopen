import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from '../components/Blog';

test('renders note content', () => {
  const blog = {
    title: 'first testing post',
    author: 'author1',
    url: 'blog/1',
    likes: '10',
  };

  render(<Blog blog={blog} />);
  const element = screen.getByText('first testing post - author1');
  expect(element).toBeDefined();
});
