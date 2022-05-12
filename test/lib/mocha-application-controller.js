const {ApplicationController} = require("../../public/lib/ApplicationService");
const assert = require("assert");
const sinon = require("sinon");

describe('Test application service', function () {
    it('Application should start', function () {
        assert.doesNotThrow(function () {
            new ApplicationController();
        })
    })

    it('Should return two details', function () {
        const applicationController = new ApplicationController();
        const res = {
            status: sinon.fake.returns(),
            json: sinon.fake.returns()
        }
        applicationController.getDetails(null, res);

        assert.ok(res.status.calledWith(200));
        assert.ok(res.json.calledWith([
            {id: 1, name: 'detail 1'},
            {id: 2, name: 'detail 2'}
        ]));

        assert.equal(res.status.getCall(0).firstArg, 200);
        assert.deepEqual(res.json.getCall(0).firstArg, [
            {id: 1, name: 'detail 1'},
            {id: 2, name: 'detail 2'}
        ])
    })
})