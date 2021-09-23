var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

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
    let dict={};
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
    return str.reduce((res,item)=>typeLetters.includes(item)?res+=item:res,'');
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

function getBaseForms(tokenized){
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
    return baseForms;
}

function filterBaseForms(baseForms){
    for(let key in baseForms) {
        if (baseForms[key].length <= 1) {
            delete baseForms[key];
        }
        else{
            baseForms[key]= unique(baseForms[key]);
            baseForms[key].sort();
        }
    }
    return baseForms;
}

function getResultString(resultString,baseForms){
    let color=0;
    for(let key in baseForms){
        console.log(baseForms[key]);
        for(let i=0;i<baseForms[key].length;i++){
            let re=new RegExp('([^A-Za-zА-Яа-яёЁ]+|^)('+baseForms[key][i]+')(?![A-Za-zА-Яа-яёЁ])','gi');
            resultString=resultString.replace(re,`$1<span class=\"color_${color}\">$2</span>`);
        }
        color+=1;
    }
    return resultString;
}

var button=document.getElementById('clear');
var text=document.getElementById('text');

button.addEventListener('click',()=>{
    text.value="";
    document.querySelector('#res').innerText='';
    let lang=document.getElementById('lang');
    for (var i = 0, l = lang.length; i < l; i++) {
        lang[i].selected = lang[i].defaultSelected;
    }
});

text.addEventListener('input',()=>{
    document.querySelector('#res').innerText='';
    let str=text.value.toLowerCase().split('');
    let sGl='БВГДЖЗЙКЛМНПРСТФХЦЧШЩЪЬBCDFGHJKLMNPQRSTVWXYZ'.toLowerCase();
    let gl='АОЭЕИЫУЁЮЯAEIOUY'.toLowerCase();
    let countGl=countLetters(str,gl);
    let countSGl=countLetters(str,sGl);
    let countAllLetters=countGl.length+countSGl.length;
    let tokens = text.value.toLowerCase();
    let tokenized=tokenizer.tokenize(tokens);
    let frequency=countElements(tokenized);
    let mostPopular=frequencyThree(frequency);
    let baseForms=getBaseForms(tokenized);
    baseForms=filterBaseForms(baseForms);
    let resultString=getResultString(text.value,baseForms);
    let output='<h3>Результат анализа:</h3>';
    output+='<p>'+resultString+'</p>';
    output+='<p>количество гласных: '+ countGl.length+'</p>';
    output+='<p>количество согласных: '+ countSGl.length+'</p>';
    output+='<p>Количество слов: '+tokenized.length+'</p>';
    output+='<p>Количество символов: '+text.value.length+'</p>';
    output+='<p>Общее количество букв: '+ countAllLetters+'</p>';
    output+='<p>Топ-3 слов: '+mostPopular;
    document.getElementById('res').insertAdjacentHTML('beforeend',output);
});