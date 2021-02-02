/**
 * @param {Object[]} books - an array of book objects
 * @returns {Number} - the length of the books array
 */
function totalBooksCount(books) {
  return books.length;
}

/**
 * @param {Object[]} accounts - an array of account objects
 * @returns {Number} - the length of the accounts array
 */
function totalAccountsCount(accounts) {
  return accounts.length;
}

/**
 * @function booksOutArr is a helper function from ./helpers.js
 * @param {Object[]} books
 * @returns {Number} - the length of the array returned from booksOut(books)
 */
function booksBorrowedCount(books) {
  return _booksOut(books).length;
}

/**
 * Go through the books array and count the amount of times each genre is listed.
 * Return the top 5 genres by popularity as an array of objects.
 *
 * @function _getGenreCountObj,
 * @function _sortSlice,
 * @function _getArrFromObj are all written as helper functions at the
 * bottom of this file.
 * @param {Object[]} books
 * @returns {Object[]} - an array of objects representing the top 5
 * most common genres
 */
function getMostCommonGenres(books) {
  const genreListObj = _getGenreCountObj(books);
  return _sortSlice(_getArrFromObj(genreListObj), 5);
}

/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of the top 5 most popular books according to
 * the amount of borrows objects in each book.
 */
function getMostPopularBooks(books) {
  const result = [];
  books.forEach((element) => {
    result.push({
      name: element.title,
      count: element.borrows.length,
    });
    return result;
  });
  return _sortSlice(result, 5);
}

/**
 * @param {Object[]} books - array of book objects
 * @param {Object[]} authors - array of author objects
 * @returns {Object[]} - array of the top 5 most popular authors according to
 * the amount of borrow objects in the book objects associated with the author
 */
function getMostPopularAuthors(books, authors) {
  const authorListObj = _getAuthorCountObj(books, authors);
  return _sortSlice(_getArrFromObj(authorListObj), 5);
}

/*>>>>>>>>>>>>>>>>>>>> HELPERS <<<<<<<<<<<<<<<<<<<<*/

/**
 * @param {Object[]} books - array of book objects
 * @returns {Object} - an object of genres (keys) and the amount of times (values)
 * each genre appears in the array of books.
 */
const _getGenreCountObj = (books) => {
  const obj = {};
  books.forEach((book) => {
    // does key exist? Increment if so, create with value 1 if not
    obj[book.genre] ? obj[book.genre]++ : (obj[book.genre] = 1);
  });
  return obj;
};

/**
 * @param {Object[]} books - array of book objects
 * @param {Object[]} authors - array of author objects
 * @returns {Object} - an object of authors (keys) and the amount of times (values)
 * each author appears in the array of books
 */
const _getAuthorCountObj = (books, authors) => {
  const obj = {};
  books.forEach((book) => {
    const authorOfBook = _findAuthorById(authors, book.authorId);
    const authorName = `${authorOfBook.name.first} ${authorOfBook.name.last}`;

    /* does key exist? Increment by book.borrows.length if so, create with
    value book.borrows.length if not */
    obj[authorName]
      ? (obj[authorName] += book.borrows.length)
      : (obj[authorName] = book.borrows.length);
  });
  return obj;
};

/**
 * @param {Object[]} arr
 * @param {Number} length
 * @returns {Object[]} - sorted by length property and cut down to size 'length'
 * from index 0
 */
const _sortSlice = (arr, length) => {
  return arr.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, length);
};

/**
 * @param {Object} obj - an object containing names and counts
 * @returns {Object[]} - an array of objects that contain 2 keys; name: "string",
 * count: number
 */
const _getArrFromObj = (obj) => {
  const result = [];
  for (let i = 0; i < Object.keys(obj).length; i++) {
    const name = Object.keys(obj)[i];
    const count = Object.values(obj)[i];
    result[i] = { name, count };
  }
  return result;
};

/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of book objects that are currently checked out
 */
const _booksOut = (books) => {
  return books.filter((book) => book.borrows[0].returned === false);
};

/**
 * Return the author object whose ID matches the idToMatch
 *
 * @param {Object[]} authors - each object contains info for author
 * @param {Number} idToMatch - an author's ID
 * @returns {Object} - an author object matching the ID
 *
 * @example findAuthorById(authors, 4);
 */
function _findAuthorById(authors, idToMatch) {
  return authors.find(({ id: authorId }) => authorId === idToMatch);
}
module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
