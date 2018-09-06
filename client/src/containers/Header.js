import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import IfClause from '../component/IfClause';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';


class Header extends Component {

    state = {
        dropdownOpen : false
    }

    toggleDropdown = () => {
        let value = !this.state.dropdownOpen;
        this.setState({ dropdownOpen : value });
    }

    onGoogleSuccess = (userObject) => {
        console.log('google object', userObject)
        this.props.setUserProfile(userObject);
        this.props.history.push('/home');

        // save in local store
        localStorage.setItem('profile', JSON.stringify(userObject));
    }

    onGoogleFailure = (error) => {
        console.log('error user object: ', error);
    }

    onGoogleSignOut = () => {
        this.props.setUserProfile(null);
        this.setState({ dropdownOpen : false });
        // remove from local store
        localStorage.removeItem('profile');
    }

    render() {      
        let dropDownExtraClass = '';
        if(this.state.dropdownOpen) {
            dropDownExtraClass = 'show';
        }

        return (            
            <header className='mb-auto'>           
                <nav className="navbar navbar-expand-md navbar-light fixed-top"
                                style={{ backgroundColor :"lightgray"}}>                   
                    <a className="navbar-brand" href="#" >
                    <a href="https://clipartxtras.com/download/a1f30746717f6273b8e5db7606d2ffc1e011a847.html" title="Image from clipartxtras.com"><img src="https://img.clipartxtras.com/796efa4602ec208e4d33a786bed43e89_note-taking-royalty-free-cliparts-vectors-and-stock-illustration-taking-notes-clipart_1300-1205.jpeg" width="70" alt="taking notes clipart" /></a>
                    </a>
                    <ul className="navbar-nav ml-auto">
                        <IfClause condition={ this.props.profile }>
                            <li className="nav-item">
                                <Link to='/home' className='nav-link'>Home</Link>
                            </li> 
                            <li className="nav-item">
                                <Link to='/tasks' className='nav-link'>Tasks</Link>
                            </li>   
                            <li className="nav-item">
                                <Link to='/meetings' className='nav-link'>Meetings</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/teams' className='nav-link'>Teams</Link>
                            </li>
                        </IfClause>                                              
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <IfClause condition={ !this.props.profile }>
                            <li className="nav-item">
                                <GoogleLogin
                                    clientId="207967201675-vgb9f164otahb3viu1j8qjvpkn4acgri.apps.googleusercontent.com"
                                    buttonText="Sign In"
                                    className='btn btn-success'
                                    onSuccess={ this.onGoogleSuccess }
                                    onFailure={ this.onGoogleFailure } />
                            </li>
                        </IfClause>
                        <IfClause condition={ this.props.profile }>
                            <li className='nav-item'>
                                <Link to='/adhocMeeting' className='nav-link'>Adhoc Meeting</Link>
                            </li>
                            <li className='nav-item'>
                                &nbsp;
                            </li>
                            <li className='nav-item'>
                                <Link to='/scheduleMeeting' className='nav-link'>Schedule Meeting</Link>
                            </li>
                            <li className='nav-item'>
                                &nbsp;
                            </li>
                            <li className="dropdown">                       
                                 <a className='dropdown-toggle' aria-haspopup="true" aria-expanded="false" href="#" onClick={ this.toggleDropdown } >  
                                   <img className="rounded-circle nav-img" src={  this.props.profile ? this.props.profile.profileObj.imageUrl : ''}  style={{ width :"60px"}}/>
                                </a>
                                <div class={ 'dropdown-menu user-dropdown ' + dropDownExtraClass } aria-labelledby="dropdownMenuButton">
                                  <div class="dropdown-item">Welcome {  this.props.profile ? this.props.profile.profileObj.name : ''}</div>
                                  <div class="dropdown-divider"></div>
                                <GoogleLogout buttonText='Sign Out'
                                              onLogoutSuccess={ this.onGoogleSignOut } 
                                              className='btn btn-info dropdown-item' /> 
                                </div>                                              
                            </li>
                        </IfClause>
                     </ul>
                </nav>
            
            </header>
            
    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    };
};

export default connect(mapStateToProps, AllAppActions.default)(withRouter(Header));
  