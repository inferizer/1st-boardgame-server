-REGISTER
POST /auth/register
BODY email, password, confirmPassword
RESPONSE
201 {accessToken : String} ex. {accessToken : "" }
400 {message : String}
500 {message : String}

-LOGIN
POST auth/login
BODY email, password
RESPONSE
201 {accessToken : String , user: {id: Int, firstName: String, lastName: String }}
400 {message : String}
500 {message : String}
