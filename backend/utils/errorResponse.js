class ErrorResponse extends Error {
    constructor(message, statusCode, description) {
        super(message);
        this.statusCode = statusCode;
        this.description = description;
    }
}

module.exports = ErrorResponse; 