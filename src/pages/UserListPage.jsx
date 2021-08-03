import React, { useState, useEffect } from 'react';
import User from '../components/User';
const UserListPage = (props) => {
    const [users,setUsers] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const token = localStorage.getItem('token');
    const onSortClick = (event) => {
        setFilteredUsers(users.sort((a,b) => a.id < b.id ? -1 : 1))
    }
    const onSearchChange = (event) => {
        setFilteredUsers(users.filter(user => user.username.includes(event.target.value)));
    }
    const fetchData = async (url,method) => {
        try {
            await fetch(url,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },method})
            .then(response => response.body)
            .then(rb => {
            const reader = rb.getReader();
            return new ReadableStream({
                start(controller) {
                function push() {
                    reader.read().then( ({done, value}) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    })
                }
                push();
                }
        });
        })
        .then(stream => {
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
            setUsers(JSON.parse(result));
            setFilteredUsers(JSON.parse(result));
        });
        } catch (error) {
            return error;
        }
    };
    useEffect(async () => {
        await fetchData('https://emphasoft-test-assignment.herokuapp.com/api/v1/users/','GET');
        
    },[])
    return (
        <div className="w-screen h-screen bg-gradient-to-tr from-bright-turquoise to-electric-violet pt-2 overflow-y-hidden">
            <h1 className="text-center mb-4 text-4xl text-white">Пользователи</h1>
            <div className="flex justify-center">
                <input onChange={onSearchChange} placeholder="Поиск:" className="focus:outline-none focus:ring-2 focus:ring-bright-turquoise text-xl pl-4  w-96 md:w-128 h-10"  type="text" />
            </div>
            <div className="flex">
                <button onClick={onSortClick} className="mx-auto w-64 md:w-72 bg-white mt-4 h-12 rounded-xl text-xl">Отсортировать</button>
            </div>
            <main className="mt-4 pr-4 max-h-96 md:max-h-128 scrollbar scrollbar-thumb-black scrollbar-track-gray-200 overflow-y-scroll container mx-auto bg-white w-96 md:w-144">
                {filteredUsers && filteredUsers.map((user,idx) => <User key={`${user.id}-${idx}`} user={user}/>)}
            </main>
        </div>
    )
}
export default UserListPage;