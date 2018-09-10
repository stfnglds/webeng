var utils = exports;

utils.createErrorObject = function (errorCode, errorMessage) {
    return {
        code: errorCode,
        description: errorMessage,
    };
};
