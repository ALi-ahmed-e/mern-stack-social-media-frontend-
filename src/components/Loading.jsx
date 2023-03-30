import React from 'react'
import {RiLoader4Line} from 'react-icons/ri'
const Loading = () => {
  return (
    <div className=' fixed left-0 text-white top-0 bottom-0 right-0 bg-black/30 backdrop-blur-xl flex items-center justify-center z-50'>
        <RiLoader4Line size='50' className=' animate-spin'  />
    </div>
  )
}

export default Loading