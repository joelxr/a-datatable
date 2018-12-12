let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcDvSx2dAwsE5B1YPjDLsgSli-mo78ad3PxojzsOubQ3BaJ_4a03v7BKkS37n5P2KMRbmj4uMKJo-KeGNq9lS_Hpcf9KTS--_MAA8NpNizM5s4-vLPrapNweumZkz5Lby1AClNeZTmlSeMUjZy_pJA0CkDiI8EmLIo2hhrdM9RwYA9mYv3uKEECtk28TmHpwHpRZRs'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode()) // eslint-disable-line

