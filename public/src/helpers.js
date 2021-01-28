// booksOut and booksIn tests the first element of the books' borrows array
// they return an array of the elements that match
const booksOut = (books) => {
  return books.filter((book) => book.borrows[0].returned === false);
};

const booksIn = (books) => {
  return books.filter((book) => book.borrows[0].returned === true);
};

const booksOutForAccount = (booksOutArr, account) => {
  return booksOutArr.filter((element) => element.borrows[0].id === account.id);
};

module.exports = {
  booksOut,
  booksIn,
  booksOutForAccount,
};
