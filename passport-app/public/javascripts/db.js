const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/passport-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});