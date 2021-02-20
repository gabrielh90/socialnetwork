const getRandomToken = (len = 64) => {
    let token = '';
    while(token.length < len){
        token += Math.random().toString(36).substr(2, 100);
    }
    return token.substr(0, 64);
}
const arrayBufferToBase64 = (buffer, avatarType='') => {
    // console.log(buffer);
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));        
    bytes.forEach((b) => binary += String.fromCharCode(b));       
    return 'data:' /*+ avatarType*/ + ';base64,' + Buffer.from(binary, 'latin1').toString('base64');
    // return 'data:' + avatarType + ';base64,' + Buffer.from(binary).toString('base64');
};

module.exports = {getRandomToken, arrayBufferToBase64};