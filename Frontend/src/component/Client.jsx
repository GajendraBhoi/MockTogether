import React from 'react'
import Avatar from 'react-avatar'

const Client = ({ username }) => {
    // console.log('username',username);
    return (
        <div>
            <div className="flex alig-item-center mb-3">
                <Avatar name={username} size={50} round="14px" className='mr-3' />
                <p>{username}</p>
            </div>
        </div>
    )
}

export default Client