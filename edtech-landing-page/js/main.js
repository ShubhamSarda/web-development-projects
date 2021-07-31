var x = document.getElementById("m-navbar");
x.style.display = "none";

function show(){
    var x = document.getElementById("m-navbar");
    if (x.style.display === "none"){
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}