const { findAuthorById } = require("./books");

function findAccountById(accounts, testId) {
  return accounts.find((account) => account.id === testId);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => (a.name.last > b.name.last ? 1 : -1));
}

function numberOfBorrows({ id: accountId }, books) {
  // accumulate and return the given account's number of borrows
  return books.reduce((total, book) => {
    const borrowIdArr = book.borrows.map((element) => element.id);
    if (borrowIdArr.includes(accountId)) total++;
    return total;
  }, 0);
}

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
