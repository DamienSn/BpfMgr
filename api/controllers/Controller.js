/**
 * Create an HTTP controller
 */
class Controller {
    /**
     * Init Controller
     * @param {Object} params
     * @param {Function} params.model Function to call on the model
     * @param {Array} params.modelArgs Args to pass to the model when calling it
     * @param {String} params.message Success message
     * @param {Boolean|Function} params.errorBehavior Comportment ot have when ther's an error
     */
    constructor(params) {
        this.args = params;
    }

    callModel(req, res) {
        this.args.model(this.args.modelArgs, (err, data) => {
            if (err) {
                this.args.errorBehavior
                    ? this.args.errorBehavior()
                    : res.status(200).json({ message: "error", error: err });
            } else {
                res.status(200).json({ message: this.args.message, data });
            }
        });
    }
}

module.exports = Controller;
