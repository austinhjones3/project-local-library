const { 
    checkStr,
    booksOut,
    booksIn,
} = require("./helpers");


// for any and all unknown methods please see helpers.js
// authors and books are both destructured to access their id keys
// and they are renamed as authorId and bookId to avoid errors
// or semantic confusion
function findAuthorById(authors, testId) {
    return authors.find(({id: authorId}) => checkStr(authorId, testId));
}


function findBookById(books, testId) {
    return books.find(({id: bookId}) => checkStr(bookId, testId));
}


function partitionBooksByBorrowedStatus(books) {
    const result = [];
    // see helpers.js.
    // each array is pushed in as an element of result arr. 
    // out first, then in
    result.push(booksOut(books));
    result.push(booksIn(books));
    return result;
}


function getBorrowersForBook({ borrows }, accounts) {
    const result = [];
    // we are essentially adding stuff to each borrow object
    borrows.forEach(element => {
        // spread element and the account that checked the book out
        result.push({
            ...element,
            ...accounts.find(account => account.id === element.id),
        });
        return result;
    });
    return result.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
