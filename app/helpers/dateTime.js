var moment = require('moment');

module.exports = {
    now: () => {
        return moment().toDate();
    }
}