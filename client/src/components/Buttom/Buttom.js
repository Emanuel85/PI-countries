import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Buttom.css'

const Buttom = ({ nameClass, description, linkTo }) => {
  return (
    <>
      <NavLink className={`${nameClass}`} to={`${linkTo}`}>
        <span>{`${description}`}</span>
      </NavLink>      
    </>
  )
}

export default Buttom


{/* <Linkto>
        <button>
          <span></span>
        </button>
      </Link> */}

    //   <>
    //   <NavLink className={`${nameClass}`} to={`${linkTo}`}>
    //     <span>{`${description}`}</span>
    //   </NavLink>

      
    // </>