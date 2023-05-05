const params= new URLSearchParams(window.location.search)
const message=params.get('message');
console.log(message)
if(message!=null)
    document.getElementById('emailmsg').textContent="*"+message   