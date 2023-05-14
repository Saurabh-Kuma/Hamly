const params= new URLSearchParams(window.location.search)
const message=params.get('message');
if(message!=null)
    document.getElementById('emailmsg').textContent="*"+message   