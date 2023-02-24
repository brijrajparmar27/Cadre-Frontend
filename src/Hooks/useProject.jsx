import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import API from '../Pages/axios/axios'
import { setProjectData } from '../Pages/redux/projectDataSlice';

function useProject() {
    const dispatch=useDispatch();
    const AddProject=(data)=>{
          API.post('/add-project',data).then((res)=>{
              console.log(res)
          }).catch((err)=>{
              console.log(err);
          })
    }
    const getAllProject=(id)=>{
        console.log(id)
        API.get(`/get-projectbyuserrole/${id}`).then((res)=>{
            dispatch(setProjectData(res.data.res))
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {AddProject,getAllProject}
}

export default useProject
