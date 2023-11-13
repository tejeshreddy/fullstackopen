// describe('Blog app login functionality', function () {
//   beforeEach(function () {
//     cy.visit('http://localhost:5173');
//     cy.request('GET', 'http://localhost:3003/api/testing/reset');

//     const user = {
//       name: 'Martin Garrix',
//       username: 'garrix',
//       password: 'garrix',
//     };
//     cy.request('POST', 'http://localhost:3003/api/users/', user);
//   });

//   it('Login form is showed', function () {
//     cy.contains('Username');
//     cy.contains('Password');
//   });

//   it('user can login with correct password', function () {
//     cy.get('#username').type('garrix');
//     cy.get('#password').type('garrix');
//     cy.get('#login-submit').click();
//     cy.contains('Martin Garrix logged in');
//   });

//   it('user cannot login with incorrect password and shows valid notification', function () {
//     cy.get('#username').type('garrix');
//     cy.get('#password').type('garrix#');
//     cy.get('#login-submit').click();
//     cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
//     cy.contains('Invalid Credentials');
//   });
// });

// describe('Blog app create blog functionality', function () {
//   beforeEach(function () {
//     cy.visit('http://localhost:5173');
//     cy.get('#username').type('garrix');
//     cy.get('#password').type('garrix');
//     cy.get('#login-submit').click();
//   });

//   it('Create a blog', function () {
//     cy.get('#togglable-button-property').click();
//     cy.get('#title').type('cypress test blog');
//     cy.get('#author').type('cypress');
//     cy.get('#url').type('cypress-test-blog.com');
//     cy.get('#create-blog-submit').click();
//     cy.contains('cypress test blog');
//   });

//   it('test for ensuring that the user who created a blog can delete it and confirm deleting the post', function () {
//     cy.get('#visibility-switch-button').click();
//     cy.contains('remove');
//     cy.get('#remove-button').click();
//     cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)');
//   });
// });

describe('', () => {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
    cy.request('GET', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Martin Garrix',
      username: 'garrix',
      password: 'garrix',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);

    cy.get('#username').type('garrix');
    cy.get('#password').type('garrix');
    cy.get('#login-submit').click();
    cy.contains('Martin Garrix logged in');
  });

  it('Blogs are ordered by likes with the most likes being first', function () {
    const blogLikes = [
      { title: 'Blog with most likes', likes: 10 },
      { title: 'Blog with second most likes', likes: 8 },
    ];

    blogLikes.forEach((blog) => {
      cy.get('#togglable-button-property').click();
      cy.get('#title').type(blog.title);
      cy.get('#author').type('cypress');
      cy.get('#url').type('cypress-test-blog.com');
      cy.get('#create-blog-submit').click();
      cy.contains(blog.title);
    });

    cy.get('.blog')
      .should('have.length', blogLikes.length)
      .each((blog, index) => {
        const likes = parseInt(blog.find('.likes').text(), 10);

        if (index < blogLikes.length - 1) {
          expect(likes).to.be.at.least(
            parseInt(blogLikes[index + 1].likes, 10)
          );
        }
      });
  });
});
