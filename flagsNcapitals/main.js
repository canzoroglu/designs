let navItemLink = document.querySelectorAll("li.nav-item a");
let collapsedMenu = document.querySelector("nav div.collapse");
navItemLink.forEach(item => {
  item.addEventListener("click", () => collapsedMenu.classList.toggle("show"));
});
