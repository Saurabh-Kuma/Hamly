const label= document.getElementById('emailmsg')
const mobile= document.getElementById('mobileNumber')
const submit= document.getElementById("btnSubmit");
var digit

const params= new URLSearchParams(window.location.search)
const message=params.get('message');
if(message!=null)
    label.textContent="*"+message

 
function isSecure(){
    var pass=document.getElementById("pass");
    var length= pass.value.length;
    if(length<6 || length>16){
        pass.value="";
        label.textContent="* password Should be between 6 to 16 letters"
    }
} 
  
function isSame(){
    let pass=document.getElementById("pass");
    let rePass=document.getElementById("repass");
    if(pass.value !== rePass.value){
        label.textContent="* password is not matching"
    }
    else{
        label.textContent="password matched"
    }
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
            label.textContent="* Name should contain only alphabets !Please enter only alphabets"
        return false;
    }
    catch (err) {
        alert(err.Description);
    }
}


function checkNumber(){
    digit = mobile.value.length
    if(digit == 10){
        label.textContent=""
        submit.removeAttribute("disabled")
    }
    else{
        label.textContent="* Mobile Number Should contain 10 digit!"
        submit.setAttribute("disabled", true)
    }
}