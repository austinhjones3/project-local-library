const { 
    booksOut,
} = require("./helpers.js");


const {
    findAuthorById,
} = require("./books.js");


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
    const genreObj = _getGenreObj(books);
    return _sortSlice(_getArrFromObj(genreObj), 5);
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
    const authorListObj = _getAuthorObj(books, authors);
    return _sortSlice(_getArrFromObj(authorListObj), 5);
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
    return arr.sort((a, b) => a.count < b.count ? 1 : -1).slice(0, length);
}

const _getArrFromObj = obj => {
    const result = [];
    for (let i = 0; i < Object.keys(obj).length; i++) {
        const name = Object.keys(obj)[i];
        const count = Object.values(obj)[i];
        result[i] = { name, count };
    }
    return result;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
