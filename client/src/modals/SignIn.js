import react, {Component} from 'react';

export default class SignIn extends Component{
    render(){
        return(
        <div id="modalSignIn">
         <div>
          <div class="modal fade in" style="display: block;">
           <div class="modal-dialog">
             <form action="signIn">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Sign In</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="signInModal-EmailInput">Email address</label>                  
                            <input name="email" type="email" required="" class="form-control" id="signInModal-EmailInput" placeholder="Enter email" value="" />
                        </div>
                        <div class="form-group">
                            <label for="signInModal-Password">Password</label>
                            <input name="password" type="password" required="" class="form-control" id="signInModal-Password" placeholder="Password" />
                        </div>
                        <div class="errorContainer alert alert-danger" style="display:none;"></div>                    
                    </div>
                    <div class="modal-footer">
                        <a href="/welcome?resetPassword">Forgot password</a>
                        <button type="submit" class="btn btn-primary">Sign in</button>
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