var nav = false;
function setNav() {
  let sideNav = document.getElementById("sideNav");
  nav = !nav;
  if (nav) {
    sideNav.classList.remove("left-[-200%]");
    sideNav.classList.add("left-0");
  } else {
    sideNav.classList.remove("left-0");
    sideNav.classList.add("left-[-200%]");
  }
}
function chkNav() {
  let px = window.scrollY;
  let mainNav = document.getElementById("nav");
  px > 90
    ? mainNav.classList.remove("shadow-lg", "shadow-gray-400")
    : mainNav.classList.add("shadow-lg", "shadow-gray-400");
}
window.onload = () => {
  chkNav();
  window.addEventListener("scroll", chkNav);
};
