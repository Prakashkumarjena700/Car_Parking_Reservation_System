const baseApi = 'https://zany-pink-drill-toga.cyclic.app'

const userDataFromLs = JSON.parse(localStorage.getItem('loggedInUser'))

const editObj = JSON.parse(localStorage.getItem('editObj'))


const Etplace = document.getElementById('Etplace')
const EtentryDate = document.getElementById('EtentryDate')
const EtexitDate = document.getElementById('EtexitDate')
const Ettype = document.getElementById('Ettype')
const EtVehiclenumber = document.getElementById('EtVehiclenumber')
const Ettotal = document.getElementById('Ettotal')

const loading = document.getElementById('loading')

loading.style.display = 'none'

const EtcheckPrice = () => {
    event.preventDefault()

    const EntryDate = new Date(EtentryDate.value);
    const ExitDate = new Date(EtexitDate.value);

    const timeDifference = ExitDate.getTime() - EntryDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (Etplace.value == '' || EtentryDate.value == '' || EtexitDate.value == '' || Ettype.value == '' || EtVehiclenumber.value == '') {
        alert('Please fill all the details')
    } else if (days == 0) {
        alert('Make your booking at list 1 day')
    } else {
        let totalfee = 0

        if (Ettype.value == '2wheeler') {
            if (Etplace.value == 'Mall') {
                totalfee = 100 * days
            } else if (Etplace.value == 'Hospital') {
                totalfee = 100 * days
            } else if (Etplace.value == 'Airport') {
                totalfee = 200 * days
            } else if (Etplace.value == 'Railway Station') {
                totalfee = 150 * days
            }
        } else if (Ettype.value == '4wheeler') {
            if (Etplace.value == 'Mall') {
                totalfee = 300 * days
            } else if (Etplace.value == 'Hospital') {
                totalfee = 300 * days
            } else if (Etplace.value == 'Airport') {
                totalfee = 500 * days
            } else if (Etplace.value == 'Railway Station') {
                totalfee = 350 * days
            }
        }

        Ettotal.innerText = `${totalfee}.00`
    }


}

const editRequestForSlot = async () => {

    if (Etplace.value == '' || EtentryDate.value == '' || EtexitDate.value == '' || Ettype.value == '' || EtVehiclenumber.value == '') {
        alert('Please fill all details again for edit')
    } else {
        loading.style.display = 'flex'
        const EntryDate = new Date(EtentryDate.value);
        const ExitDate = new Date(EtexitDate.value);

        const timeDifference = ExitDate.getTime() - EntryDate.getTime();

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        let totalfee = 0

        if (Ettype.value == '2wheeler') {
            if (Etplace.value == 'Mall') {
                totalfee = 100 * days
            } else if (Etplace.value == 'Hospital') {
                totalfee = 100 * days
            } else if (Etplace.value == 'Airport') {
                totalfee = 200 * days
            } else if (Etplace.value == 'Railway Station') {
                totalfee = 150 * days
            }
        } else if (Ettype.value == '4wheeler') {
            if (Etplace.value == 'Mall') {
                totalfee = 300 * days
            } else if (Etplace.value == 'Hospital') {
                totalfee = 300 * days
            } else if (Etplace.value == 'Airport') {
                totalfee = 500 * days
            } else if (Etplace.value == 'Railway Station') {
                totalfee = 350 * days
            }
        }

        const updateObj = {
            place: Etplace.value,
            entryDate: EtexitDate.value,
            exitDate: EtexitDate.value,
            type: Ettype.value,
            Vehiclenumber: EtVehiclenumber.value,
            price: totalfee
        }
        await fetch(`${baseApi}/request/edit/${editObj._id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': userDataFromLs.token
            },
            body: JSON.stringify(updateObj)
        }).then(res => res.json())
            .then(res => {
                loading.style.display = 'flex'
                console.log(res)
                alert('Request has been updated')
                window.location.href = "../index.html"
            })
            .catch(err => {
                loading.style.display = 'flex'
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