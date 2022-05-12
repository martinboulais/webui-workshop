class ApplicationController {
    /**
     * Return the application's details
     * @param req
     * @param res
     */
    getDetails(req, res) {
        res.status(200)
        res.json([
            {id: 1, name: 'detail 1'},
            {id: 2, name: 'detail 2'}
        ]);
    }
}

module.exports.ApplicationController = ApplicationController;