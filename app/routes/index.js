const ObjectID = require('mongodb').ObjectID;
const indexModule = require('../../indexModule');

module.exports = function(app,db) {
	app.post('/tasks', (req,res) => {
		const todo = {
			title: req.body.title,
			prior: req.body.prior,
			state: req.body.state,
			deadLine: req.body.deadLine,
			index: Number(req.body.index)
		};
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
		db.collection('tasks').find({}).sort({index:1}).toArray( (err,items) => {
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
                indexModule.indexRecords(db);
			}
		});
	});
	app.put('/tasks/:id', (req,res) => {
		const id = req.params.id;
		const criterion = { '_id': new ObjectID(id) };
		const todo = {
			title: req.body.title,
			prior: req.body.prior,
			state: req.body.state,
			deadLine: req.body.deadLine,
			index: Number(req.body.index)
		};
		db.collection('tasks').update(criterion, todo, (err,result) => {
			if (err) {
				res.send({'error':'Error'});
			} else { 
				res.send(todo);
			}
		})
	})
    app.patch('/tasks/:id', (req,res) => {
        const id = req.params.id;
        const criterion = { '_id': new ObjectID(id) };
        const index = Number(req.body.index);
        console.log(index);
        db.collection(('tasks')).update(criterion, { $set: { 'index': index } }, (err,result) => {
            if (err) {
                res.send({'error':'Error'});
            } else {
                indexModule.indexRecords(db,res)
					.then(res => res.send({'id': id}))
            }
		})
    })
};