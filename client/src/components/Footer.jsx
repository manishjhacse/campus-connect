import React from 'react'

export default function Footer() {
  return (
    <div className="w-full text-sm flex flex-col items-center text-center py-10 ">
    <p className="">
        Designed & Developed by  
        <a href="https://www.linkedin.com/in/manish02/" target='_blank' className="text-blue-400 hover:underline mx-1">Manish</a>  
        and  
        <a href="https://www.linkedin.com/in/siddheshkumar" target='_blank' className="text-blue-400 hover:underline mx-1">Siddhesh</a>
    </p>
    <p className=" mt-1">
        Under the guidance of  
        <a href="https://www.bpmcemadhepura.org/faculty/mr-murlidhar-prasad-singh/" target='_blank' className="text-blue-400 hover:underline ml-1">Prof. M.P. Singh</a>
    </p>
</div>

  )
}
