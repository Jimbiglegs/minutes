import react, {Component} from 'react';

export default class SignIn extends Component{
    render(){
        return(
        <div id="modalSignIn">
         <div>
          <div className="modal fade in" style="display: block;">
           <div className="modal-dialog">
             <form action="signIn">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 className="modal-title">Sign In</h4>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label for="signInModal-EmailInput">Email address</label>                  
                            <input name="email" type="email" required="" className="form-control" id="signInModal-EmailInput" placeholder="Enter email" value="" />
                        </div>
                        <div className="form-group">
                            <label for="signInModal-Password">Password</label>
                            <input name="password" type="password" required="" className="form-control" id="signInModal-Password" placeholder="Password" />
                        </div>
                        <div className="errorContainer alert alert-danger" style="display:none;"></div>                    
                    </div>
                    <div className="modal-footer">
                        <a href="/welcome?resetPassword">Forgot password</a>
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div> 
              </form>
            </div> 
           </div> 
          </div>
        </div>
        )
    }
}