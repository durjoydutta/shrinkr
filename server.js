import app from './src/app.js';
import connectDB from './src/database/connect.db.js';
import { PORT } from './src/config/env.config.js'; 


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`[shrinkr] server is running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1); 
    }
}
startServer();
