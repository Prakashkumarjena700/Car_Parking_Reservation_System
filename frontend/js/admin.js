const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

const adminDataFromLs = JSON.parse(localStorage.getItem('loggedInUser'))

if (!adminDataFromLs || adminDataFromLs.user.role !== 'admin') {
    window.location.href = 'login.html'
}

const adminPic = document.getElementById('adminPic')
adminPic.src = adminDataFromLs.user.avatar

const profile = document.getElementById('profile')
const requests = document.getElementById('requests')
const slots = document.getElementById('slots')
const users = document.getElementById('users')

profile.style.display = 'flex'
requests.style.display = 'none'
slots.style.display = 'none'
users.style.display = 'none'

const showResultForAdmin = (option) => {
    if (option == 'profile') {
        profile.style.display = 'flex'
        requests.style.display = 'none'
        slots.style.display = 'none'
        users.style.display = 'none'
    } else if (option === 'requests') {
        profile.style.display = 'none'
        requests.style.display = 'flex'
        slots.style.display = 'none'
        users.style.display = 'none'
    } else if (option === 'slots') {
        profile.style.display = 'none'
        requests.style.display = 'none'
        slots.style.display = 'flex'
        users.style.display = 'none'
    } else if (option === 'users') {
        profile.style.display = 'none'
        requests.style.display = 'none'
        slots.style.display = 'none'
        users.style.display = 'flex'
    }
}

const Logout = () => {
    localStorage.removeItem('loggedInUser')
    alert('Logout successful')
    window.location.href = 'login.html'
}

// const CountAllRequests = async () => {
//     await fetch(`${baseApi}/`)
// }