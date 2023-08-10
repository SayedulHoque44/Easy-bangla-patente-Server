const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()
// middleware
app.use(cors())
app.use(express.json())

// //_____________________Mongodb_________________________
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xrxxnjj.mongodb.net/?retryWrites=true&w=majority`;

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
     client.connect();
 
     const usersCollection = client.db('easyBanglaPatenteDb').collection('users')
     const youtubeVideosCollection = client.db('easyBanglaPatenteDb').collection('youtubeVideo')
  

     //  Get All Users
     app.get('/users',async(req,res)=>{
       const result = await usersCollection.find().toArray()
       res.send(result)
      })
      
      //  Post A Single User
      app.post('/users',async(req,res)=>{
          
        const user = req.body
        const result = await usersCollection.insertOne(user)
        res.send(result)
         
      })
      //  Delete A Single User
      app.delete('/users/:id',async(req,res)=>{
          
        const id = req.params.id
        const query = {_id:new ObjectId(id)}
        const result = await usersCollection.deleteOne(query)
        res.send(result)
         
      })
      //  Active A  User
      app.patch('/users/:id',async(req,res)=>{
          
        const id = req.params.id
        const query = {_id:new ObjectId(id)}
        const status = req.body
        const updateDoc = {
          $set:status
        }
        const result = await usersCollection.updateOne(query,updateDoc)
        res.send(result)
      })
      //  Active A  User
      app.patch('/users/:id',async(req,res)=>{
          
        const id = req.params.id
        const query = {_id:new ObjectId(id)}
        const status = req.body
        const updateDoc = {
          $set:status
        }
        const result = await usersCollection.updateOne(query,updateDoc)
        res.send(result)
      })
      //  Make Paid A  User
      app.patch('/typeUser/:id',async(req,res)=>{
          
        const id = req.params.id
        const query = {_id:new ObjectId(id)}
        const type = req.body
        const updateDoc = {
          $set:type
        }
        const result = await usersCollection.updateOne(query,updateDoc)
        res.send(result)
      })
       //  Get Single User  by id
     app.get('/users/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      // const query = {email:email}
      const result = await usersCollection.findOne(query)
      res.send(result)
     })
       //  Get Single User  by id
     app.get('/useremail/:email',async(req,res)=>{
      const email = req.params.email
      // const query = {_id:new ObjectId(id)}
      const query = {email:email}
      const result = await usersCollection.findOne(query)
      res.send(result)
     })
       // Patch payment receipt
     app.patch('/paymentRecipt/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const ReciptAndNote = req.body
      const updateDoc = {
        $set:ReciptAndNote
      }
      const result = await usersCollection.updateOne(query,updateDoc)
      res.send(result)
     })
    //  Get youtube videos 
    app.get('/youtubeVideo',async(req,res)=>{
      const result = await youtubeVideosCollection.find().toArray()
      res.send(result)
    })
    //  Post youtube videos 
    app.post('/youtubeVideo',async(req,res)=>{

      const videoInfo = req.body
      const result = await youtubeVideosCollection.insertOne(videoInfo)
      res.send(result)
    })
    //  Delete youtube videos 
    app.delete('/youtubeVideo/:id',async(req,res)=>{

      const id = req.params.id
      const query = {_id:new ObjectId(id)}
      const result = await youtubeVideosCollection.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// 
app.get('/',(req,res)=>{
    res.send('easy-bangla-patente-server')
})


// Listener
app.listen(port,()=>{
    console.log(`patente Running on port : ${port}`)
})