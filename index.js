// в консоли node ./index выдает нужный результат
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has fleas."));
// [ 'your', 'dog', 'has', 'fleas' ]

console.log(natural.PorterStemmer.stem("chickenable"));
//chicken
var button=document.getElementById('submit');
button.addEventListener('click',()=> {
    var str = text.value.toLowerCase();
    console.log(tokenizer.tokenize(str));
    document.getElementById('res').innerText=tokenizer.tokenize(str);
});