const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

const adminDataFromLs = JSON.parse(localStorage.getItem('loggedInUser'))

if (!adminDataFromLs || adminDataFromLs.user.role !== 'admin') {
    window.location.href = 'login.html'
}

const adminPic = document.getElementById('adminPic')
const adminPicmobile = document.getElementById('adminPicmobile')

adminPic.src = adminDataFromLs.user.avatar
adminPicmobile.src = adminDataFromLs.user.avatar

const profile = document.getElementById('profile')
const requests = document.getElementById('requests')
const slots = document.getElementById('slots')
const users = document.getElementById('users')
const allRequests = document.getElementById('allRequests')
const filterByStatus = document.getElementById('filterByStatus')
const newPlace = document.getElementById('newPlace')
const newSlotname = document.getElementById('newSlotname')
const MakeNewSectionBtn = document.getElementById('MakeNewSectionBtn')
const particularSlot = document.getElementById('particularSlot')
const usersList = document.getElementById('usersList')
const adminName = document.getElementById('adminName')
const adminMale = document.getElementById('adminMale')
const totalReqCount = document.getElementById('totalReqCount')
const pendingReqCount = document.getElementById('pendingReqCount')
const conformedCount = document.getElementById('conformedCount')
const compleatedCount = document.getElementById('compleatedCount')
const totalMallSlot = document.getElementById('totalMallSlot')
const totalHospitalSlot = document.getElementById('totalHospitalSlot')
const totalAirportSlot = document.getElementById('totalAirportSlot')
const totalRsSlot = document.getElementById('totalRsSlot')
const loading = document.getElementById('loading')

profile.style.display = 'flex'
requests.style.display = 'none'
slots.style.display = 'none'
users.style.display = 'none'
newPlace.style.display = 'none'
newSlotname.style.display = 'none'
MakeNewSectionBtn.style.display = 'none'

loading.style.display = 'none'

const showResultForAdmin = (option) => {
    if (option == 'profile') {
        profile.style.display = 'flex'
        requests.style.display = 'none'
        slots.style.display = 'none'
        users.style.display = 'none'
        adminProfile()
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
        users.style.flexDirection = 'column'
        showAllUsers()
    }
}

const adminProfile = async () => {
    const admin = adminDataFromLs.user
    adminName.innerText = admin.name
    adminMale.innerText = admin.email

    await fetch(`${baseApi}/request`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            totalReqCount.innerText = res.length

            const pending = res.filter((ele) => {
                return ele.status == 'pending'
            })

            const confirmed = res.filter((ele) => {
                return ele.status === 'confirmed'
            })

            const finished = res.filter((ele) => {
                return ele.status === 'finished'
            })

            pendingReqCount.innerHTML = pending.length
            conformedCount.innerText = confirmed.length
            compleatedCount.innerText = finished.length

        })
        .catch(err => console.log(err))

    const mall = '64965fd6e59a8461f3a85ae0'
    const airport = '64967deb187a849555a33eb1'
    const hospital = '649897f76f9a9c027924db37'
    const rs = '649898066f9a9c027924db3a'

    await fetch(`${baseApi}/slot/${mall}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            totalMallSlot.innerText = res[0].totalSlot.length
        })
        .catch(err => console.log(err))

    await fetch(`${baseApi}/slot/${airport}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            totalAirportSlot.innerText = res[0].totalSlot.length
        })
        .catch(err => console.log(err))

    await fetch(`${baseApi}/slot/${hospital}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            totalHospitalSlot.innerText = res[0].totalSlot.length
        })
        .catch(err => console.log(err))

    await fetch(`${baseApi}/slot/${rs}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            totalRsSlot.innerText = res[0].totalSlot.length
        })
        .catch(err => console.log(err))

}
adminProfile()
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
        <p>${ele.type}</p>
        <p>${ele.entryDate}</p>
        <p>${ele.exitDate}</p>
        <p>${ele.place === 'Railway Station' ? 'Railway St.' : ele.place}</p >
        <p>${ele.seaction}</p>
        <p>${ele.status}</p>
      
        `
        const Compleated = document.createElement('img')
        Compleated.setAttribute('src', '../assets/compleated.png')
        Compleated.addEventListener('click', () => {
            CompleatedSlot(ele)
        })

        const approve = document.createElement('img')
        approve.setAttribute('src', '../assets/ticLogo.png')
        approve.addEventListener('click', () => {
            approveModal(ele)
        })

        const reject = document.createElement('img')
        reject.setAttribute('src', '../assets/tacLogo.png')
        reject.addEventListener('click', () => {
            requestReject(ele._id)
        })

        row.append(Compleated, approve, reject)

        allRequests.append(row)

    })
}

const CompleatedSlot = async (ele) => {
    const userId = ele.user

    const slotName = getID(ele.place)

    console.log(userId, slotName)

}

const requestReject = async (id) => {
    loading.style.display = 'flex'
    await fetch(`${baseApi}/request/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            loading.style.display = 'none'
            alert('Request has been deleted')
            getallRequest()
        })
        .catch(err => {
            loading.style.display = 'none'
            alert('Something went wrong')
            console.log(err)
        })
}

