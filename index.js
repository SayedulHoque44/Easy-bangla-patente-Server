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
     const BooksCollection = client.db('easyBanglaPatenteDb').collection('Books')
     const videoPartsCollection = client.db('easyBanglaPatenteDb').collection('VideoPart')
     const CourseVideosCollection = client.db('easyBanglaPatenteDb').collection('CourseVideos')
  

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
       //  Get Single User  by email
     app.get('/useremail/:email',async(req,res)=>{
      const email = req.params.email
      // const query = {_id:new ObjectId(id)}
      const query = {email:email}
      const result = await usersCollection.findOne(query)
      res.send(result)
     })
       //  update verified user Single User  by email
     app.put('/useremail/:email',async(req,res)=>{
      const email = req.params.email
      const {verified} = req.body
      const query = {email:email}
      const updateDoc = {
        $set:{verified:verified}
      }
      const result = await usersCollection.updateOne(query,updateDoc)
      res.send(result)
     })
       // Patch payment receipt
     app.patch('/updateUser/:id',async(req,res)=>{
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
    // 
    //  Get All Books 
    app.get('/AllBooks',async(req,res)=>{
      const result = await BooksCollection.find().toArray()
      res.send(result)
    })
    //  Get single Books 
    app.get('/singleBook/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await BooksCollection.findOne(query)
      res.send(result)
    })
    //Add Book 
     app.post('/addBook',async(req,res)=>{

      const Book = req.body
      Book.pages = [
        {
          pageImage:Book.coverImage,
          index:0,
        }
      ]
      const result = await BooksCollection.insertOne(Book)
      res.send(result)
    })
//  patch page
app.patch('/AddPage/:id',async(req,res)=>{

  const id = req.params.id
  const query= {_id:new ObjectId(id)}
  const pageobj = req.body

  // 
  const book = await BooksCollection.findOne(query)
  // 
  const getLastIndex = (pages)=>{
    // console.log(pages)
    let index = 0

    for(let i of pages){
      if(i.index > index){
        index = i.index
      }
    }

    return parseInt(index)+1
  }
  const updateIndex = getLastIndex(book.pages)
// 
  const upBookWithPage ={
    $set:{pages:[...book.pages,{
      pageImage:pageobj.pageUrl ,
      index:updateIndex
    }]}
  } 
 
  const result = await BooksCollection.updateOne(query,upBookWithPage)
  res.send(result)
})
// Video Parts
 //  Get video parts
 app.get('/AllvideParts',async(req,res)=>{
  const result = await videoPartsCollection.find().toArray()
  res.send(result)
})
 //  Get videos by partId
 app.get('/CourseVideos/:partId',async(req,res)=>{
  const partId = req.params.partId
  const result = await CourseVideosCollection.find({partId:partId}).toArray()
  res.send(result)
})
 //  Get single video by VideoId
 app.get('/CourseVideosSingle/:videoId',async(req,res)=>{
  const videoId = req.params.videoId
  const query = {_id:new ObjectId(videoId)}
  const result = await CourseVideosCollection.findOne(query)
  res.send(result)
})
// Post a VideoPart 
app.post(`/addVideoPart`,async(req,res)=>{
const VideoPart = req.body
const result = await videoPartsCollection.insertOne(VideoPart)
res.send(result)
})
// Post a Single video in part
app.post(`/AddVideoInPart`,async(req,res)=>{
const {title, videoLink, partId} = req.body
const result = await CourseVideosCollection.insertOne({title,partId,videoLink:`https://d2na8awifhfga8.cloudfront.net/${videoLink}`})
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