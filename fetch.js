
var result = '<h2> News Headlines </h2>'
//var searchButton = document.getElementById('fid');
//console.log(searchButton[0].id)
document.getElementById('getJSON').addEventListener('click', checkboxfunc);
function getJSON(url,search) {
    //console.log('::::::',data.articles.length);
    console.log(url);
    fetch(url)
        .then(res => res.json())
.then(data =>{
    if(data.articles.length==0)
    {
        //console.log('No results found in selected channels'!!);

      url2=`https://newsapi.org/v2/everything?q=${search}&apiKey=6f61ae9cfa1147a2b62610655e0b10bf`;
        console.log(url2);
        //url = 'https://newsapi.org/v2/everything?q=${search}&apiKey=6f61ae9cfa1147a2b62610655e0b10bf'
        document.getElementById('result2').innerHTML = '<h1>No results found in selected channels!!</h1>'+'<button onclick="getJSON2(url2)">See from more sources</button>';
    }
    else
    { document.getElementById('result2').innerHTML = 'Results Found::' + data.articles.length;
        for(i=0;i<data.articles.length;i++){
            result += `<a href='${data.articles[i].url}'target=_blank ><h1>${data.articles[i].title}</h1><img src=${data.articles[i].urlToImage} alt='image not found' width="150px" height="100px"/><p>${data.articles[i].description}</p> `;
        }
        setData(result)}

   }).catch(error => console.log(error))
}
function getJSON2(url2) {
    console.log('getJSON2::url::',url2);
    fetch(url2)
        .then(res => res.json())
.then(data =>{
     document.getElementById('result2').innerHTML = 'Results Found::' + data.articles.length;
        for(i=0;i<data.articles.length;i++){
            result += `<a href='${data.articles[i].url}'target=_blank ><h1>${data.articles[i].title}</h1><img src=${data.articles[i].urlToImage} alt='image not found' width="150px" height="100px"/><p>${data.articles[i].description}</p> `;
        }
        setData(result)

}).catch(error => console.log(error))
}

function setData(res){
    document.getElementById('result').innerHTML = res;
    result=''
}



function checkboxfunc() {

    var charr = [];
    //var inputElems = document.getElementsByTagName("input");
    var inputElems = document.getElementsByName('news');
    var search = document.getElementById('search_key').value;
    //console.log(search);
    var i = 0;
    for (j = 0; j < inputElems.length; j++) {
        if (inputElems[j].type == "checkbox" && inputElems[j].checked == true) {
            charr[i] = inputElems[j].value;
             i++;
        }
    }
    if (!search) {
        alert("Data not entered!!")
    }
    else if (charr.length == 0) {
        alert("Select any Channel");
    }
    else {
        //document.getElementById('search_key').value = "";
        console.log('::::',charr);

        charr.forEach(key => {
            url=`https://newsapi.org/v2/everything?sources=${key}&q=${search}&apiKey=6f61ae9cfa1147a2b62610655e0b10bf`;
        getJSON(url,search);
    })
    }


}