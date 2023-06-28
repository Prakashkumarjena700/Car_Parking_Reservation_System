const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

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

const userName = document.getElementById('userName')
const userMale = document.getElementById('userMale')
const gender = document.getElementById('gender')
const phone = document.getElementById('phone')
const insuranceNumber = document.getElementById('insuranceNumber')
const drivingExperience = document.getElementById('drivingExperience')
const dob = document.getElementById('dob')
const city = document.getElementById('city')
const country = document.getElementById('country')

const SlotContainerResult = document.getElementById('SlotContainerResult')

const loading = document.getElementById('loading')


const currentDate = new Date();
const minDate = currentDate.toISOString().split("T")[0]
entryDate.setAttribute("min", minDate)
exitDate.setAttribute("min", minDate)

userProfile.style.display = 'none'
history.style.display = 'none'
currentSlot.style.display = 'none'

loading.style.display = 'none'


console.log(userDataFromLs)

const userImg = document.getElementById('userImg')
userImg.src = userDataFromLs.user.avatar


const showResult = (option) => {
    if (option === 'userProfile') {
        userProfile.style.display = 'flex'
        bookSlot.style.display = 'none'
        history.style.display = 'none'
        currentSlot.style.display = 'none'
        getUserData()
    } else if (option === 'bookSlot') {
        history.style.display = 'none'
        currentSlot.style.display = 'none'
        userProfile.style.display = 'none'
        bookSlot.style.display = 'flex'
        bookSlot.style.flexDirection = 'column'
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
        getallRequest()
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

const getUserData = () => {
    userName.innerText = userDataFromLs.user.name
    userMale.innerText = userDataFromLs.user.email
    gender.innerText = userDataFromLs.user.gender
    phone.innerText = userDataFromLs.user.phone
    insuranceNumber.innerText = userDataFromLs.user.insuranceNumber
    drivingExperience.innerText = userDataFromLs.user.drivingExperience
    dob.innerText = userDataFromLs.user.dob
    city.innerText = userDataFromLs.user.city
    country.innerText = userDataFromLs.user.country
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

        loading.style.display = 'flex'

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
                loading.style.display = 'none'
                alert('Request sent please wait for conformation')
            } else {
                alert('Something went wrong')
            }
            console.log(res)
        })
        .catch(err => {
            loading.style.display = 'none'
            console.log(err)
            alert('Something went wrong')
        })

}

const getallRequest = async () => {
    loading.style.display = 'flex'
    await fetch(`${baseApi}/request/${userDataFromLs.user._id}`, {
        headers: {
            'Authorization': userDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            appendRequest(res)
            loading.style.display = 'none'
        })
        .catch(err => {
            loading.style.display = 'none'
            console.log(err)
        })
}

const appendRequest = (arr) => {
    SlotContainerResult.innerHTML = null

    arr.map((ele) => {
        const card = document.createElement('div')

        card.innerHTML = `
             <p>${ele.type}</p>
             <p>${ele.Vehiclenumber}</p>
             <p>${ele.place}</p>
             <p>${ele.entryDate}</p>
             <p>${ele.exitDate}</p>
             <p>₹ ${ele.price}.00</p>
             <p>${ele.seaction}</p>
             <p>${ele.status}</p>
        `

        const editBtm = document.createElement('img')
        editBtm.setAttribute('src', '../assets/editLogo.png')
        editBtm.addEventListener('click', () => {
            EditSlot(ele._id, ele.status)
        })

        card.append(editBtm)
        SlotContainerResult.append(card)
    })

}

const gotoHome = () => {
    window.location.href = '../index.html'
}

const EditSlot = (id, status) => {
    if (status === 'pending') {
        console.log(id, status)
    } else {
        alert(`Sorry you can only edit your request if it's pending`)
    }
}