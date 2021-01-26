const { 
    checkStr,
    getUniqueGenres,
    getAuthorIds,
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
    // make array out of all genre entries to use to compare to count uniques
    const genresArr = books.map(book => book.genre);
    // get array of unique genres and use for each
    getUniqueGenres(genresArr).forEach(uniqueGenre => {
        let count = 0;
        // if the uniqueGenre === the current genre in the long genre array,
        // ++ the count of that genre
        genresArr.forEach(testGenre => {
            if (checkStr(uniqueGenre, testGenre)) count++;
            return count;
        });
        
        result.push({ name: uniqueGenre, count });
        return result;
    });

    // sort the result from greatest to least and return only the first 5
    return result.sort((entryA, entryB) => {
        return entryA.count < entryB.count ? 1 : -1;
    }).slice(0, 5);
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
    return result.sort((entryA, entryB) => {
        return entryA.count < entryB.count ? 1 : -1;
    }).slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
    const result = [];
    // get array of author id's
    const authorIdArray = getAuthorIds(authors);
    // for each author id
    authorIdArray.forEach(id => {
        // find their books and return them
        const booksByAuthor = books.filter(book => id === book.authorId);
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
    return result.sort((entryA, entryB) => {
        return entryA.count < entryB.count ? 1 : -1;
    }).slice(0, 5);
}


module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
