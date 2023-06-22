require("dotenv").config();
const jwt = require("jsonwebtoken"); //this is used to generate and verify JSON web tokens
const { SECRET } = process.env;

module.exports = {
  isAuthenticated: (req, res, next) => {
    // this function invokes the next middleware function in the chain
    const headerToken = req.get("Authorization");

    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401); // sends an unathourzied 401 response to the client
    }

    let token; // declares the variable token & will be used to store the decoded JWT

    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err; // This block of code is used to verify the authenticity and integrity of the JWT. It attempts to verify the headerToken using the jwt.verify method, passing in the token and the SECRET as arguments. If an error occurs during verification, it sets the statusCode property of the error object to 500 and throws the error.
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    } // This conditional statement checks if the token variable is falsy. If it is, it creates a new Error object with the message "Not authenticated." and sets the statusCode property to 401. Error message will appear.

    next();
  }, // If all the authentication checks pass, this line invokes the next function to proceed to the next middleware in the chain.
};
