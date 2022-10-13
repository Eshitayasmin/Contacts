import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [detailsContact, setDetailsContact] = useState([]);
    const [updateContact, setUpdateContact] = useState([]);
    // const [isReload, setIsReload] = useState(false);
    const [user] = useAuthState(auth);


    useEffect(() => {

        if (user) {
            fetch(`http://localhost:5000/contact`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('contacts', data);
                    setContacts(data)
                })
        }
    }, []);
    return (
   
            <div class="overflow-x-auto w-full">
                <table class="table w-11/12 mx-auto">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Details</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contacts.map((contact, index) => 
                            (
                                <tr>
                                <th>{index+1}</th>
                                <td>
                                    <div className='flex items-center'>
                                        <img width={30} className="rounded-full" src={contact.img} alt="" /> 
                                        <span className='px-2'>{contact.name}</span>
                                        </div>
                                       
                                    </td>
                                <td>{contact.phone}</td>
                                <td><button className='btn btn-success btn-xs'>Details</button></td>
                                <td><button className='btn btn-info btn-xs'>Update</button></td>
                                <td><button className='btn btn-error btn-xs'>Delete</button></td>
                              </tr>
                            )
                                
                            )
                        }

                    </tbody>
                </table>
            </div>

        
    );
};

export default ContactList;