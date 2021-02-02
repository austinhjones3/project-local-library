/**
 * Return the author object whose ID matches the idToMatch
 *
 * @param {Object[]} authors - each object contains info for author
 * @param {Number} idToMatch - an author's ID
 * @returns {Object} - an author object matching the ID
 *
 * @example findAuthorById(authors, 4);
 */
function findAuthorById(authors, idToMatch) {
  return authors.find(({ id: authorId }) => authorId === idToMatch);
}

/**
 * Return the book object whose ID matches the idToMatch
 *
 * @param {Object[]} books - each object contains info for book
 * @param {Number} idToMatch - a book's ID
 * @returns {Object} - a book object matching the ID
 *
 * @example findBookById(books, "5f447132d487bd81da01e25e");
 */
function findBookById(books, idToMatch) {
  return books.find(({ id: bookId }) => bookId === idToMatch);
}

/**
 * Return an array of two arrays. The first element is an array of all book objects that
 * are currently checked out. The second element is an array of all book objects that
 * are currently in the library.
 * @function _booksOut @function _booksIn are helpers from ./helpers.js
 * @param {Object[]} books - each object contains info for books
 * @returns {Array[Object]} - an array with two arrays as elements, that contain
 * book objects
 *
 * @example partitionBooksByBorrowedStatus(books);
 */
function partitionBooksByBorrowedStatus(books) {
  return [_booksOut(books), _booksIn(books)];
}

/**
 * Returns an array of all borrowers of a given book, as well as the
 * borrower's information
 *
 * @param {Object} book - book obj
 * @param {Object[]} book.borrows - an array of 'borrows' objects. Each borrow
 * contains the ID of the borrower and a 'returned' boolean key.
 * @param {Object[]} accounts - an array of account objects. Each object contains
 * keys of information for the account.
 * @returns {Object[]} - an array of borrower objects containing the keys from the borrow object
 * and the keys of the associated account object.
 *
 * @example getBorrowsForBook(books[3], accounts);
 */
function getBorrowersForBook({ borrows }, accounts) {
  const result = [];
  borrows.forEach((element) => {
    result.push({
      ...element,
      ...accounts.find((account) => account.id === element.id),
    });
    return result;
  });
  return result.slice(0, 10);
}

/*>>>>>>>>>>>>>>>>>>>> HELPERS <<<<<<<<<<<<<<<<<<<<*/

/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of book objects that are currently checked out
 */
const _booksOut = (books) => {
  return books.filter((book) => book.borrows[0].returned === false);
};

/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of book objects that are currently in the library
 */
const _booksIn = (books) => {
  return books.filter((book) => book.borrows[0].returned === true);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  _booksOut,
};
