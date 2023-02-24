import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import API from '../Pages/axios/axios'
import { setProjectData } from '../Pages/redux/projectDataSlice';

function useProject() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [stackdata,setStackdata]=useState([]);
    const AddProject=(data)=>{
          API.post('/add-project',data).then((res)=>{
            navigate('/dashboard')
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
    const getAllSatck=()=>{
        API.get('/get-all-stack').then((res)=>{
             setStackdata(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {AddProject,getAllProject,getAllSatck,stackdata}
}

export default useProject
