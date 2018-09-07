export default class Utils {

    static isEmpty(obj) {
        if(!obj || obj === null) {
            return true;
        }

        if(Array.isArray(obj) && obj.length === 0) {
            return true;
        }

        if(typeof obj === 'string' && obj.trim() === '') {
            return true;
        }

        return false;
    }

    static error(title) {
        Utils.toast(title, 'danger');
    }

    static info(title) {
        Utils.toast(title, 'info');
    }

    static warn(title) {
        Utils.toast(title, 'warning');
    }

    static success(title) {
        Utils.toast(title, 'success');
    }

    static toast(title, level) {
        let event = new Event('minutes-toast');
        event.title = title;
        event.level = level;
        document.dispatchEvent(event);
    }

    static validateEmail(email) {
        console.log('validate email: ' + email);
        
        if(!email || email == null) {
            return false;
        }
        
        if(email.trim().length == 0) {
            return false;
        }

        let index = email.indexOf('@');
        if(index <= 0) {
            return false;
        }

        if(index == email.length - 1) {
            return false;
        }

        return true;
    }

}