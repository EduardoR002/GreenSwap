import React from 'react';
import {Link} from 'react-router-dom';
import '../CSS/e404.css'

export default function E404(){
    return(
        <>
        <div className='container-02'>
            <div className='part1-02'>
                <h1 className='poppins-regular h1-02'>404</h1>
                <h2 className='poppins-regular h2-02'>Page not found, please go back</h2>
            </div>
            <div className='gif-02' />
            <div className='part2-02' />
            <div className='part3-02'>
                <button className='button-04 button-02'>
                    <Link className='poppins-regular link-04' to="/">Home</Link>
                </button>
            </div>
        </div> 
        </>
    )
}