var x = document.getElementById("navbar-mobile");
x.style.display = "none";

function myFunction() {
    var x = document.getElementById("navbar-mobile");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }