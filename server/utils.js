const slackUrl = 'https://hooks.slack.com/services/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';
const { IncomingWebhook } = require('@slack/client');
const webhook = new IncomingWebhook(slackUrl);

// file contains code repeated amongst multiple files
function isEmpty(obj) {
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

function sendSlack(message) {
    webhook.send(message, function(err, res) {
        if (err) {
            console.log('Error sending slack message:', err);
            return;
        }

        console.log('slack Message sent: ', res);
    });
}

//exporting it make it available to other files
module.exports = {
    isEmpty: isEmpty,
    sendSlack: sendSlack
};