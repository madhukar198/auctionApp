const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectUserDB, connectAuctionDB } = require('./config/db');
const userRoutes = require('./src/routes/userRoutes');
const auctionRoutes = require('./src/routes/auctionRoutes');
const biddingRoutes = require('./src/routes/biddingRouter');

const AppError = require("./src/utils/appError.js")

const errorHandler = require("./src/utils/errorController.js")

dotenv.config();
connectUserDB();
connectAuctionDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bidd', biddingRoutes);
// /api/users/register
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
