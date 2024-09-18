import mongoose from 'mongoose';

const dbConnection = async () => {
   try {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "RevesionTest"
    })

    console.log('Connected to MongoDB Successfully...');
    
   } catch (error) {
    console.error('Error connecting to MongoDB:', error);
   }
};

export default dbConnection;