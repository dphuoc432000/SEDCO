module.exports ={
    //chuyển đổi mảng MongooseArray có giá trị trong mảng là Object Constuctor của Mongoose thành mảng MongooseArray có giá trị là object bình thường(Object literal)
    multiplemongooseToObject: function (mongooseArray){
        return mongooseArray.map(mongoose => mongoose.toObject());
    },
    // chuyển đổi 1 object Constuctor của mongoose thành 1 object literal bình thường
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    }
}