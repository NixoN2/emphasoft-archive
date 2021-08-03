import React from 'react'

const User = ({user}) => {
    return (
        <div className="w-full border-t-2 pl-4">
            <p className="text-lg text-bright-turquoise flex">Пользователь: {user.username} {user.is_superuser ? 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg> : null} <span className="ml-4 text-electric-violet">{user.id}</span></p>
            {(user.first_name || user.last_name) && <p className="">Имя Фамилия: {user.first_name} {user.last_name}</p>}
            {user.last_login && <p>Последний вход: {user.last_login?.split('T')[0]} - {user.last_login?.split('T')[1].split('.')[0]}</p>}
            
        </div>
    )
}
export default User;