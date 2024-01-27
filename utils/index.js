const bcrypt = require('bcrypt');
module.exports.generatePasswordHash = async function(password) {
    const salt_round = 10;
    return await bcrypt.hash(password, salt_round);
};

module.exports.validatePassword = async function (password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
};