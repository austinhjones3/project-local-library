const { findAuthorById } = require("./books");

function findAccountById(accounts, testId) {
  return accounts.find((account) => account.id === testId);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last > accountB.name.last ? 1 : -1;
  });
}

function numberOfBorrows({ id: accountId }, books) {
  return books.reduce((total, book) => {
    const borrowIdArr = book.borrows.map((element) => element.id);
    if (borrowIdArr.includes(accountId)) total++;
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books
    .filter((book) => {
      const latestBorrow = book.borrows[0];
      return !latestBorrow.returned && latestBorrow.id === account.id;
    })
    .map((book) => {
      const author = findAuthorById(authors, book.authorId);
      return { ...book, author };
    });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
