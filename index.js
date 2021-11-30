const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('welcome home page');
});


const uri = "mongodb+srv://mydbuser1:Q0AlzP3yLxbR7NDs@cluster0.h7sw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



client.connect(err => {
    const serviceCollection = client.db("medi-care").collection("data");
    const contactInformation = client.db("medi-care").collection("contactInfo");
    // perform actions on the collection object

    //GET METHOD FOR FIND DATA
    app.get('/services', async (rea, res) => {
        const cursor = await serviceCollection.find({});
        const result = await cursor.toArray();
        res.send(result)
    });

    //POST METHOD FOR INSERT DATA
    app.post('/contact', async (req, res) => {
        const query = req.body;
        const result = await contactInformation.insertOne(query);
        console.log(result);
        res.send(result)
    });

    //POST METHOD FOR ADD SERVICES
    app.post('/services', async (req, res) => {
        const query = req.body;
        const result = await serviceCollection.insertOne(query)
        res.send(result);
    })


});


app.listen(port, () => {
    console.log('surver running on port:', port);
});
