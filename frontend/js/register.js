const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

const loading = document.getElementById('loading')
loading.style.display = 'none'

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
        loading.style.display = 'flex'
        await fetch(`${baseApi}/user/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerObj)
        }).then(res => res.json())
            .then(res => {
                loading.style.display = 'none'
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
                loading.style.display = 'none'
                alert('Something went wrong')
                console.log(err)
            })
    }

}

const gotohome = () => {
    window.location.href = '../index.html'
}

const gotoDashboard = () => {
    let logger = JSON.parse(localStorage.getItem('loggedInUser')) || { user: 'user' }

    const role = logger.user.role

    if (role == 'admin') {
        window.location.href = './adminDashboard.html'
    } else {
        window.location.href = './userDashboard.html'
    }
}