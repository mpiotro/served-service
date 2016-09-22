var menuController = function (MenuItem) {

    var post = function (req, res) {

        var menuItem = new MenuItem(req.body);

        if (!req.body.name) {
            res.status(400);
            res.send('Menu item name is required');
        } else if (!req.body.price) {
            res.status(400);
            res.send('Menu item price is required');
        } else {
            menuItem.save();
            res.status(201);
            res.send(menuItem);
        }
    }

    var get = function (req, res) {

        var query = [];
        if (req.query.vegetarian) {
            query.vegetarian = req.query.vegetarian
        }
        MenuItem.find(query, function (err, menu) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnMenu = [];
                menu.forEach(function (element, index, array) {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/menu/' + newBook._id;
                    returnMenu.push(newBook);

                })
                res.json(returnMenu);
            }
        });
    }

    return {
        post: post,
        get: get
    }
}

module.exports = menuController;