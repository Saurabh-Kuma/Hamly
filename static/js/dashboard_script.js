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
    if (window.location.pathname == "/dashboard") {
        login = false
        var result= params.get('result')
        var text= params.get('text')
        if(result!= null){
            document.getElementById("floatingTextarea2").value = text.replace(/@backtick/g, "`")
            document.getElementById("floatingEmptyPlaintextInput").value = "Result: " + result
            document.getElementById("submitButton").disabled = true
        }
        document.getElementById("total").style.display = "none"
        document.getElementById("spam").style.display = "none"
        document.getElementById("percentage").style.display = "none"
        document.getElementById("totalp").style.display = "none"
        document.getElementById("spamp").style.display = "none"
        document.getElementById("percentagep").style.display = "none"
        document.getElementById("navigation-list").style.display = "none"
        historySection.style.overflow = "unset"
        //historyButton.innerHTML = "Alert"
        historyButton.style.backgroundColor = "red"
        historyButton.click()
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
        const message = params.get('message');
        if (message == "first") {
            const topButton = document.querySelector("#historyButton");
            topButton.click();
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
        historyButton.click()
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
        historyButton.innerHTML= 'Back'
    }
    else {
        historySection.style.transform = 'translateX(-100%)';
        historySection.style.display = 'none';
        historyButton.style.transform = 'translateX(0)';
        if(login){
            historyButton.innerHTML= 'History'
        }
        else{
            historyButton.innerHTML= 'Alert'
        }
    }
    num++;
});

function clickHistoryButton() {
    historyButton.click()
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
        historyButton.click()
    }
}

function capitalizeName(name) {
    return name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
