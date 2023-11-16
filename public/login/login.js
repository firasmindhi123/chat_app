let form=document.getElementById('form')
form.addEventListener('submit', onsubmit) 
    async function onsubmit(e)
{
 try{
    e.preventDefault();
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let my_obj={
        email,
        password
 
    }


 let response =await axios.post("http://16.171.235.235:3000/user/login",my_obj)
  localStorage.setItem('token',response.data.token)
     window.location.href="../group/group.html"
   
   
 }
 catch(err){
    console.log(JSON.stringify(err))
    document.body.innerHTML+=`<div style='color:red;'>${err.message} </div>`
 }
}