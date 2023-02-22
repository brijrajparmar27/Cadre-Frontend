import React from "react";
import Select from 'react-select'
import './CreateProject.css'
export default function CreateProject() {
  const members = [
    { value: 'bhautik', label: 'bhautik' },
    { value: 'bhavik', label: 'bhavik' },
    { value: 'Admin', label: 'Admin' }
  ]
  const task = [
    { value: 'bhautik', label: 'bhautik' },
    { value: 'bhavik', label: 'bhavik' },
    { value: 'Admin', label: 'Admin' }
  ]
  return <div>
       <form>
        <div className="">
            Name<input  type="text" className="textbox"/>
            Descripation<input  type="text" className="textbox"/>
            Assigend Date<input  type="Date" className="textbox"/>
            DeadLine<input  type="Date"className="textbox"/>
            <Select options={members}/>
          </div>
       </form>
    </div>;
}
