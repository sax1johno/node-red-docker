/**
* Use this function to decorate the express API gateway / application with any 
* overrides you'd like.  You can add global middleware, custom routes, or any other 
* features you'd like.
**/

module.exports = function(app) {
	// app.use(some_middlware);
	// app.get("/test", (req, res) => { res.send("testing")});
	return app;
}