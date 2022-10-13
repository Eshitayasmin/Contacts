import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';



const Dashboard = () => {
  const [user] = useAuthState(auth);
const navigate = useNavigate();

  const handleSignOut = () =>{
    signOut(auth);
    localStorage.removeItem('accessToken');
   navigate('/login')
   
  }

    return (
        <div class="drawer drawer-mobile">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex justify-center bg-slate-100 lg:pt-16">
    {/* <!-- Page content here --> */}
    <Outlet></Outlet>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-2" class="drawer-overlay"></label> 
    <div  className="menu p-4 overflow-y-auto w-80 bg-blue-400 text-base-content">
       {/* <!-- Sidebar content here --> */}
    <ul className='text-white'>
      <li><Link to='/contactList'>Contact List</Link></li>
        <li><Link to='/addContact'>Add a Contact</Link></li>
        <li><Link to='/addBulkContacts'>Add Bulk Contacts</Link></li>
    </ul>
    <div onClick={handleSignOut} className=' absolute bottom-4 flex justify-center w-100'>
      <button className="btn btn-wide btn-secondary mx-auto">Sign Out</button>
    </div>
    </div>
  
  </div>
</div>
//         <div class="navbar bg-zinc-300">
//   <div class="navbar-start">
//     <div class="dropdown">
//       <label tabindex="0" class="btn btn-ghost lg:hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//       </label>
//       <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//         <li><a>Item 1</a></li>
//         <li tabindex="0">
//           <a class="justify-between">
//             Parent
//             <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
//           </a>
//           <ul class="p-2">
//             <li><a>Submenu 1</a></li>
//             <li><a>Submenu 2</a></li>
//           </ul>
//         </li>
//         <li><a>Item 3</a></li>
//       </ul>
//     </div>
//     <a class="btn btn-ghost normal-case text-3xl font-serif text-orange-800">Contacts</a>
//   </div>
//   <div class="navbar-center hidden lg:flex">
//     <ul class="menu menu-horizontal p-0">
//       <li><a>Item 1</a></li>
//       <li tabindex="0">
//         <a>
//           Parent
//           <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
//         </a>
//         <ul class="p-2">
//           <li><a>Submenu 1</a></li>
//           <li><a>Submenu 2</a></li>
//         </ul>
//       </li>
//       <li><a>Item 3</a></li>
//     </ul>
//   </div>
//   <div class="navbar-end">
//     <a class="btn">Get started</a>
//   </div>
// </div>
    );
};

export default Dashboard;



