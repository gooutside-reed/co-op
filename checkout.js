var checkedout = false;
function docheckout(){
    var ck = document.cookie;
    var url= "https://script.google.com/macros/s/AKfycbz3LWtcS6LT1xuq6_xawepVwO46aOmxgvTr4bsf8Ts1yuP_mdf0v6bvdtVrGCVy70JEXA/exec?requesttype=checkout";
    if(document.getElementById("name").value !=""){
        url+="&name="+document.getElementById("name").value;
    }else{
        alert("No Name Provided!");
        return
    }
    if(document.getElementById("email").value !=""){
        url+="&email="+document.getElementById("email").value;
    }else{
        alert("No Email Provided!");
        return
    }

    url+="&comments="+document.getElementById("comments").value;

    if(document.getElementById("signature").value !=""){
        url+="&signature="+document.getElementById("signature").value;
    }else{
        alert("No Signature Provided!");
        return
    }

    if(ck!=""){
        var ckjson= JSON.parse(ck);
        for(i=0;i<ckjson.length;i++){
            for(n=0;n<ckjson[i]["quant"];n++){
                url+="&item="+ckjson[i]["id"];
            }
        }
    }else{
        alert("No items in Cart!");
    }
    console.log(url);
    orderLoading();
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        var response=Http.responseText;
        var restext = response;
        if(checkedout==false && restext != ""){
            checkedout = true;
            successfulOrder(restext);
        }
    }

}

function orderLoading(){
    document.getElementById("checkouttitle").remove();
    document.getElementById("checkouttitle4").remove();
    document.getElementById("listcontainer").remove();
    document.getElementById("checkoutcontainer").remove();
    var mydiv = document.getElementById("body");
    var loadring = document.createElement("div");
    loadring.className="lds-ring";
    loadring.id = "ldsring";
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    loadring.appendChild(div1);
    loadring.appendChild(div2);
    loadring.appendChild(div3);
    loadring.appendChild(div4);
    mydiv.appendChild(loadring);
}

function successfulOrder(responsetext){
    document.getElementById("ldsring").remove();
    var body = document.getElementById("body");

    var mydiv = document.createElement("div");
    mydiv.className = "checkoutcontainer";
    mydiv.id = "checkoutcontainer";
    body.appendChild(mydiv);

    var responseText = document.createElement("h1");
    responseText.className = "responsetext";
    responseText.innerText = responsetext;
    mydiv.appendChild(responseText);

    var responseDisclaimer = document.createElement("h1");
    responseDisclaimer.className = "responsedisclaimer";
    responseDisclaimer.innerText = "Please note your order number, this is necessary for final checkout and check-in at the co-op.";
    mydiv.appendChild(responseDisclaimer);
    document.cookie = JSON.stringify([]);
    updateCartCount();
}

function buildcheckout(){
    updateCartCount();

    var ck = document.cookie;
    const lem = document.getElementById("itemslist");
    if(ck!=="[]"){
        console.log(ck);
        var ckjson= JSON.parse(ck);
        for(i=0; i<ckjson.length;i++){
            if(ckjson[i]['name']!=undefined){
                var listelem = document.createElement("li");
                listelem.innerText = ckjson[i]['quant'] + "X "+ ckjson[i]['name'];
                listelem.className="checkoutlistelement";
                listelem.setAttribute("onclick", "removeSingleItem('"+ckjson[i]['id']+"')");
                lem.appendChild(listelem);
            }
        }
    }else{
        var listelem = document.createElement("h2");
        listelem.innerText = "No Items in Cart";
        listelem.className="checkoutlistelementnone";
        lem.appendChild(listelem);
    }



    var comments = document.getElementById("comments");
    comments.addEventListener('keydown', function (event){
        if(event.key=="&"){
            event.preventDefault();
            return
        }
    })
}

function cancelorder(){
    document.cookie = JSON.stringify([]);
    window.location.reload();
}

function removeSingleItem(IDToRemove){
    var ck = JSON.parse(document.cookie);
    var newjsonlist = [];
    for(var i = 0; i<ck.length;i++){
        if(ck[i]['id']==IDToRemove){
            console.log(ck[i]);
        }else{
            newjsonlist.push(ck[i]);
        }
    }
    document.cookie = JSON.stringify(newjsonlist);
    window.location.reload();
}

function updateCartCount(){
    var totalquantity=0;
    var ck = document.cookie;
    if(ck!==""){
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