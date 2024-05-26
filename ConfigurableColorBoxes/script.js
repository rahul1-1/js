const boxConfig = [
  { color: "red", width: "33.33%" },
  { color: "green", width: "33.33%" },
  { color: "blue", width: "33.33%" },
  { color: "yellow", width: "50%" },
  { color: "orange", width: "50%" },
  { color: "purple", width: "70%" },
  { color: "pink", width: "30%" },
  { color: "black", width: "40%" },
  { color: "gray", width: "20%" },
  { color: "brown", width: "40%" },
];

let availableWidth = 100;
const mainContainer = document.querySelector(".main");
const container = document.createElement("div");
const form = document.querySelector("form");
const inputColor = document.querySelector("#favcolor");
const inputWidth = document.querySelector("#width");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (inputColor.value === "" || inputWidth.value === "") {
    return;
  } else {

    let currentWidth = 0;
    if(availableWidth == 0){
        currentWidth = inputWidth.value;
    }
    else if(inputWidth.value >= availableWidth){
        currentWidth = availableWidth
    }else{
        currentWidth = inputWidth.value
    }
    availableWidth = availableWidth - inputWidth.value
    console.log("availableWidth ", availableWidth)
    console.log("currentWidth ", currentWidth)
    if(availableWidth<0){
        availableWidth = 0;
    }
    boxConfig.push({ color: inputColor.value, width: currentWidth + "%" });
    container.innerHTML = "";
    inputWidth.value = ""
    render();
  }
});
const render = () => {
  container.className = "container";

  boxConfig.forEach((config, index) => {
    const box = document.createElement("div");
    box.className = "box";
    box.style.backgroundColor = config.color;
    box.style.width = config.width;
    container.appendChild(box);
  });
  mainContainer.appendChild(container);

  container.addEventListener("click", (event) => {
    const clickElement = event.target;

    if (clickElement.classList.contains("box")) {
      const index = Array.from(container.children).indexOf(clickElement);
      const config = boxConfig[index];
      alert(`Color of box ${index + 1} is ${config.color}`);
    }
  });
};

render();
