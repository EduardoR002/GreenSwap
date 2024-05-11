//Navigation Script Topper
    function navigationTab()
    {
        var navbar_div = document.getElementById('navigation');
        fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
        navbar_div.innerHTML = html
        });

 
    }