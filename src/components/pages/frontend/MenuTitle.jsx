import React from 'react'
import { imgPath } from '../../helpers/functions-general'

const MenuTitle = ({categoryName}) => {
  return (
    <>
        <div className="p-4 bg-myRed flex items-center text-white gap-5">
            <img src={`${imgPath}/jollibeelogo.png`} alt="" />
            <h2 className="mb-0">{categoryName}</h2>
        </div>
    </>
  )
}

export default MenuTitle
