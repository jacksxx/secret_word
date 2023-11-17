import React from 'react'

const BaseDiv = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex justify-center items-center text-center flex-col py-5 text-white ">
        {children}
    </div>
  )
}

export default BaseDiv