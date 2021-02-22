const userData = require("../../schemas/userSchema");
const Str = require("@supercharge/strings");
const nodemailer = require("nodemailer");
const config = require("../../config");
module.exports = {
  login: (data) => {
    return userData
      .find({ email: data.email })
      .then((response) => {
        if (data.password == response[0].password) {
          return response[0];
        } else {
          return "wrong password";
        }
      })
      .catch((err) => {
        return "user not exist";
      });
  },
  signup: (data) => {
    return userData
      .find({ email: data.email })
      .then((response) => {
        if (response.length > 0) {
          return "already exist";
        } else {
          return userData
            .create({
              farstname: data.farstname,
              lastname: data.lastname,
              email: data.email,
              password: data.password,
              username: data.username,
            })
            .then((resp) => {
              return resp;
            });
        }
      })
      .catch((err) => {
        return err;
      });
  },
  findSingleUser: (data) => {
    return userData.findById({ _id: data._id }).then((res) => {
      return res;
    });
  },
  updateProfile: (data) => {
    return userData.findById({ _id: data._id }).then((res) => {
      if (data.sex != "") {
        res.sex = data.sex;
      }
      if (data.description != "") {
        res.description = data.description;
      }
      if (data.image != "") {
        res.image = data.image;
      }
      if (data.username != "") {
        res.username = data.username;
      }
      if (data.image != "") {
        res.image = data.image;
      }
      if (data.email != "") {
        res.email = data.email;
      }
      if (data.farstname != "") {
        res.farstname = data.farstname;
      }

      return res;
    });
  },
  sandMail: (data) => {
    const random = Str.random();
      return userData
        .updateOne({ email: data.email }, { forgotPasswordToken: random })
        .then(() => {
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "sourabhkamboj247@gmail.com", // generated ethereal user
              pass: config.pass,
            },
          });
          let mailDetails = {
            from: config.gmail,
            to: data.email,
            subject: "Test mail",
            text: "http://" + data.port + "/reset/" + random,
          };

          mailTransporter.sendMail(mailDetails, function (err, data) {
            if (err) {
              return err
            } else {
              return "Email sent successfully"
            }
          });
              return userData.find({ email: data.email }).then((result) => {
                return result;
        });
    }).catch((err)=>{
      res.json(err)
    })
  },
  reset: (data) => {
    return userData
      .updateOne(
        { forgotPasswordToken: data.token },
        { password: data.newPass }
      )
      .then((result) => {
        console.log(result)
        if(result.n==0){
          return "Token expire.Please"
        }
        return "updated succesfully";
      });
  },
};
