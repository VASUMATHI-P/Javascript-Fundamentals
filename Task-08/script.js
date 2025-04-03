const handleRouteChange = () => {
  const hash = window.location.hash || "#home";
  const sections = document.querySelectorAll(".content > div");

  sections.forEach((section) => {
    section.style.display = "none";
  })

  const activeSection = document.querySelector(hash);
  if( activeSection ) {
    activeSection.style.display = "grid";
  }

}

window.addEventListener("hashchange", handleRouteChange);
window.addEventListener("load", handleRouteChange);