import React, { useState } from 'react'
import './Modal.css'
import { BsCheck2Square } from "react-icons/bs";
import { MdOutlineSmsFailed } from "react-icons/md";


const Modal = ({ modalType, titleAlert, textAlert, nameButton }) => {

  const [active, setActive] = useState(true)

  const handleActive = () => {
    setActive(false)
  }
  console.log("SOY EL ACTIV DEL COMPONENTE MODAL", active)
  return (
    <div className={active === true ? 'modalBackground-container' : 'modalBackground-closed-container'}>

      <div className='modal-container'>
        <div className={modalType == 'exitoso' ? 'background-successful' : 'background-alert'}>
          <h2 className='titleAlert'> {titleAlert} </h2>
          <div className={modalType == 'exitoso' ? 'circle-successful' : 'circle-alert'}>
            {modalType === 'exitoso' ? <BsCheck2Square /> : <MdOutlineSmsFailed />}
          </div>
        </div>
        <p className='textAlert'>{textAlert}</p>
        <div className='button-container'>
          <button className={modalType == 'exitoso' ? 'buttonSuccessful' : 'buttonAlert'} onClick={handleActive}>{nameButton}</button>
        </div >
      </div>
    </div>

  )
}

export default Modal