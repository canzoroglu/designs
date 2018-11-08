let span = document.querySelector("span");
let  drawer = document.querySelector("#drawer");
span.addEventListener("click", e => {
  drawer.classList.toggle("open");
  e.stopPropagation();
});
