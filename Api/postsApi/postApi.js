const postData = require("../../schemas/postsSchema");
module.exports = {
  post: (data) => {
    return postData
      .create({
        username: data.username,
        id: data.id,
        image: data.image,
        category: data.category,
        description: data.description,
        time: data.time,
        date: data.date,
      })
      .then((response) => {
        return response;
      });
  },
  getPosts: (data) => {
    // console.log(data)
    return postData.find().then((res) => {
      // console.log(res)
      
      return res;
    });
  },
  singlePost: (data) => {
    return postData.find({ _id: data._id }).then((res) => {
      return res;
    });
  },
  like: (data) => {
    return postData.find({ _id: data._id }).then((res) => {
      const a = res[0].likes.includes(data.userId);
      if (!a) {
        return postData
          .updateOne({ _id: data._id }, { $push: { likes: [data.userId] } })
          .then((respose) => {
            return postData.find({ _id: data._id }).then((resp) => {
              return resp;
            }); 
          });
      } else {
        return postData
          .updateOne({ _id: data._id }, { $pullAll: { likes: [data.userId] } })
          .then((response) => {
            return postData.find({ _id: data._id }).then((resp) => {
              return resp;
            });
          });
      }
    });
  },
  comment:(data)=>{
    // return postData.find({ _id: data._id }).then((res) => {
      const obj={
        "username":data.username,
        "text":data.text
      }
      return postData
          .updateOne({ _id: data._id }, { $push: { comments: [obj] } }).then((respo)=>{
                return postData.find({ _id: data._id }).then((res) => {
                  return res;
  })

          })
     
      // res[0].comment

},
}
