import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import IfClause from '../component/IfClause';
import { connect } from 'react-redux';
import * as AllAppActions from './../AppStoreActions';
import { withRouter } from 'react-router-dom';


class Header extends Component {

    onGoogleSuccess = (userObject) => {
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

        // remove from local store
        localStorage.removeItem('profile');
    }

    render() {      
        return (            
            <header className='mb-auto'>           
                <nav className="navbar navbar-expand-md navbar-light fixed-top"
                                style={{ backgroundColor :"lightgray"}}>                   
                    <a className="navbar-brand" href="#" >
                        <img src="https://png.icons8.com/color/50/000000/multi-edit.png" style={{"width":"60px"}} alt=""></img>
                      MoM
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
                                    className='btn btn-primary'
                                    onSuccess={ this.onGoogleSuccess }
                                    onFailure={ this.onGoogleFailure } />
                            </li>
                        </IfClause>
                        <IfClause condition={ this.props.profile }>
                            <li className='nav-item'>
                                <Link to='/adhocMeeting' className='btn btn-primary'>Adhoc Meeting</Link>
                            </li>
                            <li className='nav-item'>
                                &nbsp;
                            </li>
                            <li className='nav-item'>
                                <Link to='/scheduleMeeting' className='btn btn-success'>Schedule Meeting</Link>
                            </li>
                            <li className='nav-item'>
                                &nbsp;
                            </li>
                            <li className='nav-item'>
                                <GoogleLogout buttonText='Sign Out'
                                              onLogoutSuccess={ this.onGoogleSignOut } 
                                              className='btn btn-primary' />
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
  