/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of book objects that are currently checked out
 */
const booksOut = (books) => {
  return books.filter((book) => book.borrows[0].returned === false);
};

/**
 * @param {Object[]} books - an array of book objects
 * @returns {Object[]} - an array of book objects that are currently in the library
 */
const booksIn = (books) => {
  return books.filter((book) => book.borrows[0].returned === true);
};

/**
 * @param {Object[]} booksOutArr - an array of books that are currently checked out
 * @param {Object} account - an account object
 * @returns {Object[]} - an array of book objects that are currently
 * checked out by the specified account
 *
 * @example booksOutForAccount(booksOutArr, accounts[3]);
 */
const booksOutForAccount = (booksOutArr, account) => {
  return booksOutArr.filter((element) => element.borrows[0].id === account.id);
};

module.exports = {
  booksOut,
  booksIn,
  booksOutForAccount,
};
