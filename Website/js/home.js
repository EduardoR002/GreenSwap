//Navigation Script Topper
    function teste()
    {
        fetch('navigation.html')
        .then(response => response.text())
        .then(html => {
        document.getElementById('navigation').innerHTML = html;
        });
    }