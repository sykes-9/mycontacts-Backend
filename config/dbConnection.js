const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        // Attempt to connect to the MongoDB database using the connection string
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
        // Log a success message if the connection is established
        console.log(
            'Database connected:',
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        // Log the error and exit the process with an error code if connection fails
        console.log(err);
        process.exit(1);
    }
};

// Export the connectDb function for use in other parts of the application
module.exports = connectDb;
