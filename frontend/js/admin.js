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
const allRequests = document.getElementById('allRequests')
const filterByStatus = document.getElementById('filterByStatus')
const newPlace = document.getElementById('newPlace')
const newSlotname = document.getElementById('newSlotname')
const MakeNewSectionBtn = document.getElementById('MakeNewSectionBtn')


profile.style.display = 'flex'
requests.style.display = 'none'
slots.style.display = 'none'
users.style.display = 'none'
newPlace.style.display = 'none'
newSlotname.style.display = 'none'
MakeNewSectionBtn.style.display = 'none'

const showResultForAdmin = (option) => {
    if (option == 'profile') {
        profile.style.display = 'flex'
        requests.style.display = 'none'
        slots.style.display = 'none'
        users.style.display = 'none'
    } else if (option === 'requests') {
        profile.style.display = 'none'
        requests.style.display = 'flex'
        requests.style.flexDirection = 'column'
        slots.style.display = 'none'
        users.style.display = 'none'
        getallRequest()
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

const getallRequest = async () => {
    await fetch(`${baseApi}/request`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            appendRequests(res)
        })
        .catch(err => console.log(err))
}

const appendRequests = (arr) => {
    allRequests.innerHTML = null

    arr = arr.reverse()

    arr.map((ele) => {
        const row = document.createElement('div')

        row.innerHTML = `
        <p>${ele.user.slice(1, 5)}...</p>
        <p>${ele.company}</p>
        <p>${ele.type}</p>
        <p>${ele.Vehiclenumber}</p>
        <p>${ele.entryDate}</p>
        <p>${ele.exitDate}</p>
        <p>${ele.place}</p>
        <p>${ele.status}</p>
        <p>Approve</p>
        <p>Reject</p>
        `
        allRequests.append(row)

    })
}
const FilterStatus = () => {
    const val = filterByStatus.value

}

const showSelectPlace = () => {
    newPlace.style.display = 'flex'
}
const selectPlace = () => {
    newSlotname.style.display = 'flex'
}

const wrotSectionName = () => {
    MakeNewSectionBtn.style.display = 'flex'
}
const MakeNewSection = async () => {
    if (newSlotname.value === '' || newPlace.value == '') {
        alert('Please select place and enter new section name')
    } else {
        const _id = newPlace.value
        const slot = newSlotname.value

        const payload = {
            newSlotName: slot
        }


        await fetch(`${baseApi}/slot/addIntoSlot/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': adminDataFromLs.token
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    alert('New section has been added')
                    newPlace.value = ''
                    newSlotname.value = null

                }
                console.log(res)
            })
            .catch(err => {
                alert('Something went wrong')
                console.log(err)
            })

    }

}