const approveModal = async (payload) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeModal);

    const modalTitle = document.createElement('h2');
    modalTitle.innerText = 'Approve Request';

    const modalBody = document.createElement('p');
    modalBody.textContent = payload.place;

    const showAvelableSlots = document.createElement('div')

    const id = getID(payload.place)

    await fetch(`${baseApi}/slot/${id}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            let arr = res[0].avelableSlot

            arr && arr.map((ele) => {
                const section = document.createElement('p')

                section.innerText = ele
                section.addEventListener('click', () => {
                    approveSlot(payload._id, ele, payload.place)
                })

                showAvelableSlots.append(section)
            })

        })
        .catch(err => {
            alert('Something went wrong')
            console.log(err)
        })


    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(showAvelableSlots);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.style.display = 'block';
}

const getID = (name) => {
    let id = ''
    if (name === 'Mall') {
        id = '64965fd6e59a8461f3a85ae0'
    } else if (name === 'Airport') {
        id = '64967deb187a849555a33eb1'
    } else if (name === 'Hospital') {
        id = '649897f76f9a9c027924db37'
    } else if (name === 'Railway Station') {
        id = '649898066f9a9c027924db3a'
    }

    return id

}

const closeModal = () => {
    const modal = document.querySelector('.modal');
    document.body.removeChild(modal);
};

const approveSlot = async (id, sec, name) => {

    const payload = {
        seaction: sec,
        status: 'confirmed'
    }

    await fetch(`${baseApi}/request/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': adminDataFromLs.token
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            alert('Something went wrong')
        })

    const Slotid = getID(name)

    const payload2 = {
        bookingSlotName: sec
    }

    await fetch(`${baseApi}/slot/booking/${Slotid}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
            'Authorization': adminDataFromLs.token
        },
        body: JSON.stringify(payload2)
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            alert(res.msg)
            getallRequest()
            closeModal()
        })
        .catch(err => {
            console.log(err)
        })

}

const FilterStatus = () => {
    const val = filterByStatus.value

    console.log(val)
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
        loading.style.display = 'flex'

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
                loading.style.display = 'none'
                if (res.success) {
                    alert('New section has been added')
                    newPlace.value = ''
                    newSlotname.value = null

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

const showParticulatSlot = async (id) => {
    loading.style.display = 'flex'
    await fetch(`${baseApi}/slot/${id}`, {
        headers: {
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            loading.style.display = 'none'
            appendParticularSlot(res[0])
        })
        .catch(err => {
            loading.style.display = 'none'
            alert('Something went wrong')
            console.log(err)
        })
}

const appendParticularSlot = (obj) => {
    particularSlot.innerHTML = null

    const slotName = document.createElement('h1')
    slotName.innerText = obj.slotName

    particularSlot.append(slotName)

    const avelable = document.createElement('div')
    avelable.innerHTML = `<h2>Avelable Slot</h2>`

    const AVcard = document.createElement('div')
    obj.avelableSlot.map((ele) => {

        const section = document.createElement('p')

        section.innerText = ele

        AVcard.append(section)
        avelable.append(AVcard)
        particularSlot.append(avelable)
    })

    const booked = document.createElement('div')
    booked.innerHTML = `<h2>Booked Slot</h2>`

    const BOKcard = document.createElement('div')
    obj.bookedSlot.map((ele) => {
        const section = document.createElement('p')

        section.innerText = ele

        BOKcard.append(section)
        booked.append(BOKcard)
        particularSlot.append(booked)
    })

    const total = document.createElement('div')
    total.innerHTML = `<h2>Total Slot</h2>`

    const tOTcard = document.createElement('div')
    obj.totalSlot.map((ele) => {
        const section = document.createElement('p')

        section.innerText = ele

        tOTcard.append(section)
        total.append(tOTcard)
        particularSlot.append(total)
    })

}

const showAllUsers = async () => {
    await fetch(`${baseApi}/user`)
        .then(res => res.json())
        .then(res => {
            appendAppUsers(res)
            console.log(res)
        })
        .catch(err => console.log(err))
}

const appendAppUsers = (arr) => {
    usersList.innerHTML = null

    arr.map((ele) => {
        const card = document.createElement('div')

        card.innerHTML = `
        <img width='20px' src=${ele.avatar} alt=${ele.name} /> 
        <p>${ele.name}</p>
        <p>${ele.email.slice(0, 7)}...</p>
        <p>${ele.gender}</p>
        <p>${ele.phone}</p>
        <p>${ele.city}</p>
        <p>${ele.country}</p>
        <p>${ele.drivingExperience}</p>
        <p>${ele.insuranceNumber}</p>
        `
        const deleteBtn = document.createElement('img')
        deleteBtn.style.cursor = 'pointer'
        deleteBtn.setAttribute('src', '../assets/tacLogo.png')
        deleteBtn.addEventListener('click', () => {
            deleteUser(ele._id)
        })

        card.append(deleteBtn)
        usersList.append(card)

    })
}

const deleteUser = async (id) => {
    loading.style.display = 'flex'
    await fetch(`${baseApi}/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': adminDataFromLs.token
        }
    }).then(res => res.json())
        .then(res => {
            console.log(res)
            loading.style.display = 'none'
            alert('User has been deleted')
            showAllUsers()
        })
        .catch(err => {
            loading.style.display = 'none'
            alert('Something went wrong')
            console.log(err)
        })
}
const gotoHome = () => {
    window.location.href = '../index.html'
}