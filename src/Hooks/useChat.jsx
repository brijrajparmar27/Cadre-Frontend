import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../Pages/axios/axios'

function useChat() {
    const [selectedchat,setSelectedChat]=useState();
    const [getChatdata,setGetChat]=useState()
    const { userData } = useSelector((state) => state.logindataslice);
    const config = {
        headers: { Authorization: `Bearer ${userData.jwt}` }
    };
    const accessChat=(userId)=>{
        API.post('/chat',{userId},config).then((res)=>{
            setSelectedChat(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const groupChat=(users,name)=>{
        API.post('/Groupchat',{users,name},config).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const FetchChat=()=>{
        API.get('/chat',config).then((res)=>{
            setGetChat(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return {accessChat,FetchChat,selectedchat,groupChat,getChatdata,setSelectedChat}
}

export default useChat
