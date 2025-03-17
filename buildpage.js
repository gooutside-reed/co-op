var pagebuilt=false
function request() {
    const Http = new XMLHttpRequest();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    console.log(category);
    Http.open("GET", "https://script.google.com/macros/s/AKfycbwQsyEf8aUFR19oiQM75mJzPxn_YmBm08AkueqzmMIdZZ_u3QjSqK9tvWgSg14ejRaadg/exec?requesttype=itemsrequest&category="+category);
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
    // var fakejson="[{\"id\":\"TS12345\",\"name\":\"Test Item 1\",\"quantity\":10,\"total_quantity\":15,\"category\":\"Test\",\"imageurl\":\"https://m.media-amazon.com/images/I/81DaQhY+yRL._AC_UF1000,1000_QL80_.jpg\"},{\"id\":\"TS12344\",\"name\":\"Test Item 2\",\"quantity\":5,\"total_quantity\":10,\"category\":\"Test\",\"imageurl\":\"https://m.media-amazon.com/images/I/81DaQhY+yRL._AC_UF1000,1000_QL80_.jpg\"}]";
    // var responsejson = JSON.parse(fakejson);

    const grid = document.getElementById("grid");
    for (i=0;i<responsejson.length;i++) {
        var newdiv = document.createElement("div");
        newdiv.className = "grid-item";

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

        var quantity = document.createElement("h2");
        quantity.innerText=responsejson[i]['quantity']-responsejson[i]['reserved'] + " / "+responsejson[i]['total_quantity'] +" available.";
        quantity.className="divtextboxquantity"
        bottomdiv.appendChild(quantity);

        var descdiv = document.createElement("div");
        descdiv.className='descriptionbox';
        bottomdiv.appendChild(descdiv);

        var description = document.createElement("text");
        description.innerText=responsejson[i]['description'];
        description.className="itemdescription"
        descdiv.appendChild(description);

        var button = document.createElement("button");
        button.innerText="Add to Cart";
        button.className="cartbutton";
        button.setAttribute("onclick", "addItemToCart('"+responsejson[i]['id']+"','"+responsejson[i]['name']+"',"+(responsejson[i]['quantity']-responsejson[i]['reserved'])+","+responsejson[i]['total_quantity']+")");
        bottomdiv.appendChild(button);

        var idnum = document.createElement("text");
        idnum.innerText="Item ID #"+responsejson[i]['id'];
        idnum.className="itemdescription"
        newdiv.appendChild(idnum);



        grid.appendChild(newdiv);
    }
}

function addItemToCart(id, name, quantity, maxquantity){
    var temp = document.cookie;
    var tempjson;
    if(quantity==0){
        alert("You cannot reserve more items than are remaining.");
        return
    }
    if(temp==""){
        document.cookie=JSON.stringify([{id,name,quant:1}]);
        updateCartCount();
        return
    }else{
        tempjson= JSON.parse(temp);
        console.log(tempjson);
        for(i=0; i<tempjson.length;i++){
            if(tempjson[i]['id']==id){
                if(tempjson[i]['quant']<=quantity-1){
                    tempjson[i]['quant']+=1;
                    document.cookie=JSON.stringify(tempjson);
                    updateCartCount();
                    return
                }else{
                    alert("You cannot reserve more items than are remaining.");
                    return
                }
            }
        }
        tempjson.push({id, name, quant:1});
        document.cookie=JSON.stringify(tempjson);
        updateCartCount();
        // console.log("Previously existing cookies exist.")

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