const { 
    booksOut,
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
    const genreObj = _getGenreObj(books);
    for (let i = 0; i < Object.keys(genreObj).length; i++) {
        const tempGenre = Object.keys(genreObj)[i];
        const tempCount = Object.values(genreObj)[i];
        result[i] = { name: tempGenre, count: tempCount };
    }
    return _sortSlice(result, 5);
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
    return _sortSlice(result, 5);
}


function getMostPopularAuthors(books, authors) {
    const result = [];
    const authorListObj = _getAuthorObj(books, authors);
    
    for (let i = 0; i < Object.keys(authorListObj).length; i++) {
        const tempAuthor = Object.keys(authorListObj)[i];
        const tempCount = Object.values(authorListObj)[i];
        result[i] = { name: tempAuthor, count: tempCount };
    }
    // sort the array by popularity, cut it to top 5, return
    return _sortSlice(result, 5);
}


const _getGenreObj = (books) =>{
    const obj = {};
    books.forEach(book => {
        obj[book.genre] 
        ?   obj[book.genre]++
        :   obj[book.genre] = 1;
    });
    return obj;
}

const _getAuthorObj = (books, authors) => {
    const obj = {}
    books.forEach(book => {
        const authorOfBook = findAuthorById(authors, book.authorId);
        const authorName = `${authorOfBook.name.first} ${authorOfBook.name.last}`;

        obj[authorName]
        ?   obj[authorName] += book.borrows.length
        :   obj[authorName] = book.borrows.length;
    });
    return obj;
}

const _sortSlice = (arr, length) => {
    return arr.sort((entryA, entryB) => {
        return entryA.count < entryB.count ? 1 : -1;
    }).slice(0, length);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
