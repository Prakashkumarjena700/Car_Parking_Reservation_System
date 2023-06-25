const baseApi = 'http://localhost:4500'


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
        await fetch(`${baseApi}/user/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginObj)
        }).then(res => res.json())
            .then(res => {
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
                console.log(err)
                alert('Something went wrong')
            })
    }
}