const { 
    booksOut,
    booksOutForAccount,
} = require("./helpers");


const {
  findAuthorById,
} = require("./books");

// for any and all unknown methods please see helpers.js
function findAccountById(accounts, testId) {
  // find the account that matches the 'id'
  // use find method
  return accounts.find(account => account.id === testId);
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
      return accountA.name.last > accountB.name.last ? 1 : -1;
  });
}


// destructured account.id, renamed userId
function numberOfBorrows({ id: userId }, books) {
    // destructured "element".borrows renamed borrowArray
    return books.reduce((acc, { borrows: borrowArr }) => {
        // get just the ids from the borrows
        const borrowIdsArr = borrowArr.map(element => element.id);
        // for each borrowId, check if it is equal to user id, acc++ if so
        borrowIdsArr.forEach(element => {
            if (userId === element) acc++;
        });
    return acc;
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
