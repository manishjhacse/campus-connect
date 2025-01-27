import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'

export default function Profile() {
    const user = useSelector(state => state.user)
    return (
        <div className=' flex-col items-center'>
            <Navbar/>
            <div className='flex flex-col mx-auto  gap-2 w-full max-w-[1220px] pt-24'>
                <div className='w-fit flex items-center gap-4'>
                <img className='rounded-full h-28' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s" alt="Profile Pic" />
                <div className='flex flex-col gap-1'>
                    <div>{user.firstName + " " + user.lastName}</div>
                    <div>{user.email}</div>
                    <div>{user.registration_no}</div>
                </div>
                </div>
            </div>
        </div>
    )
}
