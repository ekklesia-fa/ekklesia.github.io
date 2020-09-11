// sembunyikan loader jika documen siap
$(document).ready(hideLoader);

loadTemplate('nav');

// set title page
setTitlePage();

// load ayat
setAyat()
setInterval(setAyat, 60000);











/////////////////////////
function w3_goto(e){
    let nState = history.state;
    // console.log(e);
    if(nState == null){
        history.pushState(null, null, e);
    } else {
        history.replaceState(null, null, e);
    }
    // sembunyikan sidebar
    w3_close('mySidebar');
    // set title page
    setTitlePage()

    renderPage(e);
}
/////////////////////////


/////////////////////////
function renderPage(a){
    let flag = true;
    let str = a.slice(1,a.length);
    // nilai params
    let params = str.split("/");
    // nilai method
    let method = params.shift();
    if(method==""){
        document.getElementById("landing").style.display = "block";
        flag = false;
    } else {
        document.getElementById("landing").style.display = "none";
    };
    // console.log(params);

    // jika false berarti muat landing / beranda
    if(flag){
        //get template
        $.get("./source/template/page-"+method+".html", function(tpl){
            let template = $(tpl).filter("#template-"+method).html();
            // console.log(template);
            // get data
            $.getJSON("./source/json/page-"+method+".json", function(data){
                let rendered = Mustache.render(template, data);
                
                // set nilai ke #target
                document.getElementById("content").innerHTML = rendered;
            });
        });
    }

}
/////////////////////////


/////////////////////////
// function tampilkan loader
function showLoader(){
    document.getElementById('loader').style.opacity = "1";
    setTimeout(() => {
        document.getElementById('loader').style.display = "block";
    }, 1000);
}
// function sembunyikan loader
function hideLoader(){
    document.getElementById('loader').style.opacity = "0";
    setTimeout(() => {
        document.getElementById('loader').style.display = "none";
    }, 1000);
}
/////////////////////////


/////////////////////////
function loadTemplate(target){
    // get template
    let template = document.getElementById("template-"+target).innerHTML;

    // get data
    $.getJSON("./source/json/data-"+target+".json", function(data){
        let rendered = Mustache.render(template, data);
    
        // set nilai ke #target
        document.getElementById(target).innerHTML = rendered;
    });
    
    
}
/////////////////////////


/////////////////////////
function setTitlePage(){
    let str1 = getLocSearch();
    let str2 = str1.slice(1, title.length);
    let arrTitle = str2.split("/");
    //ambil method
    let method = arrTitle.shift();
    let cMethod = method.toUpperCase();
    
    let params = []
    //ambil params
    if(arrTitle == ""){
        params = "";
    } else {
        let param1 = arrTitle.shift();
        let param2 = arrTitle.shift();
        params[param1] = param2;
    }
    // console.log(params);
    $("#navbar #title").html(cMethod);

}
/////////////////////////


/////////////////////////
function getLocSearch(){
    let wSearch = window.location.search;
    if(wSearch == "") wSearch = "?beranda";
    return wSearch;
}
/////////////////////////


/////////////////////////
function w3_open(a){
    document.getElementById(a).style.display = "block";
}
function w3_close(a){
    document.getElementById(a).style.display = "none";
}
/////////////////////////


/////////////////////////
function setAyat(){
    // tampilkan #loading.ayat
    $("#loading.ayat").css({display:"block"});

    // get template
    let template = document.getElementById("template-ayat").innerHTML;

    // get data
    $.getJSON("./source/json/data-ayat.json", json);
    function json(e){
        // random id
        let randId = Math.floor(Math.random()*e.result.length);
        // console.log(e.result[num]);
        let data = e.result[randId];
        let rendered = Mustache.render(template, data);

        setTimeout(() => {
            // set nilai ke #ayat
            document.getElementById("ayat").innerHTML = rendered;
    
            //sembunyikan #loading.ayat
            $("#loading.ayat").css({display:"none"});
        }, 500);
    }
}
/////////////////////////

