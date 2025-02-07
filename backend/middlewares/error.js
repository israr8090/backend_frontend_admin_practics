//--
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    };
};

//--
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    //--
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //--If Json Web Token is Invalied
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is Invalied. Try Again!..";
        err = new ErrorHandler(message, 400);
    }

    //--If Token Expired
    if (err.code === "TokenExpiredError") {
        const message = `Invalied ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //--If Cast Error Occured
    if (err.code === "TokenExpiredError") {
        const message = `Invalied ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //--
    const errMessage = err.errors
        ? Object.values(err.errors)
            .map((error) => error.message)
            .join(" ")
        : err.message;

    //--
    return res.status(err.statusCode).json({
        success: false,
        message: errMessage,
    })
};

export default ErrorHandler;