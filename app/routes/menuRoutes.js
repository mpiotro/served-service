var express = require('express');

var routes = function (MenuItem) {

    var menuRouter = express.Router();

    var menuController = require('../controllers/menuController')(MenuItem);

    menuRouter.route('/')
        .post(menuController.post)
        .get(menuController.get);

    menuRouter.use('/:itemId', function (req, res, next) {
        MenuItem.findById(req.params.itemId, function (err, menuItem) {
            if (err)
                res.status(500).send(err);
            else if (menuItem) {
                req.menuItem = menuItem;
                next();
            } else {
                res.status(404).send('no item found');
            }
        });
    });

    menuRouter.route('/:itemId')
        .get(function (req, res) {
            var returnMenuItem = req.menuItem.toJSON();
            returnMenuItem.links = {};
            returnMenuItem.links.filterByThisVegetarian = 'http://'
                + req.headers.host
                + '/api/menu/?vegetarian=' 
                + returnMenuItem.vegetarian;

            res.json(returnMenuItem);
        })
        .put(function (req, res) {
            req.menuItem.name = req.body.name;
            req.menuItem.description = req.body.description;
            req.menuItem.price = req.body.price;
            req.menuItem.vegetarian = req.body.vegetarian;
            req.menuItem.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.menuItem);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;
            for (var key in req.body) {
                req.menuItem[key] = req.body[key];
            }
            req.menuItem.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.menuItem);
                }
            });
        })
        .delete(function (req, res) {
            req.menuItem.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            })
        });

    return menuRouter;
}

module.exports = routes;