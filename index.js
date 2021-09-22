// в консоли node ./index выдает нужный результат
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("your dog has fleas."));
// [ 'your', 'dog', 'has', 'fleas' ]
console.log(natural.PorterStemmerRu.stem("падший"));
console.log(natural.PorterStemmer.stem("chickenable"));
//chicken
/*var button=document.getElementById('submit');

button.addEventListener('click',()=> {
    var str = text.value.toLowerCase();
    console.log(tokenizer.tokenize(str));
    document.getElementById('res').innerText=tokenizer.tokenize(str);
});*/
function unique(arr) {
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}
function countElements(str){
    //str=str.replace(/ /gi,'').trim();
    var dict={};
    for(let i=0;i<str.length;i++){
        if(dict.hasOwnProperty(str[i])){
            dict[str[i]]++;
        }else{
            dict[str[i]]=1;
        }
    }
    return dict;
}
function countLetters(str,typeLetters){

    //var arr='аоэеиыуёюяaeiouy';
    return str.reduce((res,item)=>typeLetters.includes(item)?res+=item:res,'');
}

function countWords(str){

}
function frequencyThree(frequency){
    let sortable = [];
    for (let word in frequency) {
        sortable.push([word, frequency[word]]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    return sortable.slice(0,3);
}
function toBaseForm(word,lang){
    if(lang=="ru"){
        return natural.PorterStemmerRu.stem(word);
    }
    if(lang=="en"){
        return natural.PorterStemmer.stem(word);
    }
}
var button=document.getElementById('submit');
var text=document.getElementById('text');

button.addEventListener('click',()=>{
    console.log(text.value.length);
    let str=text.value.toLowerCase().split('');
    let sGl='БВГДЖЗЙКЛМНПРСТФХЦЧШЩЪЬBCDFGHJKLMNPQRSTVWXYZ'.toLowerCase();
    let gl='АОЭЕИЫУЁЮЯAEIOUY'.toLowerCase();
    let countGl=countLetters(str,gl);
    let countSGl=countLetters(str,sGl);
    let countAllLetters=countGl.length+countSGl.length;
    console.log('Частота символов: ',countElements(text.value));
    console.log('количество гласных: ', countGl.length);
    console.log('количество согласных: ', countSGl.length);
    console.log('Общее количество букв: ', countAllLetters);

    let tokens = text.value.toLowerCase();
    let tokenized=tokenizer.tokenize(tokens);
    console.log('Количество слов: ',tokenized.length);

    let frequency=countElements(tokenized);
    console.log('Частота слов: ',frequency);

    let mostPopular=frequencyThree(frequency);
    console.log('Топ-3 слов: ',mostPopular);

    let baseForms={};
    let lang=document.getElementById('lang').value;
    for(let i=0;i<tokenized.length;i++){
        let word=tokenized[i];
        let wordBaseForm=toBaseForm(word,lang);
        if(!baseForms[wordBaseForm]){
            baseForms[wordBaseForm]=[];
        }
        baseForms[wordBaseForm].push(word);
    }
    for(let key in baseForms) {
        if (baseForms[key].length <= 1) {
            delete baseForms[key];
        }
        else{
            baseForms[key]= unique(baseForms[key]);
        }
    }
    let resultString=text.value;
    for(let key in baseForms){
            console.log(baseForms[key]);
            for(let i=0;i<baseForms[key].length;i++){
                let re=new RegExp(baseForms[key][i],'gi');
                resultString=resultString.replace(re,'<span class="color_i">'+baseForms[key][i]+'</span>')
            }
    }




    //console.log('Однокореные и повторяющиеся слова: ',fres);
    console.log('Базовые формы слов: ', baseForms);
    let output='<h3>Результат анализа:</h3>';
    output+='<p>'+resultString+'</p>';
    output+='<p>количество гласных: '+ countGl.length+'</p>';
    output+='<p>количество согласных: '+ countSGl.length+'</p>';
    output+='<p>Количество слов: '+tokenized.length+'</p>';
    output+='<p>Количество символов: '+text.value.length+'</p>';
    output+='<p>Общее количество букв: '+ countAllLetters+'</p>';
    output+='<p>Топ-3 слов: '+mostPopular;




    document.getElementById('res').insertAdjacentHTML('beforeend',output);
})