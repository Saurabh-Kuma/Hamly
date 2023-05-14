const params= new URLSearchParams(window.location.search)
const message= params.get("message")
if(message == "done"){
    document.getElementById("emailmsg").textContent="Thankyou for Giving Feedback"
}