module.exports = class ControllerError extends Error {

    constructor(msg, status, controller) {
        super(msg);
        this.name = 'Controller Error';
        this.message = msg;
        this.msg = msg;
        this.status = status;
        this.controller = controller;
        Error.captureStackTrace(this, this.constructor);
    }

};
