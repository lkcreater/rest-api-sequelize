
module.exports =  (errors) => {
    let errMsg = [];
    const messageFunc = (key, object) => {
        const message = {
            'required': `${key} : This field cannot be left blank`,
        }

        return (message[object.rule]) ? message[object.rule] : object.message;
    }

    if(errors){
        for (const [key, value] of Object.entries(errors)) {
            errMsg.push(messageFunc(key, value));
        }
    }    
    return errMsg;
}