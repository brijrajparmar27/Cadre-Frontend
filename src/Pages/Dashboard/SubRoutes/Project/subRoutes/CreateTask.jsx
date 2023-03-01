import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Select from "react-select";

function CreateTask() {
  const location=useLocation();
  const [membes,setMembers]=useState([]);
  console.log(location)
  let options = location?.state?.member.map(function (data) {
    return { value: data, label: data.name };
  });
  const inputSubmit=(e)=>{
        e.preventDefault();
        const obj={
           title:e.target.title.value,
           descripation:e.target.descripation.value,
           mebers:membes
          }
       console.log('dd',e.target.title.value)
  }
  const inputmember = (e) => {
    console.log(e);
    let membersarry = [];
    e.forEach((stack) => {
      membersarry.push(stack.value);
      setMembers(stackarry);
    });
  };
  return (
    <div>
         <form onSubmit={inputSubmit}>
           descripation <input name='descripation' type="text"/>
            Title <input name='title' type="text"/>
            <Select options={options} onChange={inputmember}></Select>
            <button type='submit'>submit</button>
         </form>
    </div>
  )
}

export default CreateTask
