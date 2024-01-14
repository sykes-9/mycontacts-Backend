// Import constants for status codes
const { constants } = require('../constants');

// Custom error handling middleware function
const errorHandler = (err, req, res, next) => {
    // Determine the HTTP status code based on the response or default to 500 (Internal Server Error)
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Switch statement to handle different error scenarios
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            // Response for validation errors
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            // Response for resource not found errors
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.UNAUTHORIZED:
            // Response for unauthorized access errors
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            // Response for forbidden access errors
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            // Response for generic server errors
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            // Log a message for unexpected cases
            console.log('No Error, All good !');
            break;
    }
};

// Export the errorHandler middleware for use in other parts of the application
module.exports = errorHandler;
