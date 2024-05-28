import React from 'react';
import {Link} from 'react-router-dom';
import '../CSS/e404.css'
import { fetchProduct } from '../APIF/prod.fetch';

export default function E404(){

    //HERE IS THE PROBLEM
    fetchProduct(3)
    .then(product => {
        console.log("e404.js fetchProduct(3) result:", product); // Log completo do produto
        if (product) {
            console.log("e404.js fetchProduct(3) = " + product.name); // Acessando a propriedade name
        } else {
            console.error("Product is undefined or null.");
        }
    })
    .catch(error => {
        console.error('Error fetching product:', error);
    });

   
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