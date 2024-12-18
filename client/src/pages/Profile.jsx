import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
    const user = useSelector(state => state.user)
    return (
        <div>
            <div className='flex flex-col gap-2 items-center'>
                <img className='rounded-full h-40' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSooCX-nPSHN0kCVdUnm-eptCPvUF04YaxeHQ&s" alt="Profile Pic" />
                <div className='flex flex-col gap-1'>
                    <div>{user.firstName + " " + user.lastName}</div>
                    <div>{user.email}</div>
                    <div>{user.registration_no}</div>
                </div>
            </div>
        </div>
    )
}
