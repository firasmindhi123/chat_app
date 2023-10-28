let form =document.getElementById('form')
form.addEventListener('submit',onsubmit)
function onsubmit(e)
{
    e.preventDefault();
    let message=document.getElementById('message').value
    const token=localStorage.getItem('token')
    
    let my_obj={
        message

 }
 
 
 
 axios.post("http://localhost:3000/user/chat",my_obj,{headers:{"Authorization":token}}).then((response)=>{

 console.log(response.data.userdata.data)
  messagebox(response.data.userdata.data,response.data.userdata.name)
}).catch((err)=>console.log(err))
}

const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  function messagebox(my_obj,name)
  {
    let parentelement =document.getElementById('messageArea');
    parentelement.style.backgroundColor="pink"
    let para=document.createElement('p')
    para.style.textAlign="left"
    para.innerHTML=`<h5>${my_obj.message}:- ${name} </h5>`
    parentelement.appendChild(para)
  }
  window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token')
  
    const parsetoken=parseJwt(token)
    
    axios.get(`http://localhost:3000/user/getdata`,{headers:{"Authorization":token}}).then((response)=>{
      console.log(response.data.chat_data)
      for(var i=0;i<response.data.chat_data.length;i++){
        messagebox(response.data.chat_data[i],response.data.chat_data[i].user.name)
  
      }}).catch(err=>{
        console.log(err)
      })
    })