const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


// console.log("process.env.USER_DB_URI==>",process.env.USER_DB_URI);

// const connectUserDB = () => {
//   return mongoose.createConnection(process.env.USER_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// const connectAuctionDB = () => {
//   return mongoose.createConnection(process.env.AUCTION_DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// module.exports = { connectUserDB, connectAuctionDB };


const connectUserDB = async () => {
  const connection = await mongoose.createConnection(process.env.USER_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('UserDB connected');
  return connection;
};

const connectAuctionDB = async () => {
  const connection = await mongoose.createConnection(process.env.AUCTION_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('AuctionDB connected');
  
  return connection;
};

const connectBidersDB = async () => {
  const connection = await mongoose.createConnection(process.env.BIDDING_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('BiddersDB connected');
  
  return connection;
};

module.exports = { connectUserDB, connectAuctionDB ,connectBidersDB};

