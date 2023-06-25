const baseApi = 'http://localhost:4500'

const register = async () => {
    event.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const gender = document.getElementById('gender').value
    const password = document.getElementById('password').value
    const dob = document.getElementById('dob').value
    const phone = document.getElementById('phone').value
    const city = document.getElementById('city').value
    const country = document.getElementById('country').value
    const drivingExperience = Number(document.getElementById('drivingExperience').value)
    const insuranceNumber = document.getElementById('insuranceNumber').value

    const registerObj = {
        name,
        email,
        gender,
        password,
        role: 'user',
        avatar: 'https://img.freepik.com/free-icon/user_318-792327.jpg?w=360',
        dob,
        phone,
        city,
        country,
        drivingExperience,
        insuranceNumber
    }

    if (name == '' || email == '' || gender == '' || password == '' || dob == '' || phone == '' || city == '' || country == '' || drivingExperience == '' || insuranceNumber == '') {
        alert('Please fill all the details')
    } else {
        await fetch(`${baseApi}/user/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerObj)
        }).then(res => res.json())
            .then(res => {
                if (res.sucess) {
                    alert('Register successful')
                    window.location.href = './login.html'
                } else if (res.msg == 'Already have an account please login') {
                    alert('Already have an account please login')
                    window.location.href = './login.html'
                }
                console.log(res)
            })
            .catch(err => {
                alert('Something went wrong')
                console.log(err)
            })
    }
}