function test() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("adress").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('description', "Bom rapaz");
    formData.append('photo', "ee");
    
    

    fetch('http://localhost:3000/users/create', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerButton").addEventListener("click", test);
});