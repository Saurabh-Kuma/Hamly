const historyButton = document.querySelector('#history-button');
const historySection = document.querySelector('#history-section');
const closeButton = document.getElementById('a-closebtn')
const recommendation = document.getElementById("recommendation")
var media = window.matchMedia('(max-width: 650px)');
media.addEventListener('change', transition)
var fullName;
var num = 0;
var mobileview = false
var vulnerability 
var textrecommendation
console.log(window.outerWidth+ "first" + mobileview)
if (window.outerWidth < 650) {
    mobileview = true
}
var login

window.onload = () => {
    const params = new URLSearchParams(window.location.search)
    if (window.location.pathname == "/dashboard") {
        login = false
        var result = params.get('result')
        var text = params.get('text')
        if (result != null) {
            document.getElementById("floatingTextarea2").value = text.replace(/@backtick/g, "`")
            document.getElementById("floatingEmptyPlaintextInput").value = "Result: " + result
            document.getElementById("submitButton").disabled = true
        }
        historySection.style.overflow = "unset"
        historyButton.innerHTML = 'Alert'
        historyButton.style.backgroundColor = "red"
        console.log(window.outerWidth+ "Second" + mobileview)
        if (window.outerWidth < 650) {
            mobileview= true
            clickHistoryButton()
        }
        else{
            mobileview=false
        }
    }
    else {
        login = true
        // closeButton.style.display = 'none';
        document.getElementById("totalp").style.display = "block"
        document.getElementById("spamp").style.display = "block"
        document.getElementById("percentagep").style.display = "block"
        document.getElementById("total").style.display = "block"
        document.getElementById("spam").style.display = "block"
        document.getElementById("percentage").style.display = "block"
        document.getElementById("navigation-list").style.display = "block"
        document.getElementById("recommendation").style.display = "block"
    }
    if (login) {
        const hiddenData = document.getElementById("hidden").value
        const array = hiddenData.split("@")
        fullName = capitalizeName(array[0])
        document.getElementById("total").innerHTML = Number(array[1])
        document.getElementById("spam").innerHTML = Number(array[2])
        if (array[1] != "0") {
            vulnerability= parseFloat((Number(array[2]) * 100) / Number(array[1])).toFixed(2)
            document.getElementById("percentage").innerHTML = vulnerability
        }
        else {
            document.getElementById("percentage").innerHTML = 0
        }

        if(vulnerability < 10){
            textrecommendation= "You are Safe on your email server"
        }
        else if(vulnerability < 20){
            textrecommendation= "You're being Attacked by Spammers"
        }
        else if(vulnerability < 40){
            textrecommendation= "Stay Cautious! We Recommend You not to take Action Any Action mentioned in email."
        }
        else{
            textrecommendation="You are at Risk of being theft/Cheated. We strictly Recommend You not to take Action Any Action mentioned in email."
        }

        recommendation.innerHTML= textrecommendation

        const message = params.get('message');
        if (message == "first") {
            const topButton = document.querySelector("#historyButton");
            topButton.click();
        }
        else {
            // closeButton.style.display = 'none'; 
        }

        document.getElementById("a-profile").href = window.location.pathname + "/profile"
        document.getElementById("a-change-password").href = window.location.pathname + "/changePassword"
        document.getElementById("a-report-a-problem").href = window.location.pathname + "/report"
        document.getElementById("a-feedback").href = window.location.pathname + "/feedback"
    }
    document.getElementById("submitForm").action = window.location.pathname + "/submit"
};

function transition(event) {
    if (event.matches) {
        mobileview = true;
        historySection.style.transform = 'translateX(-100%)';
        console.log("media")
        clickHistoryButton()

    }
    else {
        mobileview = false;
        historySection.style.display = 'block';
        historySection.style.transform = 'translateX(0)';
        closeButton.style.display = "none"
    }
}

function clickHistoryClose() {
    historySection.style.transform = 'translateX(-100%)';
    historySection.style.display = 'none';
    closeButton.style.display = 'none';
    if (login) {
        historyButton.innerHTML = 'History'
    }
    else {
        historyButton.innerHTML = 'Alert'
    }
}

function clickHistoryButton() {
    historySection.style.transform = 'translateX(0)';
    historySection.style.display = 'block';
    if (window.outerWidth < 650) {
        closeButton.style.display = 'block';
    }
}

function clearresult() {
    document.getElementById("floatingEmptyPlaintextInput").value = ""
    document.getElementById("submitButton").disabled = false

}

function putTextAndResult(text, result) {
    document.getElementById("floatingTextarea2").value = text.replace(/@backtick/g, "`")
    document.getElementById("floatingEmptyPlaintextInput").value = "Result: " + result
    document.getElementById("submitButton").disabled = true
    if (mobileview) {
        clickHistoryClose()
    }
}

function capitalizeName(name) {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
