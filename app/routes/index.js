var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
	app.post('/tasks', (req,res) => {
		const todo = {title: req.body.title, prior: req.body.prior, state: req.body.state, deadLine: req.body.deadLine};
		db.collection('tasks').insert(todo, (err,result) => {
			if (err) {
				res.send({'error': 'Error'});
			} else {
                console.log(req.body);
				res.send(result.ops[0]);
			}
		});
	});
	app.get('/tasks', (req,res) => {
		db.collection('tasks').find({}).toArray( (err,items) => {
			if (err) {
				res.send({'error':'Error'});
			} else {
				res.send(items);
			}
		});
	});
	app.delete('/tasks/:id', (req,res) => {
        console.log(req.body);
		const id = req.params.id;
		const criterion = { '_id': new ObjectID(id) };
		db.collection('tasks').remove(criterion, (err,item) => {
			if (err) {
				res.send({'error':'Error'});
			} else {
				res.send('Task with id ' + id + 'is deleted');
			}
		});
	});
	app.put('/tasks/:id', (req,res) => {
		const id = req.params.id;
		const criterion = { '_id': new ObjectID(id) };
		const todo = {title: req.body.title, prior: req.body.prior, state: req.body.state, deadLine: req.body.deadLine};
		db.collection('tasks').update(criterion, todo, (err,result) => {
			if (err) {
				res.send({'error':'Error'});
			} else { 
				res.send(todo);
			}
		})
	})
};