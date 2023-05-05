//console.log("this is fron dashboard.js")
window.onload = () => {
    const params= new URLSearchParams(window.location.search)
    const message=params.get('message'); 
    
    const hiddenData= document.getElementById("hidden").value 
    const array= hiddenData.split("@")
    document.getElementById("nameFeild").innerHTML=array[0]
    document.getElementById("total").innerHTML=Number(array[1])
    document.getElementById("spam").innerHTML=Number(array[2])
    if (array[1]!="0"){
        document.getElementById("percentage").innerHTML= parseFloat((Number(array[2])*100)/Number(array[1])).toFixed(2)
    }
    else{
        document.getElementById("percentage").innerHTML=0
    }
    if(message=="first"){
        const topButton= document.querySelector("#historyButton"); 
        topButton.click();
    }
    console.log(array)
    document.getElementById("submitForm").action = window.location.origin +window.location.pathname+"/submit" 

};
 
 
function clearresult(){ 
    document.getElementById("floatingEmptyPlaintextInput").value=""
    document.getElementById("submitButton").disabled = false

}

function putTextAndResult(text, result){
    document.getElementById("floatingTextarea2").value=text.replace(/@backtick/g ,"`")
    document.getElementById("floatingEmptyPlaintextInput").value= "result: "+result
    document.getElementById("submitButton").disabled = true 
}  





