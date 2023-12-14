import React, { useEffect } from "react";
import { useState } from "react";
import './styles.css'
let id = 0;
const FormPage = () => {
    const [currpref, setCurrpref] = useState('')
    const [listofPref, setListofPref] = useState([])
    const updatePreferences = (e) => {
        e.preventDefault();
        if (currpref.length) {
            setListofPref(prevstate => [...prevstate].concat({ pref: currpref, id: id++ }))
            setCurrpref("")
        }

    }
    const deleteElement = (index) => {
        setListofPref(listofPref.filter((el)=> el.id!=index))
    }
    return (
        <div id='form'>
            Add Preference:
            <form onSubmit={updatePreferences} >
            <input type="text" onChange={(e) => setCurrpref(e.target.value)} value={currpref}></input>
            <input type="submit" />
            </form>
            <ul>
                {listofPref.map((el)=> <li key={el.id}> {el.pref} <button onClick={()=>deleteElement(el.id)}>x</button></li>)}
            </ul>
            <button> </button>
        </div>


    )
}
export default FormPage;