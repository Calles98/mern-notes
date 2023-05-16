import app from './app'
import "dotenv/config";
import mongoose from 'mongoose';  


mongoose.connect("mongodb://127.0.0.1:27017/NotesAppDB")
.then(( )=> {
    console.log("Connected to MongoDB");
    app.listen(8000, () => {
        console.log("Server running on port 8000");
    }); 
})
.catch(console.error);

// interface IUser {
//     name: string;
//     email: string;
//     avatar?: string;
//   }

// const userSchema = new mongoose.Schema<IUser>({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     avatar: String
//   });
  
//   // 3. Create a Model.
//   const User = mongoose.model<IUser>('User', userSchema);
 