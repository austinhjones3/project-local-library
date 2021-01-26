#### .slice()
 - takes two arguments: the index to start from, and the amount of elements to leave in the array
 
#### using sets to get uniques
 - I found a handy little data type called 'sets' and I used its properties to make unique arrays from dupe arrays. I'm not sure if there was another way to do this that was possibly easier, but at least I learned something!

#### node require error
 - in books.js on line 40, I spread a function that returns an object. There is another function in accounts.js that I could have imported and used to get this object. However, this resulted in errors because books and accounts required each other. Node did not like require statements pointing at each other so I had to drop one of them.

 #### using .forEach() instead of .reduce() in some cases
  - I found that .forEach() helped me write some functions a little cleaner than .reduce() would have, so in some cases .reduce() is not used where it could be. If I am wrong, please let me know!
