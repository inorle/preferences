import React, { useEffect } from "react";
import { useState } from "react";
import './styles.css'
let id = 0;
const FormPage = ({setGameStage}) => {
    const [currpref, setCurrpref] = useState('')
    const [listofPref, setListofPref] = useState([])
    const [name, setName] = useState('')
    const updatePreferences = (e) => {
        e.preventDefault();
        if (currpref.length) {
            setListofPref(prevstate => [...prevstate].concat({ pref: currpref, id: id++ }))
            setCurrpref("")
        }

    }
    const SendPreferences = async () => {
        try {
            const preferences = listofPref.map((el)=>el.pref)
            const sent = await fetch('/api/initialsubmit', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name, preferences: preferences, game_id:1 })
            })
        }
        catch (error) {
            console.log("Problem Sending Preferences")
        }
        finally {
            setGameStage("2")
        }
    }

    const deleteElement = (index) => {
        setListofPref(listofPref.filter((el)=> el.id!=index))
    }
    return (
        <div id='form'>
            <p> Who's playing </p> 
            <div>
                <input onChange={(e)=>setName(e.target.value) } value={name}></input>
            </div>
            <p>Add Preferences:</p>
            <p>Suggested Amount is 10</p>
            <form onSubmit={updatePreferences} >
            <input type="text" onChange={(e) => setCurrpref(e.target.value)} value={currpref}></input>
                <input type="submit" value="+" />
            </form>
            <ul id= 'list'>
                {listofPref.map((el)=> <li key={el.id}> {el.pref} <button onClick={()=>deleteElement(el.id)}>x</button></li>)}
            </ul>
            <button onClick={SendPreferences}> Submit Preferences</button>
        </div>


    )
}
export default FormPage;