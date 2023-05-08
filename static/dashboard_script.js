//console.log("this is fron dashboard.js")

const historyButton = document.querySelector('#history-button');
const historySection = document.querySelector('#history-section');
var media = window.matchMedia('(max-width: 650px)');
media.addEventListener('change', transition)
var fullName;
var num = 0;
var mobileview
var login
window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    const message = params.get('message');
    if (window.location.pathname == "/dashboard") {
        //document.getElementById("name-button").style.display = "none"
        login = false
        document.getElementById("total").style.display = "none"
        document.getElementById("spam").style.display = "none"
        document.getElementById("percentage").style.display = "none"
        document.getElementById("totalp").style.display = "none"
        document.getElementById("spamp").style.display = "none"
        document.getElementById("percentagep").style.display = "none"
        document.getElementById("navigation-list").style.display = "none"
        document.getElementById("div-logo").style.width = "100%"; 
        document.getElementById("div-logo").style.textAlign = "center";
        document.getElementById("img-logo").style.marginLeft = "0";
        historySection.style.overflow= "unset"
        document.getElementById("div-history-button").style.display= "none"
        document.getElementById("login-warning").style.display= "block"
    }
    else {
        login = true
    }
    if (login) {
        const hiddenData = document.getElementById("hidden").value
        const array = hiddenData.split("@")
        fullName = capitalizeName(array[0])
        document.getElementById("total").innerHTML = Number(array[1])
        document.getElementById("spam").innerHTML = Number(array[2])
        if (array[1] != "0") {
            document.getElementById("percentage").innerHTML = parseFloat((Number(array[2]) * 100) / Number(array[1])).toFixed(2)
        }
        else {
            document.getElementById("percentage").innerHTML = 0
        }
        if (message == "first") {
            const topButton = document.querySelector("#historyButton");
            topButton.click();
        }
        console.log(window.location.pathname)
        document.getElementById("a-profile").href = window.location.pathname + "/profile"
        document.getElementById("a-change-password").href = window.location.pathname + "/changePassword"
        document.getElementById("a-report-a-problem").href = window.location.pathname + "/report"
        document.getElementById("a-feedback").href = window.location.pathname + "/feedback"
    }
    //document.getElementById("name-button").innerHTML = fullName.charAt(0);
    document.getElementById("submitForm").action = window.location.pathname + "/submit"

};

function transition(event) {
    if (event.matches) {
        mobileview = true;
        historySection.style.transform = 'translateX(-100%)';
    }
    else {
        mobileview = false;
        historySection.style.display = 'block';
        historySection.style.transform = 'translateX(0)';
    }
}

historyButton.addEventListener('click', () => {
    if (num % 2 == 0) {
        historySection.style.transform = 'translateX(0)';
        historySection.style.display = 'block';
        historyButton.style.transform = 'translateX(70vw)';
    }
    else {
        historySection.style.transform = 'translateX(-100%)';
        historySection.style.display = 'none';
        historyButton.style.transform = 'translateX(0)';
    }
    num++;
});

function clearresult() {
    document.getElementById("floatingEmptyPlaintextInput").value = ""
    document.getElementById("submitButton").disabled = false

}

function putTextAndResult(text, result) {
    document.getElementById("floatingTextarea2").value = text.replace(/@backtick/g, "`")
    document.getElementById("floatingEmptyPlaintextInput").value = "Result: " + result
    document.getElementById("submitButton").disabled = true
    if (mobileview) {
        historyButton.click()
    }
}

function capitalizeName(name) {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

//for hovering name button
// const nameButton = document.getElementById("name-button");
// nameButton.addEventListener("mouseenter", () => {
//     nameButton.innerHTML = fullName;
// });

// nameButton.addEventListener("mouseleave", () => {
//     nameButton.innerHTML = fullName.charAt(0);
// });





//background-color:rgb(127, 251, 99)