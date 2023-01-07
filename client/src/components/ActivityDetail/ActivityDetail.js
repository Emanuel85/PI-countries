import React from 'react'
import './ActivityDetail.css'

const ActivityDetail = ({ name, difficulty, duration, season, img }) => {
    
    return (
        <div className='activityImage' style={{ backgroundImage: `url(${img})` }}>

            <div>
                <div className={`circleName level${difficulty}`}> </div>                
            </div>
            <div>
                <div className='circleDuration'> </div>
                <p className={duration < 10 ? 'duration small': 'duration'}> {duration}</p>
            </div>  
            <div>
                <div className={`circleSeason`} id={`${season}`} >  </div>
            </div>
            <div className='divInfoActivity'>
                <p className='pActivity'> {name} </p>
            </div>
        </div>
    )
}

export default ActivityDetail