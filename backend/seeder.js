const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const {UserAccount} = require('./models');

// Connect to DB
mongoose.connect(process.env.MONGO_LOCALHOST_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON file
const usersAccountFile = JSON.parse(
    fs.readFileSync(`${__dirname}/data/userAccount.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await UserAccount.create(usersAccountFile)
        console.log('Data Imported...'.green.inverse);
    } catch(err) {
        console.error(err);
    }
    process.exit();
}

// DeleteData
const deleteData = async () => {
    try{
        await UserAccount.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch(err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') {
    importData();
} else if( process.argv[2] === '-d') {
    deleteData();
}