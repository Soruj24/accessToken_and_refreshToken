const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./secret");

 
require("colors");

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connection successful".green.bold);

        const server = app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`.cyan.bold);
        });

        server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${PORT} is already in use. Please use a different port.`.red.bold);
            } else {
                console.error(`Server error: ${err.message}`.red.bold);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};

startServer();
