const params= new URLSearchParams(window.location.search)
document.getElementById("form-report").action = window.location.pathname + "/submit"
const message= params.get("message")
if(message=="done"){
    document.getElementById("emailmsg").innerHTML="Thankyou For your response."
}
