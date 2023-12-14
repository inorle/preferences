import React from 'react'
import FormPage from './formpage/formpage.jsx'
import { useState } from 'react'
import MatchPage from './match/matchpage.jsx'
const Board = () => {
    const [gamestage, setGameStage] = useState('1')
    return (
        <div>
            {gamestage == '1' ? <FormPage setGameStage={setGameStage} /> : <MatchPage/>}
    </div>
    )
}
export default Board