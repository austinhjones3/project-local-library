const { 
    booksOut,
    booksIn,
} = require("./helpers");


// for any and all unknown methods please see helpers.js
// authors and books are both destructured to access their id keys
// and they are renamed as authorId and bookId to avoid errors
// or semantic confusion
function findAuthorById(authors, testId) {
    return authors.find(({ id: authorId }) => authorId === testId);
}


function findBookById(books, testId) {
    return books.find(({ id: bookId }) => bookId === testId);
}


function partitionBooksByBorrowedStatus(books) {
    // each array is pushed in as an element of return arr. 
    // out first, then in
    return [booksOut(books), booksIn(books)];
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
