
function getOrder(){
    var complete = false;
    var onumber = document.getElementById("utilityinput").value;
    const Http = new XMLHttpRequest();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const category = urlParams.get('category');
    Http.open("GET", "https://script.google.com/macros/s/AKfycbxbjScQ8cj9umjGc10XTEZKqR_jUBO4Xz-caAO9GsS0jiMxqmkNtCULFw7Mn3-svO8dYQ/exec?requesttype=utilityrequest&ordernumber="+onumber);
    Http.send();
    var responsejson;
    Http.onreadystatechange = (e) => {
        if(complete==false){
            var response=Http.responseText;
            responsejson=JSON.parse(response);
            buildTable(response);
            complete=true;
        }

    }

}

function buildTable(response){
    if(document.getElementById("resultsbox")!=null){
        document.getElementById("resultsbox").remove();
    }
    response = JSON.parse(response);
    console.log(response);
    var maindiv = document.getElementById("mainbox");
    var mydiv = document.createElement("div");
    mydiv.className = "resultsbox";
    mydiv.id = "resultsbox";
    maindiv.appendChild(mydiv);

    var order = document.createElement("h3");
    order.className = "utilityresponsetext";
    order.innerText = "Order: #" + response[0]['number'];
    mydiv.appendChild(order);

    var name = document.createElement("h3");
    name.className = "utilityresponsetext";
    name.innerText = "Name: " + response[0]['name'];
    mydiv.appendChild(name);

    var email = document.createElement("h3");
    email.className = "utilityresponsetext";
    email.innerText = "Email: " + response[0]['email'];
    mydiv.appendChild(email);

    var comments = document.createElement("h3");
    comments.className = "utilityresponsetext";
    comments.innerText = "Comments: " + response[0]['comments'];
    mydiv.appendChild(comments);

    var status = document.createElement("h3");
    status.className = "utilityresponsetext";
    status.innerText = "Status: " + response[0]['status'];
    mydiv.appendChild(status);

    var reserved = document.createElement("h3");
    reserved.className = "utilityresponsetext";
    reserved.innerText = "Time reserved at: " + response[0]['placedon'];
    mydiv.appendChild(reserved);

    var checkedout = document.createElement("h3");
    checkedout.className = "utilityresponsetext";
    checkedout.innerText = "Time checked-out at: " + response[0]['checkedout'];
    mydiv.appendChild(checkedout);

    var checkedin = document.createElement("h3");
    checkedin.className = "utilityresponsetext";
    checkedin.innerText = "Time checked-in at: " + response[0]['returnedon'];
    mydiv.appendChild(checkedin);

    var items = document.createElement("h3");
    items.className = "utilityresponsetext";
    items.innerText = "Items:";
    mydiv.appendChild(items);

    var itemsbox = document.createElement("div");
    itemsbox.className = "resultsboxsmall";
    mydiv.appendChild(itemsbox);

    var itemlist = JSON.parse(response[0]['items']);
    console.log(itemlist);

    for(var i = 0; i<itemlist.length; i++){
        console.log(itemlist[i]['id']);
        var item = document.createElement("h3");
        item.className = "utilityresponsetext";
        item.innerText = "- #"+itemlist[i]['id'];
        itemsbox.appendChild(item);
    }

}