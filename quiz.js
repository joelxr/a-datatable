console.log(String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115)) // eslint-disable-line

 let fernet = require('fernet')
 let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM')
 // Oh no! The code is going over the edge! What are you going to do?
 let message = 'gAAAAABcJLeLmOuV1O94eKzRokepzWRCjvpPoEk4w0hgMDAGTx07Y0PYFXmQfo-fJg_K5bNmqDYnMF6Qx9oZl8oSCVNcp_uhvWyd295oCUl3xWDj__KA_AbABhp1vx4jZkUfNjVZbhgO7I4PZKj5u7yBgvZkDMIPOGbq9brssUkFtmnX_aqU71AXqnpLRdMmsBrP6b4oTLSw'
 let token = new fernet.Token({secret: secret, token: message, ttl:0})
 console.log(token.decode()) // eslint-disable-line

