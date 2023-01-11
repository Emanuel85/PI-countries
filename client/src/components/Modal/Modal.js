import React, { useState } from 'react'
import './Modal.css'
import { BsCheck2Square } from "react-icons/bs";
import { MdOutlineSmsFailed } from "react-icons/md";
import { Link } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import { useSelector } from 'react-redux';


const Modal = ({ modalType, titleAlert, textAlert, nameButton, linkTo }) => {

  const confirmed = useSelector(state => state.confirmed)


  console.log("SOY EL ACTIV DEL COMPONENTE MODAL", confirmed)
  return (
    <div className={confirmed === true ? 'modalBackground-container' : 'modalBackground-closed-container'}>
      <div className='modal-container'>
        <div className={modalType == 'exitoso' ? 'background-successful' : 'background-alert'}>
          <h2 className='titleAlert'> {titleAlert} </h2>
          <div className={modalType == 'exitoso' ? 'circle-successful' : 'circle-alert'}>
            {modalType === 'exitoso' ? <BsCheck2Square /> : <MdOutlineSmsFailed />}
          </div>
        </div>
        <p className='textAlert'>{textAlert}</p>
        <Link className='button-container' to={`${linkTo}`}>
          <button className={modalType == 'exitoso' ? 'buttonSuccessful' : 'buttonAlert'} onClick={actions.modalConfirmed()}>{nameButton}</button>
        </Link >
      </div>
    </div>

  )
}

export default Modal