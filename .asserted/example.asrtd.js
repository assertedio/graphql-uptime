const { expect } = require('chai');
const got = require('got');
const { v4: uuid } = require('uuid');

const client = got.extend({
  prefixUrl: 'http://localhost:4000',
});

const createdBookName = `name-${uuid()}`;

describe('graphql api tests', () => {
  let createBookId;

  it('get all books', async () => {
    const { data } = await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `{
          books {
            id
          }
        }`,
        },
      })
      .json();

    expect(data).to.eql({
      books: [
        {
          id: 'design-patterns',
        },
        {
          id: 'refactoring',
        },
        {
          id: 'patterns-of-enterprise-application-architecture',
        },
        {
          id: 'domain-driven-design',
        },
        {
          id: 'clean-code',
        },
        {
          id: 'agile-software-development',
        },
      ],
    });
  });

  it('get other books written by the author', async () => {
    const { data } = await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `{
          book(id: "clean-code") {
            name
            authors {
              name
              books {
                name
              }
            }
          }
        }`,
        },
      })
      .json();

    expect(data).to.eql({
      book: {
        name: 'Clean Code - A Handbook of Agile Software Craftsmanship',
        authors: [
          {
            name: 'Robert C. Martin',
            books: [
              {
                name: 'Clean Code - A Handbook of Agile Software Craftsmanship',
              },
              {
                name: 'Agile Software Development, Principles, Patterns, and Practices',
              },
            ],
          },
        ],
      },
    });
  });

  it('create a book', async () => {
    const { data } = await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `mutation($newBook: BookInput!) {
            createBook(book: $newBook) {
              id
              name
            }
          }`,
          variables: {
            newBook: {
              name: createdBookName,
              publisherId: 'new-pub',
            },
          },
        },
      })
      .json();

    const { id, name } = data.createBook;
    createBookId = id;

    expect(createBookId).to.exist;
    expect(name).to.eql(createdBookName);
  });

  it('update a book', async () => {
    expect(createBookId).to.exist;
    const { data } = await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `mutation($bookId: ID!, $updatedBook: BookInput!) {
            updateBook(bookId: $bookId, book: $updatedBook) {
              id
              name
            }
          }`,
          variables: {
            bookId: createBookId,
            updatedBook: {
              name: 'new-name',
              publisherId: 'new-pub',
            },
          },
        },
      })
      .json();

    const { id, name } = data.updateBook;

    expect(id).to.eql(createBookId);
    expect(name).to.eql('new-name');
  });

  it('remove a book', async () => {
    expect(createBookId).to.exist;
    await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `mutation($bookId: ID!) {
            deleteBook(bookId: $bookId)
          }`,
          variables: {
            bookId: createBookId,
          },
        },
      })
      .json();

    const { data } = await client
      .post('', {
        headers: {
          'content-type': 'application/json',
        },
        json: {
          query: `query($bookId: ID!) {
            book(id: $bookId) {
              id
            }
          }`,
          variables: {
            bookId: createBookId,
          },
        },
      })
      .json();

    expect(data.book).to.eql(null);
  });
});
