var should = require('should'),
    sinon = require('sinon');

describe('Menu Controller Tests', function () {
    describe('Post method', function () {
        it('should not allow an empty name on post', function () {

            var MenuItem = function (menuItem) {
                this.save = function () { }
            };
            var req = {
                body: {
                    description: "Test item",
                    price: 199
                }
            }
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            var menuController = require('../app/controllers/menuController')(MenuItem);
            menuController.post(req, res);

            res.status
                .calledWith(400)
                .should.equal(true, 'Bad status' + res.status.args[0][0]);

            res.send
                .calledWith('Menu item name is required')
                .should.equal(true)
        })
    })
})