import React from 'react'
import API from '../Pages/axios/axios'

function useSendmail() {
    const sendmail=(data)=>{
        API.post('/mail',data).then((res)=>{
            console.log(res);
        }).catch((err)=>{
           console.log(err);
        })
    }
  return {sendmail}
}

export default useSendmail
