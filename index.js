const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// const db = "mongodb://127.0.0.1/mern-auth-app-database";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) throw err;
    console.log('MongoDB connection established')
});

app.use('/users', require('./routes/userRouter'));
app.use('/todos', require('./routes/todoRouter'));

if(process.env.NODE.ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`The server has started on port ${PORT}`));