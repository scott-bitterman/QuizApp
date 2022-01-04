/* 
    In a more robust system, these values would be stored in environment variables
    and supplied by something like AWS Secrets Manager.
*/
module.exports = {
    mongoDB: {
        db: 'TrustLayer',
        username: 'sbitterman',
        password: '<ContactAuthorForThisPasswordToTest>',
        connection: '@cluster0.qngtm.mongodb.net',
    },
    jwt: {
        secret: 'ThisCanBeAnything',
    },
}; 