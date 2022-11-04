const mongoose = require('mongoose')
const {DateTime} = require('luxon')

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author:{ 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    title: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{
        type: Date
    }
})

CommentSchema.virtual('date_formated').get(function() {
    return DateTime.fromJSDate(this.created_at).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model("Comment", CommentSchema);
