
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.wibgfjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wibgfjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const craftCollection = client.db("craftDB").collection('craft');      

    app.post('/addCraft',async(req,res)=>{
      const craftInfo = req.body;
      console.log(craftInfo);
      const result = await craftCollection.insertOne(craftInfo);
      res.send(result);
     })
    
     app.get('/CraftIteam', async(req,res)=>{
      const cursor = craftCollection.find();
      const result = await cursor.toArray();
      res.send(result);
     })
      
     app.get('/mycart/:email',async(req,res)=>{
      console.log(req.params.email)
      const result = await craftCollection.find({Email:req.params.email
      }).toArray();
        res.send(result)
      })
    
     app.get('/craftDetails/:id',async(req,res)=>{
      const id = req.params.id;
     const query = {_id: new ObjectId(id)};
     const result = await craftCollection.findOne(query);
     res.send(result);
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/',(req,res)=>{
    res.send('server is running');
})

 app.listen(port,()=>{
    console.log(`port:${port}`)
 })