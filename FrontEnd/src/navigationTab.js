function navigationTab() {
    document.addEventListener('DOMContentLoaded', () => {
      var navbar_div = document.getElementById('navigation');
      if (navbar_div) {
        fetch('navbar.html')
          .then(response => response.text())
          .then(html => {
            navbar_div.innerHTML = html;
          });
        navbar_div.style.marginBottom = "30px";
      }
    });
  }
  
  export default navigationTab;