//Navigation Script Topper
    function navigationTab()
    {
        var navbar_div = document.getElementById('navigation');
        fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
        navbar_div.innerHTML = html
        });

        //Space OUT of the bar that is occupied by the icon
        navbar_div.style.marginBottom = "30px";
    }