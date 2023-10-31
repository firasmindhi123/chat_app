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
    let para=document.createElement('p')
    para.style.textAlign="left"
    para.innerHTML=`<h5>${my_obj.message}:-${name} </h5>`
    parentelement.appendChild(para)
  }
  window.addEventListener("DOMContentLoaded",async()=>{
    const token=localStorage.getItem('token')

  const string_message=localStorage.getItem('message')
  let parse_message
  let last_message
  if(string_message)
{
   parse_message=JSON.parse(string_message)
  last_message=parse_message[parse_message.length-1].id
}
else{
  parse_message=[]
  last_message=0
}
 // console.log(last_message.id)
 
  
   
  setTimeout(async()=>{console.log(last_message)
    await  axios.get(`http://localhost:3000/user/getdata?id=${last_message}`,{headers:{"Authorization":token}}).then((response)=>{
      
     
    let message_array=parse_message
    for(var i=0;i<response.data.chat_data.length;i++){
      const user_info=(response.data.chat_data[i])
      
      message_array.push(user_info)
      
          }
          document.getElementById('messageArea').innerHTML=""
          for(var i=0;i<message_array.length;i++)
          {
            messagebox(message_array[i],message_array[i].user.name)
          }

  
            const array_string=JSON.stringify(message_array)
          localStorage.setItem('message',array_string)
    })
    
    
    
    
  },1000)

  
   });
   

    // setInterval(async()=>{
    //   const token=localStorage.getItem('token')
    //   await axios.get(`http://localhost:3000/user/getdata`,{headers:{"Authorization":token}}).then((response)=>{
    //     console.log(response.data.chat_data)
    //     let parentelement=document.getElementById('messageArea')
    //     parentelement.innerHTML="";
    //     for(var i=0;i<response.data.chat_data.length;i++){
          
    //       messagebox(response.data.chat_data[i],response.data.chat_data[i].user.name)
    
    //     }}).catch(err=>{
    //       console.log(err)
    //     })  
    // },1000)