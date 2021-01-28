const { 
    getAuthorIds,
    booksOut,
    sortSlice,
    getGenreObj,
} = require("./helpers.js");


const {
    findAuthorById,
} = require("./books.js");

// for any and all unknown methods please see helpers.js
function totalBooksCount(books) {
    return books.length;
}


function totalAccountsCount(accounts) {
    return accounts.length;
}


function booksBorrowedCount(books) {
    return booksOut(books).length;
}


function getMostCommonGenres(books) {
    const result = [];
    const genreObj = getGenreObj(books);
    for (let i = 0; i < Object.keys(genreObj).length; i++) {
        const tempKey = Object.keys(genreObj)[i];
        const tempVal = Object.values(genreObj)[i];
        result[i] = { name: tempKey, count: tempVal };
    }
    return sortSlice(result, 5);
}   


function getMostPopularBooks(books) {

    const result = [];
    // for each
    books.forEach(element => {
        // push an object containing the title and number of borrows
        result.push({
            name: element.title,
            count: element.borrows.length, 
        });
        return result;
    });

    // sort the array by popularity, cut it to top 5, return
    return sortSlice(result, 5);
}


function getMostPopularAuthors(books, authors) {
    const result = [];
    // get array of author id's
    const authorIdArr = getAuthorIds(authors);
    // for each author id
    authorIdArr.forEach(id => {
        // find their books and return them
        const booksByAuthor = books.filter(element => id === element.authorId);
        // for each book
        booksByAuthor.forEach(book => {
            // retrieves the author obj that matches the current author id
            // find the object for the author by using author id
            const authorObj = findAuthorById(authors, id);
            // push { key-name: authorName, key-count: numOfBorrows }
            result.push({ 
                name: `${authorObj.name.first} ${authorObj.name.last}`,
                count: book.borrows.length,
            });
            return result;
        });
        return result;
    });

    // sort the array by popularity, cut it to top 5, return
    return sortSlice(result, 5);
}


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
