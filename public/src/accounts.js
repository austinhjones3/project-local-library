const { 
    checkStr,
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
            if (checkStr(userId, element)) acc++;
            return acc;
        });
    return acc;
    }, 0);
}
    

function getBooksPossessedByAccount(account, books, authors) {
    const result = [];
    // get all books that are checked out
    const booksOutArr = booksOut(books);
  
    booksOutForAccount(booksOutArr, account).forEach(element => {
        // get authorObj
        const authorObj = findAuthorById(authors, element.authorId);
        // because of the order the req specs want the information in,
        // push the keys in that order. can't use spread
        result.push({ 
            id: element.id,
            title: element.title,
            genre: element.genre,
            authorId: element.authorId,
            author: authorObj,
            borrows: element.borrows,
         });
        return result;
        // at this point we have everything we need we just need to figure
        // out how to return the correct output
    });
    return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
