const searchParams = new URLSearchParams(window.location.search);
let group_name=searchParams.get('group_chat');

const group_place= document.getElementById('hidden')
group_place.value=group_name
const form=document.getElementById('form')
form.addEventListener('submit',addon)
async function addon(e)
{
    e.preventDefault()
    const token=localStorage.getItem('token')
    const hidden=document.getElementById('hidden').value
    const message=document.getElementById('message').value
    const obj={
        hidden,
        message
    }
await axios.post('http://localhost:3000/user/group_chat',obj,{headers:{"Authorization":token}}).then(response=>{
  console.log(response.data.userdata)
  messagebox(response.data.userdata.message,response.data.userdata.name)
})
}
window.addEventListener("DOMContentLoaded",async()=>{
    setTimeout(async()=>{
      const token=localStorage.getItem('token')
      const string_group=localStorage.getItem(`${group_name}`)
      
      let parse_group
      let last_group
      if(string_group>2)
    {
       parse_group=JSON.parse(string_group)
      last_group=parse_group[parse_group.length-1].id
    }
    else{
      parse_group=[]
      last_group=0
    }
  
      await  axios.get(`http://localhost:3000/group/getdata?group=${group_name}&&message=${last_group}`,{headers:{"Authorization":token}}).then((response)=>{
        

        
    let message_array=parse_group
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
               localStorage.setItem(`${group_name}`,array_string)
       }).catch(err=>console.log(err))
  
     },1000)
     });

     function messagebox(my_obj,name)
  {
    let parentelement =document.getElementById('messageArea');
    let para=document.createElement('p')
    para.style.textAlign="left"
    para.innerHTML=`<h5>${my_obj.message}:-${name} </h5>`
    parentelement.appendChild(para)
  }
  //email
  let add_user=document.getElementById('add_user')
  add_user.addEventListener('submit',adduser)
   function adduser(e){
    const token= localStorage.getItem('token')
    e.preventDefault()
    let user_add=document.getElementById('user_email').value
    let user_obj={
      user_add
    }
    
    axios.post(`http://localhost:3000/group/add_member?group=${group_name}`,user_obj,{headers:{"Authorization":token}}).then(response=>{
      console.log(response)
    })
   }
   // make admin

   const admin=document.getElementById('admin')
   admin.addEventListener('submit',makeadmin)
   function makeadmin(e)
   {
    const token=localStorage.getItem('token')
    e.preventDefault()
    const person =document.getElementById('mail').value
    const admin_obj={
     person
    }
    axios.post(`http://localhost:3000/group/admin?group=${group_name}`,admin_obj,{headers:{"Authorization":token}}).then(res=>{
      console.log(res)
    })
   }