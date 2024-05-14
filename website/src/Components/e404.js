import React from 'react';
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
                    <h3 className='poppins-regular'>Back to Home</h3>
                </button>
            </div> 
        </div>
        </>
    )
}