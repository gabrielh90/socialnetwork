const getRandomToken = (len = 64) => {
    let token = '';
    while(token.length < len){
        token += Math.random().toString(36).substr(2, 100);
    }
    return token.substr(0, 64);
}

module.exports = getRandomToken;