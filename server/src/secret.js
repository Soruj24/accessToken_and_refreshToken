require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/yourdb";
const jwt_access_secret_key = process.env.JWT_ACCESS_SECRET || "85659063945643irt439058374rtu43753405843ir4095438439i54";
const jwt_refresh_secret_key = process.env.JWT_REFRESH_SECRET || "t54976584uyt584967y4589tu3409trtuyt457ttr439rt849840";


module.exports = {
    PORT,
    MONGO_URI,
    jwt_access_secret_key,
    jwt_refresh_secret_key
}

