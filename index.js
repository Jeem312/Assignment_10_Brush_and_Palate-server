
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wibgfjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
      const categoryCollection =  client.db("craftDB").collection('category');  
    
      app.get('/categories', async(req,res)=>{
        const cursor = categoryCollection.find();
        const result = await cursor.toArray();
        res.send(result);
       })
       app.get('/categories/:subcategory_name',async(req,res)=>{
        
        const result = await categoryCollection.find({subcategory_name:req.params.subcategory_name}).toArray();
          res.send(result);
        })
       
    app.post('/CraftIteam',async(req,res)=>{
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
      
      const result = await craftCollection.find({Email:req.params.email
      }).toArray();
        res.send(result)
      })
      app.patch('/CraftIteam/:id', async(req,res)=>{
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
       
        const updatedInfo = req.body;
        const data ={
          $set:{
            name : updatedInfo.name,
            Photo_Url:updatedInfo.Photo_Url,
            Email:updatedInfo. Email,
            Item_name:updatedInfo.Item_name,
            subcategory_Name:updatedInfo.subcategory_Name,
            description:updatedInfo.description,
            customization:updatedInfo.customization,
            rating:updatedInfo.rating,
            price:updatedInfo.price,
            stockStatus:updatedInfo.stockStatus,
           
          }
        }
          const result = await craftCollection.updateOne(filter,data);
           res.send(result);
      })
      app.delete('/mycart/:id',async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result =await craftCollection.deleteOne(query);
        res.send(result);
       })
      app.get('/CraftIteam/:id',async(req,res)=>{
        const id =req.params.id;
        const query = {_id:new ObjectId(id)}
        const result =await craftCollection.findOne(query)
      res.send(result) }
      )
    
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