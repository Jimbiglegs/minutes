import React, { Component } from 'react';

export default class Header extends Component {


    render(){
       

        return (
            <header className='mb-auto'>
            
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    
                    <img src="https://png.icons8.com/color/50/000000/multi-edit.png"></img>
                    <a className="navbar-brand" href="#" >Minutes</a>
                    <ul className="navbar-nav ml-auto">
                        
                       
                            <li className="nav-item"> 
                                <a className="nav-link" href="#">Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign Up</a>
                            </li>  
                     

                       
                            <li className="nav-item">
                                <a className="nav-link" href="#" >Welcome, </a>
                            </li>                           
                            <li className="nav-item">
                                <a className="nav-link" href="#" >Home</a>
                            </li> 
                            <li className="nav-item">
                                <a className="nav-link" href="#" >Tasks</a>
                            </li>   
                            <li className="nav-item">
                                <a className="nav-link" href="#" >Create</a>
                            </li>                             
                            <li className="nav-item">
                                <a className="nav-link" href="#" >Sign Out</a>
                            </li>   
                       
                                         
                    </ul>
                </nav>
            </header>
    
        )
    }
}

