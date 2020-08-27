function addLayer() {
  let layer = document.createElement("div");
  layer.classList.add("layer");
  document.body.appendChild(layer);
}

function closeLayer() {
  document.querySelector(".layer").remove();
  document.querySelector(".messageBox").remove();
}

function makeCloseButton() {
  let closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-danger");
  closeButton.innerText = "J'ai compris";
  closeButton.addEventListener("click", closeLayer);
  return closeButton;
}

function makeWarning(text) {
  let div = document.createElement("div");
  let title = document.createElement("h2");
  title.innerText = "Information Importante";
  let p = document.createElement("p");
  p.innerText = text;
  div.append(title, p);
  return div;
}

function addMessageBox(text) {
  let messageBox = document.createElement("div");
  messageBox.classList.add("messageBox");
  let warning = makeWarning(text);
  let closeButton = makeCloseButton();
  messageBox.append(warning, closeButton);
  document.body.appendChild(messageBox);7
  messageBox.style.left = `${((window.innerWidth - messageBox.clientWidth)/2)}px`;
  messageBox.style.top = "10vh";
}

addLayer();
httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      addMessageBox(httpRequest.responseText);
    }
    else {
      addMessageBox("Une erreur est survenue, fermez ce message sans en tenir-compte");
    }
  }
};
httpRequest.open('GET', 'data/info.txt', true);
httpRequest.send();
