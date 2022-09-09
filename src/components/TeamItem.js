import React from 'react'

export const TeamItem = ({num,teamName,teamLogo, isChecked, selectBorder,selectedTeam,id}) => {
       
    return (
        <div onClick={() =>
        {
            selectedTeam(id)
            alert("ok")
        }} className={`team-item ${ isChecked ? selectBorder : ''}`}>
            <div>
                <span className='num'>{num}</span>
                <p className='name'>{teamName}</p>
            </div>
            <img src={teamLogo} alt=""/>
        </div>
    )

}
