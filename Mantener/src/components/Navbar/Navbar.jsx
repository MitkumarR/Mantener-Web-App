import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-center items-center text-white'>
      <div className='Logo'>Mantener</div>
      <input type="text" name='Searchbar' className='' placeholder='Search By Title'/><br/>
      <button className='Refresh'>Refresh</button>
      <button className='GridStyle'>List</button>
      <div className='User'>User</div>
    </div>
  )
}

export default Navbar
