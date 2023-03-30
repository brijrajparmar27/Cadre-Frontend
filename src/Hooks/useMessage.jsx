import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../Pages/axios/axios';

function useMessage() {
    const { userData } = useSelector((state) => state.logindataslice);
    const[displayMessage,setDisplayMessage]=useState();
    const config = {
        headers: { Authorization: `Bearer ${userData.jwt}` }
    };
    const sendMessage=(chatdata)=>{
        API.post('/message',chatdata,config).then((res)=>{
            setDisplayMessage([...displayMessage,res.data])
        }).catch((err)=>{
            console.log(err)
        })
    }
    const FetachallMessage=(chatId)=>{
        API.get(`/message/${chatId}`,config).then((res)=>{
            console.log(res)
            setDisplayMessage(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return {sendMessage,FetachallMessage,displayMessage}
}

export default useMessage
