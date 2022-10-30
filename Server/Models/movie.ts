//Step 1 -import Mongoose 
import mongoose from 'mongoose';
const Schema = mongoose.Schema; // alias for mongoose.Schema 

//Step 2 - Creat a Schema that matches the data 
const MovieSchema = new Schema 
({
    Name : String,
    Year : String,
    Director : String,
    Rating : String
},
{
    collection: "movies"
})

//Step 3 - Create a Model using the Schema
const Model = mongoose.model("movies", MovieSchema);

//Step 4 - Export the model -> This makes the file a module
export default Model;
