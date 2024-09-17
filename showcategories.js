var pagebuilt=false
function request() {
    const Http = new XMLHttpRequest();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    Http.open("GET", "https://script.google.com/macros/s/AKfycbxR26Lh0LuEjJ6D4_-eoabwb3BRg9-6lUXDBu3oM13q9k5dx996g8y0Jo_GuSHCNY78AQ/exec?requesttype=categoryrequest");
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