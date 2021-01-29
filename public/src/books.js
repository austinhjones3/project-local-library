const { booksOut, booksIn } = require("./helpers");

function findAuthorById(authors, testId) {
  return authors.find(({ id: authorId }) => authorId === testId);
}

function findBookById(books, testId) {
  return books.find(({ id: bookId }) => bookId === testId);
}

function partitionBooksByBorrowedStatus(books) {
  return [booksOut(books), booksIn(books)];
}

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

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
