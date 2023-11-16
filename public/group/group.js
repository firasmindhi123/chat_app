
const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  window.addEventListener("DOMContentLoaded",async()=>{
  setTimeout(async()=>{
    const token=localStorage.getItem('token')
    const string_group=localStorage.getItem('group')
   // console.log(string_group.length)
  let parse_group
  let last_group
  if(string_group)
{
   parse_group=JSON.parse(string_group)
  last_group=parse_group[parse_group.length-1].id
}
else{
  parse_group=[]
  last_group=0
}

    await  axios.get(`http://16.171.235.235:3000/user/getgroup?group=${last_group}`,{headers:{"Authorization":token}}).then((response)=>{
      console.log(response)
     
    let message_array=parse_group
    for(var i=0;i<response.data.data.length;i++){
      const user_info=(response.data.data[i])
      
      message_array.push(user_info)
      
          }
          document.getElementById('messageArea').innerHTML=""
          for(var i=0;i<message_array.length;i++)
          {
            group_link(message_array[i].group_name)
          }
          const array_string=JSON.stringify(message_array)
          localStorage.setItem('group',array_string)
        
  
   },1000)
   })
  });
   
// group 
    let group=document.getElementById('group_form')
    group.addEventListener('submit',ongroup)
  async function ongroup(e)
   {
    e.preventDefault()
    let group_name=document.getElementById('group_name').value
    let my_group={
      group_name
}
const token=localStorage.getItem('token')
await axios.post('http://16.171.235.235:3000/user/group',my_group,{headers:{"Authorization":token}}).then(res=>{
  console.log(res.data.userdata.group_name,res.data.admin)
  group_link(res.data.userdata.group_name)
})
   }
  function  group_link(obj)
  {
    let group_name=obj
    console.log(group_name)
    let present_group=document.getElementById('group_link')
   let new_group= `<a href=http://16.171.235.235:3000/user/group_chat?group_chat=${group_name}>`+`${group_name}`+`</a>`+'<br>'
   present_group.innerHTML+=new_group
   console.log(present_group)
  }

 