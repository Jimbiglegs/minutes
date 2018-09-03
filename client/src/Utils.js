export default class Utils {

    static isEmpty(string) {
        if(!string || string === null) {
            return true;
        }

        if(string.trim() === '') {
            return true;
        }

        return false;
    }
}