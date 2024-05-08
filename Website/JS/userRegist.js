function test() {
    var name = document.getElementById("name").value.toString();
    var address = document.getElementById("adress").value.toString();
    var phone = document.getElementById("phone").value.toString();
    var email = document.getElementById("email").value.toString();
    var password = document.getElementById("password").value.toString();
    var description;
    var photo;


    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('description', 'aNAL');
    formData.append('photo', 'aNALDD');
    
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(address);
    console.log(password);
    console.log(description);
    console.log(photo);
    

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