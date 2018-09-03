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
        let event = new Event('minutes-toast');
        event.title = title;
        event.level = 'danger';
        document.dispatchEvent(event);

    }

}