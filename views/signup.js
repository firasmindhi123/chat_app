let form=document.getElementById('form')
form.addEventListener('submit', onsubmit)
async function onsubmit(e)
{
  try{
    e.preventDefault();
    let username=document.getElementById('username').value
    let email=document.getElementById('email').value
    let number=document.getElementById('phone_no').value
    let password=document.getElementById('password').value
    let my_obj={
        username,
        email,
        number,
        password
 }



 let response= await axios.post("http://16.171.235.235:3000/user/signup",my_obj)
 if(response.status===201)
 {
  window.location.href="./login.html"
 }
 else{
 throw new Error()
 }
}catch(err){
  document.body.innerHTML+=`<div style="color:red;">${err}</div>`

}
}