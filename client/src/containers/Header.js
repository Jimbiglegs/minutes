import React, { Component } from 'react';

export default class Header extends Component {


    render(){
       

        return (
            
            <header className='mb-auto'>
            
                <nav className="navbar navbar-expand-md navbar-light fixed-top"
                                style={{"background-color":"lightgreen"}}>                   
                    <a className="navbar-brand" href="#" >
                    <img src="https://png.icons8.com/color/50/000000/multi-edit.png" style={{"width":"60px"}} alt=""></img>
                      MoM</a>
                    <div className='container'>
                    <ul className="navbar-nav ml-auto">
                      
                       
                            <li className="nav-item"> 
                                <a className="nav-link" href="#">Sign In</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Sign Up</a>
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
                                <a className="nav-link dropdown-toggle" 
                                   data-toggle="dropdown" 
                                   id="userDropdown" 
                                   aria-haspopup="true" aria-expanded="false"
                                   href="#" >Welcome,</a>

                                <div className="dropdown-menu" aria-labeledby="userDropdown">
                                    <a className="dropdown-item" href="#" >Profile</a>
                                    <a className="dropdown-item" href="#" >Setting</a>
                                    <a className="dropdown-item" href="#" >SignOut</a>
                                </div>   
                            </li>   
                       
                                              
                    </ul>
                    </div> 
                </nav>
            
            </header>
            
    
        )
    }
}

