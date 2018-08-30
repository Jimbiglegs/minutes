import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

    render(){      
        return (            
            <header className='mb-auto'>           
                <nav className="navbar navbar-expand-md navbar-light fixed-top"
                                style={{"background-color":"lightgray"}}>                   
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
                                <Link to='/home' className='nav-link'>Home</Link>
                            </li> 
                            <li className="nav-item">
                                <Link to='/tasks' className='nav-link'>Tasks</Link>
                            </li>   
                            <li className="nav-item">
                                <Link to='/meetings' className='nav-link'>Meetings</Link>
                            </li>                     
                            <li className="nav-item">
                                <Link to='/Create' className='nav-link'>Create</Link>
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
                    <ul className="navbar-nav ml-auto">
                        <li className='nav-item'>
                            <Link to='/create' className='btn btn-primary'>Create</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/create' className='btn btn-success'>Schedule</Link>
                        </li>
                     </ul>
                    </div> 
                </nav>
            
            </header>
            
    
        )
    }
}

