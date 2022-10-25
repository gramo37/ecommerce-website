// Creating token and saving in cookie
exports.sendToken = async (user, res, statusCode) => {
    const token = await user.getJWTToken();    // Get Token

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24*60*60*1000
        )
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        "token": token,
        "user": user
    });
}