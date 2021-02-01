const { findAuthorById } = require("./books");

/**
 * @param {Object[]} accounts - an array of account objects
 * @param {Number} idToMatch - an account's ID
 * @returns {Object} - an account object that matches the idToMatch
 *
 * @example findAccountById(accounts, "5f447132d487bd81da01e25e");
 */
function findAccountById(accounts, idToMatch) {
  return accounts.find((account) => account.id === idToMatch);
}

/**
 * @param {Object[]} accounts - an array of account objects.
 * @returns the account object sorted alphabetically by last name
 */
function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

/**
 * Return a number representing the amount of borrows that match the accountId
 *
 * @param {Object} account - account obj
 * @param {Number} accountId - the ID of the account
 * @param {Object[]} books - an array of book objects
 * @returns - the number of transactions for a given account
 *
 * @example numberOfBorrows(7, books);
 *
 */
function numberOfBorrows({ id: accountId }, books) {
  // accumulate and return the given account's number of borrows
  return books.reduce((total, book) => {
    const borrowIdArr = book.borrows.map((element) => element.id);
    if (borrowIdArr.includes(accountId)) total++;
    return total;
  }, 0);
}

/**
 * Get the books possessed by an account and return them. Each object should have
 *
 * @param {Object} account - an account object
 * @param {Object[]} books - an array of book objects
 * @param {Object[]} authors - an array of author objects
 * @returns - an array of objects containing the book object keys and the author
 * object behind the key 'author'.
 *
 * @example getBooksPossessedByAccount(accounts[5], books, authors);
 */
function getBooksPossessedByAccount(account, books, authors) {
  // return an array of all books and their authors possessed by the account
  return (
    books
      // filter for only the books that are checked out by the account
      .filter((book) => {
        const latestBorrow = book.borrows[0];
        return !latestBorrow.returned && latestBorrow.id === account.id;
      })
      // map out data for those books: book keys and associated author object
      .map((book) => {
        const author = findAuthorById(authors, book.authorId);
        return { ...book, author };
      })
  );
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
