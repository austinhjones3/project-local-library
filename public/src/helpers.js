/**
 * IF a process seemed to be universal, or, it made sense to write
 * some of a function somewhere else to declutter the main tested functions
 * I wrote it here. Some get used a lot, some simply decluttered other
 * functions :)
 */


const checkStr = (str1, str2) => {
    return str1 === str2;
}


// booksOut and booksIn tests the first element of the books' borrows array
// they return an array of the elements that match
const booksOut = books => {
    return books.filter(book => book.borrows[0].returned === false);
}


const booksIn = books => {
    return books.filter(book => book.borrows[0].returned === true);
}


const booksOutForAccount = (booksOutArr, account) => {
    return booksOutArr.filter(element => element.borrows[0].id === account.id);
}



module.exports = {
    checkStr,
    booksOut,
    booksIn,
    booksOutForAccount,
}