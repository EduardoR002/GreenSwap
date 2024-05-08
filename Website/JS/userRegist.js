function test() {
    var name = document.getElementById("name").value;
    var birthDate = document.getElementById("birthDate").value;
    var address = document.getElementById("adress").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var formData = new FormData();
    formData.append('name', name);
    formData.append('birthDate', birthDate);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);

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