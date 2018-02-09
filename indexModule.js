const ObjectID = require('mongodb').ObjectID;

function indexRecords(db,res) {

    return new Promise(function(resolve, reject) {

        db.collection('tasks').find({}).sort({ index: 1 }).toArray( (err, list) => {
            if (err) reject(err);

            for (let i = 0; i<list.length; i++) {

                const id = list[i]._id;
                const criterion = { '_id': new ObjectID(id) };
                db.collection(('tasks')).update(
                    criterion, { $set: { 'index': i } }
                )

            }
            resolve(res)
        });
    });

}

exports.indexRecords = indexRecords;