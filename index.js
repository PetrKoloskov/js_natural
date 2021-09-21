// в консоли node ./index выдает нужный результат
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has fleas."));
// [ 'your', 'dog', 'has', 'fleas' ]

console.log(natural.PorterStemmer.stem("chickenable"));
//chicken