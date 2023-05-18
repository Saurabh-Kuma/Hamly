const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const email = document.getElementById("email")
const mobileNumber = document.getElementById("mobileNumber")
const genMale = document.getElementById("genMale")
const genFemale = document.getElementById("genFemale")
const genOther = document.getElementById("genOther")
const editButton = document.getElementById("edit-button")
const updateButton = document.getElementById("update-button")
// const formProfile= document.getElementById("form-profile")
const params = new URLSearchParams(window.location.search)

//fetching data from database
getData()

window.onload = () => {
    readOnly()
    if (params.get("message") == "done") {
        document.getElementById("msg").innerHTML = "Profile Updated Successfully!"
    }
    // formProfile.action="/dashboard/"+email.value+"/profile/submit"
}

// email.addEventListener("blur", ()=>{
//     formProfile.action="/dashboard/"+email.value+"/profile/submit"
//     console.log(formProfile.action)
// })

function setValues(data) {
    firstName.value = data.firstName
    lastName.value = data.lastName
    mobileNumber.value = data.mobile
    email.value = data.email
    if (data.gender == "male") {
        genMale.checked = true
    }
    else if (data.gender == "female") {
        genFemale.checked = true
    }
    else {
        genOther.checked = true
    }
}

function getData() {
    fetch(window.location.pathname + "/data")
        .then(response => response.json())
        .then(data => {
            setValues(data)
        })
}

function readOnly() {
    updateButton.setAttribute("disabled", true)
    firstName.setAttribute("readonly", true)
    lastName.setAttribute("readonly", true)
    email.setAttribute("readonly", true)
    mobileNumber.setAttribute("readonly", true)
    genMale.setAttribute("disabled", true)
    genFemale.setAttribute("disabled", true)
    genOther.setAttribute("disabled", true)
}

function readAndWrite() {
    editButton.setAttribute("disabled", true)
    updateButton.removeAttribute("disabled")
    firstName.removeAttribute("readonly")
    lastName.removeAttribute("readonly")
    email.removeAttribute("readonly")
    mobileNumber.removeAttribute("readonly")
    genMale.removeAttribute("disabled")
    genFemale.removeAttribute("disabled")
    genOther.removeAttribute("disabled")
    document.getElementById("msg").innerHTML = ""
}

function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 8 || charCode == 32))

            return true;
        else
            alert("Please enter only alphabets");
        return false;
    }
    catch (err) {
        alert(err.Description);
    }
}
