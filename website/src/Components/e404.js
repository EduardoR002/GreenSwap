import React from 'react';
import {Link} from 'react-router-dom';
import '../CSS/e404.css'

export default function E404(){
    return(
        <>
        <div className='container'>
            <div className='third'>
                <h1 className='poppins-regular'>404</h1>
            </div>
            <div className='third'></div>
            <div className='gif'></div>
            <div className='third' id='last'>
                <h2 className='poppins-regular'>Page not found</h2>
                <button>
                    <Link className='poppins-regular' to="/">Home</Link>
                </button>
            </div> 
        </div>
        </>
    )
}