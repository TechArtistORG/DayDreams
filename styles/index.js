// POPUP FUNCTION
function showProduct(name,price,img,desc){
  document.getElementById("popup-name").innerHTML = name;
  document.getElementById("popup-price").innerHTML = price;
  document.getElementById("popup-img").src = img;
  document.getElementById("popup-desc").innerHTML = desc;

  // AUTO WHATSAPP REDIRECT LINK (CHANGE NUMBER)
  let phone = "91XXXXXXXXXX"; // ← YOUR NUMBER HERE (NO + SIGN)
  let message = `Hello, I want to order ${name} for ${price}`;

  document.getElementById("whatsapp-link").href =
  "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  document.getElementById("popup-box").style.display="block";
  document.getElementById("overlay").style.display="block";
}

function closePopup(){
  document.getElementById("popup-box").style.display="none";
  document.getElementById("overlay").style.display="none";
}

