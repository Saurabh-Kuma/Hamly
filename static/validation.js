//document.write("hello")
const params= new URLSearchParams(window.location.search)
const message=params.get('message');
console.log(message)
if(message!=null)
    document.getElementById('emailmsg').textContent="*"+message

function isAvilable(){
    //sql query to check is given userid is avilable or not
    //let user= document.getElementById("userid");
    //document.getElementById("userid").value="Saurabh";
}
 
function isSecure(){
    var pass=document.getElementById("pass");
    var length= pass.value.length;
    if(length<6 || length>16){
        pass.value="";
        alert("password Should be between 6 to 16 letters");
         
    }
} 
  
function isSame(){
    let pass=document.getElementById("pass");
    let rePass=document.getElementById("repass");
    //alert(rePass);
    if(pass.value !== rePass.value){
        alert("password is not maching");
        rePass.value="";
    }
}