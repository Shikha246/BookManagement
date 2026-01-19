const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required:true,
    },
    
    publishedYear:{
        type:Number,
        required:true
    },
    genre:[{
        type:String,
        enum: ['Non-fiction', 'Business','Autobiography','Fantasy','Mystery','Thriller','Non-Fiction','Self-help','Fiction','Historical','Romance']
    }],
    language:{
        type:String,
        required:true,

    },
    
    country:{
        type:String,
        default:"United States",
    },
    rating:{
        type:Number,
        
    },
    summary:{
        type:String,

    },
    coverImageUrl:{
        type:String,
    },
    },
    {
timestamps:true,
    }
);

const Book = mongoose.model('Book',bookSchema);
module.exports=Book;