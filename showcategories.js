var pagebuilt=false
function request() {
    const Http = new XMLHttpRequest();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    Http.open("GET", "https://script.google.com/macros/s/AKfycbxbjScQ8cj9umjGc10XTEZKqR_jUBO4Xz-caAO9GsS0jiMxqmkNtCULFw7Mn3-svO8dYQ/exec?requesttype=categoryrequest");
    Http.send();
    var responsejson;
    Http.onreadystatechange = (e) => {
        var response=Http.responseText;
        responsejson=JSON.parse(response);
        if(pagebuilt==false) {
            buildpage(responsejson);
            console.log(responsejson);
        }
    }
}

function buildpage(responsejson){
    updateCartCount();
    pagebuilt=true;
    loadring = document.getElementById("loadring");
    loadring.remove();

    const grid = document.getElementById("grid");
    for (i=0;i<responsejson.length;i++) {
        var newdiv = document.createElement("div");
        newdiv.className = "grid-item";
        newdiv.setAttribute("onclick", "location.href='catalog.html?category="+responsejson[i]['name']+"'")

        var gridimage = document.createElement("img");
        gridimage.src=responsejson[i]['imageurl'];
        gridimage.className='gridimage';
        newdiv.appendChild(gridimage);

        var bottomdiv = document.createElement("div");
        bottomdiv.className='divtextbox';
        newdiv.appendChild(bottomdiv);

        var divtitle = document.createElement("h1");
        divtitle.innerText=responsejson[i]['name'];
        divtitle.className="divtextboxtitle"
        bottomdiv.appendChild(divtitle);

        grid.appendChild(newdiv);
    }
}

function updateCartCount(){
    var totalquantity=0;
    var ck = document.cookie;
    if(ck!=""){
        var ckjson= JSON.parse(ck);
        for(i=0; i<ckjson.length;i++){
            if(ckjson[i]['quant']!=undefined){
                totalquantity+=ckjson[i]['quant'];
            }
        }
        document.getElementById("checkoutcount").innerText = totalquantity+ " Items in Cart";
    }else{
        document.getElementById("checkoutcount").innerText = totalquantity+ " Items in Cart";
        return
    }
}