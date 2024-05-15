import React from 'react';
import {Link} from 'react-router-dom';
import '../CSS/e404.css'

export default function E404(){
    return(
        <>
        <div className='container-02'>
            <div className='part-02' />
            <div className='gif-02' />
            <div className='part-02' />
            <div className='part-02'>
                <button className='button-04 button-02'>
                    <Link className='poppins-regular link-04' to="/">Home</Link>
                </button>
            </div>
        </div> 
        </>
    )
}