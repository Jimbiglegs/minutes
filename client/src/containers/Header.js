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
                    <a href="#">
                        <img src="https://img.clipartxtras.com/796efa4602ec208e4d33a786bed43e89_note-taking-royalty-free-cliparts-vectors-and-stock-illustration-taking-notes-clipart_1300-1205.jpeg" width="64" />
                    </a>
                    <div className='brand-name'>
                        Meeting Minutes
                    </div>
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
                        <IfClause condition={ !this.props.profile }>
                            <li className="nav-item">
                                <GoogleLogin
                                    clientId="207967201675-vgb9f164otahb3viu1j8qjvpkn4acgri.apps.googleusercontent.com"
                                    buttonText="Sign In"
                                    className='btn btn-success'
                                    scope='profile email https://www.googleapis.com/auth/calendar'
                                    discoveryDocs={ [ 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest' ] }
                                    onSuccess={ this.onGoogleSuccess }
                                    onFailure={ this.onGoogleFailure } />
                            </li>
                        </IfClause>
                        <IfClause condition={ this.props.profile }>
                            <li className='nav-item'>
                                <Link to='/adhocMeeting' className='nav-link'>Adhoc Meeting</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/scheduleMeeting' className='nav-link'>Schedule Meeting</Link>
                            </li>
                            <li className="dropdown">                       
                                 <a className='dropdown-toggle' aria-haspopup="true" aria-expanded="false" href="#" onClick={ this.toggleDropdown } >  
                                   <img className="rounded-circle nav-img" src={  this.props.profile ? this.props.profile.profileObj.imageUrl : ''}  style={{ width :"60px"}}/>
                                </a>
                                <div className={ 'dropdown-menu user-dropdown ' + dropDownExtraClass } aria-labelledby="dropdownMenuButton">
                                  <div className="dropdown-item styleUserWindow" style={{ 'height' : '65px'}}>
                                        <div>
                                             <img className="rounded-circle nav-img" src={  this.props.profile ? this.props.profile.profileObj.imageUrl : ''}  style={{ width :"60px"}}/>
                                        </div>
                                        <div>
                                            <h5 className='welcome-msg'>Welcome, {  this.props.profile ? this.props.profile.profileObj.name : ''}</h5>
                                            <a href='#'>{  this.props.profile ? this.props.profile.profileObj.email : ''}</a>
                                        </div>
                                  </div>
                                  <div className="dropdown-divider"></div>
                                <GoogleLogout buttonText='Sign Out'
                                              type='button'
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
  