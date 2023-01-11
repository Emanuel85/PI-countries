import React from 'react'
import Buttom from '../Buttom/Buttom'
import './AboutMe.css'
import { AiOutlineMail, AiFillLinkedin } from "react-icons/ai";

const AboutMe = () => {
    return (
        <div className='text-container'>

            <p className='text-detail'>
                "¡Hola! Mi nombre es Emanuel y soy un desarrollador apasionado por crear soluciones tecnológicas para mejorar la vida de las personas. Recientemente terminé un bootcamp en el que tuve la oportunidad de profundizar mis habilidades en tecnologías como React, Redux, Sequelize, Postgrest, HTML, CSS, JavaScript, Git y GitHub, trabajando en un proyecto relacionado con los países.

                En mi corta carrera como desarrollador, he estado constantemente trabajando en mejorar mis habilidades y ampliando mi conocimiento. He aprendido a trabajar en equipo, a cumplir plazos y a adaptarme a diferentes metodologías de trabajo, lo que me ha permitido desempeñarme de manera eficiente en proyectos de diversa índole.

                Me considero una persona proactiva y creativa, y me gusta estar siempre al día en cuanto a las últimas tendencias en tecnología. Actualmente, estoy buscando nuevos desafíos profesionales para seguir creciendo como desarrollador y contribuir al éxito de las empresas en las que trabaje.

                Si estás buscando a un desarrollador dedicado y comprometido, no dudes en ponerte en contacto conmigo. Estoy ansioso por aplicar mis habilidades y conocimientos para ayudarte a alcanzar tus objetivos."
            </p>
            <div className='contact-container'>
                <AiOutlineMail />
                <p className='email'>emanuelquintanilla85@gmail.com</p>
            </div>
            <Buttom
                nameClass='button-homeAboutMe'
                description='INICIO'
                linkTo='/'
            />

            <Buttom
                nameClass='button-proyecto'
                description='PROYECTO'
                linkTo='/home'
            />
        </div>
    )
}

export default AboutMe