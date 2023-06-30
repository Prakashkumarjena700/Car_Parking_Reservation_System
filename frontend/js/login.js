const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

const loading = document.getElementById('loading')
loading.style.display = 'none'

const login = async () => {
    event.preventDefault()


    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const loginObj = {
        email,
        password
    }

    if (email == '' || password == '') {
        alert('Please fill all the details')
    } else {
        loading.style.display = 'flex'
        await fetch(`${baseApi}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginObj)
        }).then(res => res.json())
            .then(res => {
                loading.style.display = 'none'
                if (res.sucess && res.user.role === 'admin') {
                    alert('Login successful')
                    window.location.href = './adminDashboard.html'
                    localStorage.setItem('loggedInUser', JSON.stringify(res))
                } else if (res.sucess) {
                    alert('Login successful')
                    window.location.href = './userDashboard.html'
                    localStorage.setItem('loggedInUser', JSON.stringify(res))
                } else {
                    alert(res.msg)
                }
                console.log(res)
            })
            .catch(err => {
                loading.style.display = 'none'
                console.log(err)
                alert('Something went wrong')

            })
    }
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

const gotohome = () => {
    window.location.href = '../index.html'
}

const showPassword = () => {
    const showPass = document.getElementById('password')

    const showBtn = document.getElementById('showBtn')

    showPass.setAttribute('type', 'text')
    // showBtn.innerText = 'Hide'

}