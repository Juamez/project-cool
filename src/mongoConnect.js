const mongoose = require('mongoose')
require('dotenv').config()
const {User, createUser} = require('./models/models')

const uri = `mongodb://${process.env.LOCALHOST}:${process.env.PORT_DB}/${process.env.DB_NAME}`

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Conection error: '))
db.once('open', () => {
	console.log('connected to mongodb')
})

async function runClient() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		await createUser()
		await User.find({})
	} catch(err) {
		console.error(err)
	} finally {
		mongoose.connection.close(console.log('disconneced from mongodb'))
	}
}

runClient()


// const client = new MongoClient(uri)
// const dbName = "sample_input"
// const collectionName = "collection"

// async function runClient() {
// 	try {
// 		await client.connect()
// 		console.log('successfully connected to db mongo')
// 	} catch (e) {
// 		console.error(e)
// 	}
// }

// async function getQuery(nameParam) {
// 	runClient()
// 	try {
// 		const dbP = client.db(dbName)
// 		const coll = await dbP.collection(collectionName).find(nameParam).toArray()
// 		console.log(coll)
// 		return coll
// 	} finally {
// 		await client.close()
// 	}
// }

// module.exports = { getQuery}