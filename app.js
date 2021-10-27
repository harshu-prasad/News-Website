document.getElementsByClassName('fetchNewsBtn')[0].addEventListener('click',()=>{
    Array.from(document.getElementsByClassName('newsCategoryCheckLabels')).forEach((element)=>{
        if (element.checked){
            let checkBoxURLValue = element.id;
            console.log(checkBoxURLValue);
            fetchNews(checkBoxURLValue);
        }
    })
})

function fetchNews(urlValue){
    let xhr = new XMLHttpRequest();
    console.log("xhr.open()");
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?${urlValue}&lang=en&apiKey=f673bc764a96415487d0893690185ccd` ,true);

    console.log(`https://newsapi.org/v2/top-headlines?${urlValue}&lang=en&apiKey=f673bc764a96415487d0893690185ccd`);

    xhr.onprogress = ()=>{
        document.getElementsByClassName('newsCardParentDiv')[0].innerHTML = `
        <h1 class="text-center" style="font-family: 'Noto Sans', sans-serif;">Fetching News , Please Wait</h1>
        <div class="spinner-border" role="status">
            <span class="visually-hidden" >Loading...</span>
        </div>
        `;
    }

    xhr.onload = ()=>{
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            let articles = json.articles;
            let str = '';
            articles.forEach(function(element){
                console.log(element);
                str += `
                <div class="card my-3" style="width: 74vw;">
                <div class="card-body">
                    <img src="${element['urlToImage']}" class="card-img-top" style="height: 64vh;">
                    <h2 class="card-title" style="font-family: 'Noto Sans', sans-serif;">${element['title']}</h2>
                    <h4  style="font-family: 'Noto Sans', sans-serif;">
                        Description : <br>
                        ${element['description']}
                    </h4>
                    <p class="card-text" style="font-family: 'Noto Sans', sans-serif;" >${element['content']}</p>
                    <a href="${element['url']}" class="btn btn-primary" target="_blank"> Go to Website</a>
                    </div>
                </div>
                `;
            })
        

            document.getElementsByClassName('newsCardParentDiv')[0].innerHTML = str;
        }

        else{
            document.getElementsByClassName('newsCardParentDiv')[0].innerHTML = `
            <h1 class="text-center" style="font-family: 'Noto Sans', sans-serif;">Sorry some Error Occoured fetching News</h1>
            `;
        }
    }

    xhr.send()

}