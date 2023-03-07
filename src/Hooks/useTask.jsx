import API from '../Pages/axios/axios'

function useTask() {
    const updatetaskstatus=(data)=>{
        console.log(data && data._id)
       API.put(`/update-Task/${data && data._id}`,data).then((res)=>{
           console.log(res);
       }).catch((err)=>{
           console.log(err);
       })
    }
  return {
    updatetaskstatus
  }
}

export default useTask
