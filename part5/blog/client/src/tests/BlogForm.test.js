import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import BlogForm from '../components/BlogForm';

describe('BlogForm component', () => {
  test('form calls event handler with correct details when a new blog is created', () => {
    const handleBlogCreationMock = jest.fn();

    const component = render(
      <BlogForm handleBlogCreation={handleBlogCreationMock} />
    );

    const titleInput = component.getByTestId('title');
    const authorInput = component.getByTestId('author');
    const urlInput = component.getByTestId('url');
    const createButton = component.getByText('Create New Blog');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.change(urlInput, { target: { value: 'http://example.com' } });

    fireEvent.click(createButton);

    expect(handleBlogCreationMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://example.com',
    });
  });
});
