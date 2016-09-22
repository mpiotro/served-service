var should = require('should'),
    request = require('supertest'),
    app = require('../app/app.js'),
    mongoose = require('mongoose'),
    MenuItem = mongoose.model('MenuItem'),
    agent = request.agent(app);

describe('Menu CRUD Test', function () {
    it('should allow a menu item to be posted and return _id and vegetarian props', function (done) {
        var menuItemPost = { name: 'Test menu item', description: 'Testing post method', price: 199 };
        agent.post('/api/menu')
            .send(menuItemPost)
            .expect(200)
            .end(function (err, results) {
                results.body.vegetarian.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })

    afterEach(function (done) {
        MenuItem.remove().exec();
        done();
    })

})
