const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectUserDB, connectAuctionDB, connectBidersDB } = require('./config/db');
const userRoutes = require('./src/routes/userRoutes');
const auctionRoutes = require('./src/routes/auctionRoutes');
const biddingRoutes = require('./src/routes/biddingRouter');

const AppError = require("./src/utils/appError.js")

const errorHandler = require("./src/utils/errorController.js")

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

connectUserDB();
connectAuctionDB();
connectBidersDB()

app.use('/api/users', userRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/bidd', biddingRoutes);
// /api/users/register

app.use((req, res, next) => {
    next(new AppError(`can't find \'${req.originalUrl.toString().replace("/","")}\' API on the server.!`, 404 ));
});

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
