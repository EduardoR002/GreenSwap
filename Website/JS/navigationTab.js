//Navigation Script Topper
    function navigationTab()
    {
        fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
        document.getElementById('navigation').innerHTML = html;
        });
    }