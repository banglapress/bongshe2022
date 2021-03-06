const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;



const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dbsda.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('bongshe2022');
        const ordersCollection = database.collection('orders');

        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order)
            console.log(result)
            res.json(result)
        })

        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.json(orders);
        })



    }

    finally {
        //   await client.close();
    }

}


run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Bongshe 2022 Server is OK. Database Running On Browser!')
})

app.listen(port, () => {
    console.log(`Bongshe 2022 app listening at http://localhost:${port}`)
})