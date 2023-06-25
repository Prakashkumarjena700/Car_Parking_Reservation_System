const baseApi = 'http://localhost:4500'

const userDataFromLs = JSON.parse(localStorage.getItem('loggedInUser'))

if (!userDataFromLs) {
    window.location.href = 'login.html'
}

const userProfile = document.getElementById('userProfile')
const bookSlot = document.getElementById('bookSlot')
const history = document.getElementById('history')
const currentSlot = document.getElementById('currentSlot')

const place = document.getElementById('place')
const entryDate = document.getElementById('entryDate')
const exitDate = document.getElementById('exitDate')
const type = document.getElementById('type')
const Vehiclenumber = document.getElementById('Vehiclenumber')
const total = document.getElementById('total')


const currentDate = new Date();
const minDate = currentDate.toISOString().split("T")[0]
entryDate.setAttribute("min", minDate)
exitDate.setAttribute("min", minDate)

userProfile.style.display = 'none'
history.style.display = 'none'
currentSlot.style.display = 'none'


console.log(userDataFromLs)

const userImg = document.getElementById('userImg')
userImg.src = userDataFromLs.user.avatar


const showResult = (option) => {

    if (option === 'userProfile') {
        userProfile.style.display = 'flex'
        bookSlot.style.display = 'none'
        history.style.display = 'none'
        currentSlot.style.display = 'none'
    } else if (option === 'bookSlot') {
        history.style.display = 'none'
        currentSlot.style.display = 'none'
        userProfile.style.display = 'none'
        bookSlot.style.display = 'flex'
    } else if (option === 'history') {
        history.style.display = 'flex'
        userProfile.style.display = 'none'
        bookSlot.style.display = 'none'
        currentSlot.style.display = 'none'
    } else if (option === 'currentSlot') {
        currentSlot.style.display = 'flex'
        history.style.display = 'none'
        userProfile.style.display = 'none'
        bookSlot.style.display = 'none'
        CurrentSlot()
    }
}

const Logout = () => {
    localStorage.removeItem('loggedInUser')
    alert('Logout successful')
    window.location.href = 'login.html'
}

const checkPrice = () => {
    event.preventDefault()

    const EntryDate = new Date(entryDate.value);
    const ExitDate = new Date(exitDate.value);

    const timeDifference = ExitDate.getTime() - EntryDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (place.value == '' || entryDate.value == '' || exitDate.value == '' || type.value == '' || Vehiclenumber.value == '') {
        alert('Please fill all the details')
    } else if (days == 0) {
        alert('Make your booking at list 1 day')
    } else {
        let totalfee = 0

        if (type.value == '2wheeler') {
            if (place.value == 'Mall') {
                totalfee = 100 * days
            } else if (place.value == 'Hospital') {
                totalfee = 100 * days
            } else if (place.value == 'Airport') {
                totalfee = 200 * days
            } else if (place.value == 'Railway Station') {
                totalfee = 150 * days
            }
        } else if (type.value == '4wheeler') {
            if (place.value == 'Mall') {
                totalfee = 300 * days
            } else if (place.value == 'Hospital') {
                totalfee = 300 * days
            } else if (place.value == 'Airport') {
                totalfee = 500 * days
            } else if (place.value == 'Railway Station') {
                totalfee = 350 * days
            }
        }

        total.innerText = totalfee + '.00'
    }

}

const makeRequestForSlot = async () => {
    const EntryDate = new Date(entryDate.value);
    const ExitDate = new Date(exitDate.value);

    const timeDifference = ExitDate.getTime() - EntryDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let totalfee = 0

    if (place.value == '' || entryDate.value == '' || exitDate.value == '' || type.value == '' || Vehiclenumber.value == '') {
        alert('Please fill all the details')
    } else if (days == 0) {
        alert('Make your booking at list 1 day')
    } else {
        if (type.value == '2wheeler') {
            if (place.value == 'Mall') {
                totalfee = 100 * days
            } else if (place.value == 'Hospital') {
                totalfee = 100 * days
            } else if (place.value == 'Airport') {
                totalfee = 200 * days
            } else if (place.value == 'Railway Station') {
                totalfee = 150 * days
            }
        } else if (type.value == '4wheeler') {
            if (place.value == 'Mall') {
                totalfee = 300 * days
            } else if (place.value == 'Hospital') {
                totalfee = 300 * days
            } else if (place.value == 'Airport') {
                totalfee = 500 * days
            } else if (place.value == 'Railway Station') {
                totalfee = 350 * days
            }
        }
    }

    let requestObj = {
        userDetails: userDataFromLs.user,
        place: place.value,
        status: 'pending',
        seaction: '',
        entryDate: entryDate.value,
        exitDate: exitDate.value,
        type: type.value,
        Vehiclenumber: Vehiclenumber.value,
        price: totalfee,
        review: {
            star: 0,
            feedback: ''
        }
    }

    await fetch(`${baseApi}/request/create`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': userDataFromLs.token
        },
        body: JSON.stringify(requestObj)
    }).then(res => res.json())
        .then(res => {
            if (res.sucess) {
                alert('Request sent please wait for conformation')
            } else {
                alert('Something went wrong')
            }
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong')
        })

}

const CurrentSlot = async () => {
    await fetch(`${baseApi}/request/${userDataFromLs.user._id}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': userDataFromLs.token
        }
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
}