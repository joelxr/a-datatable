console.log(String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115)) // eslint-disable-line

let fernet = require('fernet')
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
// Oh no! The code is going over the edge! What are you going to do?
let message = 'gAAAAABcEQNiMz_eqZrbw5HUJc9qyPw9ibnxU4DbLlPqeIN20Rt1HAWkr8NrbAs-kJvWgPhdiFePqg-oK_t4XIJ06yOBKHwhdY0dF-GMddWoyNCqDq-gkmsJL32dIXbyzb_yaYXrkDKjHKMvTgFNkwAqn2zXMJ0T1ANBL6Tx0DM433zMyx3EjVn3t63jX-Rp9TA-B5yFZYBf'
let token = new fernet.Token({secret: secret, token: message, ttl:0})
console.log(token.decode()) // eslint-disable-line

