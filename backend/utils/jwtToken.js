//--Token generator
export const generateToken = (User, message, statusCode, res) => {

    //--generateJsonWebToken is defined in User Schema
    const token = User.generateJsonWebToken();

    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // expires in 1 day
        httpOnly: true, // secure: true for https
        
    }).json({
        success: true,
        message,
        token,
        User,
    });
};

