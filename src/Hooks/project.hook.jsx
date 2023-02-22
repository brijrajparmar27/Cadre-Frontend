import React from 'react'
import API from '../Pages/axios/axios'

function Projecthook() {
    const AddProject=(data)=>{
          API.post('/add-project',data).then((res)=>{
              console.log(res)
          }).catch((err)=>{
              console.log(err);
          })
    }
  return {AddProject}
}

export default Projecthook
