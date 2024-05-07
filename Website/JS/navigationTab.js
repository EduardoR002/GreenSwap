//Navigation Script Topper
    function navigationTab()
    {
        fetch('navigation.html')
        .then(response => response.text())
        .then(html => {
        document.getElementById('navigation').innerHTML = html;
        });
    }