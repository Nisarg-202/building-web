//jshint esversion:6
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const nodemailer = require('nodemailer');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const otpGenerator = require('otp-generator');
const upload = require('express-fileupload');
const fs = require('fs');
const sg = require('@sendgrid/mail');
sg.setApiKey(process.env.sendGridKey);
const state = require(__dirname + '/js/state.js');
const city = require(__dirname + '/js/city.js');

const app = express();
app.use(upload());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  `mongodb+srv://nisarg:${process.env.PASSWORD}@cluster0.x2a77.mongodb.net/buildingDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const personSchema = new mongoose.Schema({
  username: String,
  otp: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  phone: Number,
});

const infoSchema = new mongoose.Schema({
  username: String,
  profileImage: String,
  name: String,
  phone: String,
  property1name: String,
  property1address: String,
  property1pdf: String,
  property1image1: String,
  property1image2: String,
  property1image3: String,
  property1image4: String,
  property1image5: String,
  property1bhk: String,
  property1state: String,
  property1city: String,
  property2name: String,
  property2address: String,
  property2pdf: String,
  property2image1: String,
  property2image2: String,
  property2image3: String,
  property2image4: String,
  property2image5: String,
  property2bhk: String,
  property2state: String,
  property2city: String,
  property3name: String,
  property3address: String,
  property3pdf: String,
  property3image1: String,
  property3image2: String,
  property3image3: String,
  property3image4: String,
  property3image5: String,
  property3bhk: String,
  property3state: String,
  property3city: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
const Info = mongoose.model('Info', infoSchema);
const Person = mongoose.model('Person', personSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/remove', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('remove');
  }
});

app.get('/instruction', function (req, res) {
  res.render('instruction');
});

app.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    Info.find(
      {
        username: req.user.username,
      },
      function (err, found) {
        if (err) {
          console.log(err);
        } else {
          res.render('profile', {
            personName: found[0].name,
            imageURL: '/images/' + found[0].profileImage,
            data: found[0].profileImage,
          });
        }
      }
    );
  } else {
    res.redirect('/register');
  }
});

app.get('/property1', function (req, res) {
  if (req.isAuthenticated()) {
    Info.find(
      {
        username: req.user.username,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result[0].name) {
            Info.find(
              {
                username: req.user.username,
              },
              function (err, found) {
                if (err) {
                  console.log(err);
                } else {
                  res.render('property1', {
                    propertyName: found[0].property1name,
                    propertyAddress: found[0].property1address,
                    propertyPdf: '/images/' + found[0].property1pdf,
                    image1: '/images/' + found[0].property1image1,
                    image2: '/images/' + found[0].property1image2,
                    image3: '/images/' + found[0].property1image3,
                    image4: '/images/' + found[0].property1image4,
                    image5: '/images/' + found[0].property1image5,
                    bhk: found[0].property1bhk,
                    data1: found[0].property1image1,
                    data: found[0].property1pdf,
                    State: state(),
                    City: city(),
                  });
                }
              }
            );
          } else {
            res.redirect('/profile');
          }
        }
      }
    );
  } else {
    res.redirect('/register');
  }
});

app.get('/property2', function (req, res) {
  if (req.isAuthenticated()) {
    Info.find(
      {
        username: req.user.username,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result[0].name) {
            Info.find(
              {
                username: req.user.username,
              },
              function (err, found) {
                if (err) {
                  console.log(err);
                } else {
                  res.render('property2', {
                    propertyName: found[0].property2name,
                    propertyAddress: found[0].property2address,
                    propertyPdf: '/images/' + found[0].property2pdf,
                    image1: '/images/' + found[0].property2image1,
                    image2: '/images/' + found[0].property2image2,
                    image3: '/images/' + found[0].property2image3,
                    image4: '/images/' + found[0].property2image4,
                    image5: '/images/' + found[0].property2image5,
                    bhk: found[0].property2bhk,
                    data1: found[0].property2image1,
                    data: found[0].property2pdf,
                    State: state(),
                    City: city(),
                  });
                }
              }
            );
          } else {
            res.redirect('/profile');
          }
        }
      }
    );
  } else {
    res.redirect('/register');
  }
});

app.get('/property3', function (req, res) {
  if (req.isAuthenticated()) {
    Info.find(
      {
        username: req.user.username,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result[0].name) {
            Info.find(
              {
                username: req.user.username,
              },
              function (err, found) {
                if (err) {
                  console.log(err);
                } else {
                  res.render('property3', {
                    propertyName: found[0].property3name,
                    propertyAddress: found[0].property3address,
                    propertyPdf: '/images/' + found[0].property3pdf,
                    image1: '/images/' + found[0].property3image1,
                    image2: '/images/' + found[0].property3image2,
                    image3: '/images/' + found[0].property3image3,
                    image4: '/images/' + found[0].property3image4,
                    image5: '/images/' + found[0].property3image5,
                    bhk: found[0].property3bhk,
                    data1: found[0].property3image1,
                    data: found[0].property3pdf,
                    State: state(),
                    City: city(),
                  });
                }
              }
            );
          } else {
            res.redirect('/profile');
          }
        }
      }
    );
  } else {
    res.redirect('/register');
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/', function (req, res) {
  res.render('mainPage', {
    heading: '',
  });
});

app.get('/frontPage', function (req, res) {
  res.render('frontPage', {
    heading: '',
    State: state(),
    City: city(),
  });
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/login', function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.render('login', {
      heading: '',
    });
  }
});

app.get('/forgotpassword', function (req, res) {
  res.render('forgotpassword');
});

app.get('/property1', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('property1');
  } else {
    res.redirect('/');
  }
});

app.post('/login', function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      });
    }
  });
});

app.post('/forgotpassword', function (req, res) {
  User.find(
    {
      username: req.body.username,
    },
    function (err, found) {
      if (err) {
        res.redirect('/');
      } else {
        if (found) {
          const otps = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            alphabets: false,
          });
          let msg = {
            to: found[0].username,
            from: 'nisargprajapati202@gmail.com',
            subject: 'House A Dream Forget Password Verification Mail',
            html:
              "<h1 style='text-align: center; color: black;'>Forget Password.</h1><h3>Your otp <span style='color: blue;'>" +
              otps +
              '</span> for Forget Password in House A Dream Website.</h3>',
          };

          sg.send(msg)
            .then(function () {
              const person = new Person({
                username: found[0].username,
                otp: otps,
              });

              person.save(function (err) {
                if (err) {
                  console.log(err);
                } else {
                  res.render('enterotp', {
                    username: found[0].username,
                    phone: found[0].phone,
                  });
                }
              });
            })
            .catch(function (err) {
              res.redirect('/');
            });
        } else {
          res.redirect('/');
        }
      }
    }
  );
});

app.post('/enterotp', function (req, res) {
  Person.find(
    {
      username: req.body.username,
    },
    function (err, found) {
      if (err) {
        console.log(err);
      } else {
        const length = found.length;
        if (req.body.otp == found[length - 1].otp) {
          res.render('enterpassword', {
            username: req.body.username,
            phone: req.body.phone,
          });
        } else {
          Person.deleteOne(
            {
              username: req.body.username,
            },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                res.redirect('/register');
              }
            }
          );
        }
      }
    }
  );
});

app.post('/enterpassword', function (req, res) {
  if (req.body.password == req.body.repassword) {
    User.deleteOne(
      {
        username: req.body.username,
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          User.register(
            {
              username: req.body.username,
              phone: req.body.phone,
            },
            req.body.password,
            function (err, user) {
              if (err) {
                console.log(err);
              } else {
                Person.deleteOne(
                  {
                    username: user.username,
                  },
                  function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      res.render('mainPage', {
                        heading: 'password successfully changed',
                        State: state(),
                        City: city(),
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    Person.deleteOne(
      {
        username: req.body.username,
      },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/register');
        }
      }
    );
  }
});

app.post('/emailverification', function (req, res) {
  const otps = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  let msg = {
    to: req.body.username,
    from: 'nisargprajapati202@gmail.com',
    subject: 'House A Dream Verification Mail',
    html:
      "<h1 style='text-align: center; color: black;'>Welcome To Our Website.</h1><h3>Your otp <span style='color: blue;'>" +
      otps +
      '</span> for Sign Up in House A Dream Website.</h3>',
  };

  sg.send(msg)
    .then(function () {
      const person = new Person({
        username: req.body.username,
        otp: otps,
      });
      person.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.render('emailverification', {
            username: req.body.username,
            password: req.body.password,
            phone: req.body.phone,
          });
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post('/register', function (req, res) {
  Person.find(
    {
      username: req.body.username,
    },
    function (err, found) {
      if (err) {
        console.log(err);
      } else {
        const length = found.length;
        if (req.body.otp == found[length - 1].otp) {
          User.register(
            {
              username: req.body.username,
              phone: req.body.phone,
            },
            req.body.password,
            function (err, user) {
              console.log(user);
              if (err) {
                console.log(err);
              } else {
                let msg = {
                  to: req.body.username,
                  from: 'nisargprajapati202@gmail.com',
                  subject: 'Thank You For Sign Up In Our Website',
                  html: '',
                  attachments: [
                    {
                      filename: 'Poster.png',
                      type: 'image/png',
                      content: new Buffer.from(
                        __dirname + '/public/images/poster.png'
                      ).toString('base64'),
                      contentId: 'myimageid',
                      disposition: 'attachment',
                    },
                  ],
                };

                sg.send(msg)
                  .then(function () {
                    const info = new Info({
                      username: user.username,
                      profileImage: null,
                      name: null,
                      phone: user.phone,
                      property1name: null,
                      property1address: null,
                      property1pdf: null,
                      property1image1: null,
                      property1image2: null,
                      property1image3: null,
                      property1image4: null,
                      property1image5: null,
                      property1bhk: null,
                      property1state: null,
                      property1city: null,
                      property2name: null,
                      property2address: null,
                      property2pdf: null,
                      property2image1: null,
                      property2image2: null,
                      property2image3: null,
                      property2image4: null,
                      property2image5: null,
                      property2bhk: null,
                      property2state: null,
                      property2city: null,
                      property3name: null,
                      property3address: null,
                      property3pdf: null,
                      property3image1: null,
                      property3image2: null,
                      property3image3: null,
                      property3image4: null,
                      property3image5: null,
                      property3bhk: null,
                      property3state: null,
                      property3city: null,
                    });
                    info.save(function (err) {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log('save');
                      }
                    });
                    Person.deleteOne(
                      {
                        username: user.username,
                      },
                      function (err) {
                        if (err) {
                          console.log(err);
                          res.redirect('/');
                        } else {
                          passport.authenticate('local')(req, res, function () {
                            res.redirect('/profile');
                          });
                        }
                      }
                    );
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              }
            }
          );
        } else {
          Person.deleteOne(
            {
              username: req.body.username,
            },
            function (err) {
              if (err) {
                console.log(err);
                res.redirect('/');
              } else {
                res.redirect('/register');
              }
            }
          );
        }
      }
    }
  );
});

app.post('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    req.files.filename.mv(
      'public/images/' + req.files.filename.md5 + '.png',
      function (err) {
        if (err) {
          console.log(err);
        } else {
          Info.updateOne(
            {
              username: req.user.username,
            },
            {
              profileImage: req.files.filename.md5 + '.png',
              name: req.body.name,
            },
            function (err) {
              if (err) {
                console.log(err);
              } else {
                res.render('profile', {
                  imageURL: '/images/' + req.files.filename.md5 + '.png',
                  personName: req.body.name,
                  data: req.files.filename.md5 + '.pdf',
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.post('/property1', function (req, res) {
  if (req.isAuthenticated()) {
    if (req.files.filename) {
      req.files.filename.mv(
        'public/images/' + req.files.filename.md5 + '.pdf',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image1.mv(
              'public/images/' + req.files.image1.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image2.mv(
                    'public/images/' + req.files.image2.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image3.mv(
                          'public/images/' + req.files.image3.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(err);
                              res.redirect('/profile');
                            } else {
                              req.files.image4.mv(
                                'public/images/' +
                                  req.files.image4.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(errr);
                                    res.redirect('/profile');
                                  } else {
                                    req.files.image5.mv(
                                      'public/images/' +
                                        req.files.image5.md5 +
                                        '.png',
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          Info.updateOne(
                                            {
                                              username: req.user.username,
                                            },
                                            {
                                              property1pdf:
                                                req.files.filename.md5 + '.pdf',
                                              property1name:
                                                req.body.propertyname,
                                              property1address:
                                                req.body.propertyaddress,
                                              property1image1:
                                                req.files.image1.md5 + '.png',
                                              property1image2:
                                                req.files.image2.md5 + '.png',
                                              property1image3:
                                                req.files.image3.md5 + '.png',
                                              property1image4:
                                                req.files.image4.md5 + '.png',
                                              property1image5:
                                                req.files.image5.md5 + '.png',
                                              property1bhk: req.body.bhk,
                                              property1state: req.body.state,
                                              property1city: req.body.city,
                                            },
                                            function (err) {
                                              if (err) {
                                                console.log(err);
                                                res.redirect('/profile');
                                              } else {
                                                res.render('property1', {
                                                  propertyPdf:
                                                    '/images/' +
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  propertyName:
                                                    req.body.propertyname,
                                                  propertyAddress:
                                                    req.body.propertyaddress,
                                                  image1:
                                                    '/images/' +
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  image2:
                                                    '/images/' +
                                                    req.files.image2.md5 +
                                                    '.png',
                                                  image3:
                                                    '/images/' +
                                                    req.files.image3.md5 +
                                                    '.png',
                                                  image4:
                                                    '/images/' +
                                                    req.files.image4.md5 +
                                                    '.png',
                                                  image5:
                                                    '/images/' +
                                                    req.files.image5.md5 +
                                                    '.png',
                                                  bhk: req.body.bhk,
                                                  data:
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  data1:
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  State: state(),
                                                  City: city(),
                                                });
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      req.files.image1.mv(
        'public/images/' + req.files.image1.md5 + '.png',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image2.mv(
              'public/images/' + req.files.image2.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image3.mv(
                    'public/images/' + req.files.image3.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image4.mv(
                          'public/images/' + req.files.image4.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(errr);
                              res.redirect('/profile');
                            } else {
                              req.files.image5.mv(
                                'public/images/' +
                                  req.files.image5.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(err);
                                    res.redirect('/profile');
                                  } else {
                                    Info.updateOne(
                                      {
                                        username: req.user.username,
                                      },
                                      {
                                        property1name: req.body.propertyname,
                                        property1address:
                                          req.body.propertyaddress,
                                        property1image1:
                                          req.files.image1.md5 + '.png',
                                        property1image2:
                                          req.files.image2.md5 + '.png',
                                        property1image3:
                                          req.files.image3.md5 + '.png',
                                        property1image4:
                                          req.files.image4.md5 + '.png',
                                        property1image5:
                                          req.files.image5.md5 + '.png',
                                        property1bhk: req.body.bhk,
                                        property1state: req.body.state,
                                        property1city: req.body.city,
                                      },
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          res.render('property1', {
                                            propertyPdf: null,
                                            propertyName: req.body.propertyname,
                                            propertyAddress:
                                              req.body.propertyaddress,
                                            image1:
                                              '/images/' +
                                              req.files.image1.md5 +
                                              '.png',
                                            image2:
                                              '/images/' +
                                              req.files.image2.md5 +
                                              '.png',
                                            image3:
                                              '/images/' +
                                              req.files.image3.md5 +
                                              '.png',
                                            image4:
                                              '/images/' +
                                              req.files.image4.md5 +
                                              '.png',
                                            image5:
                                              '/images/' +
                                              req.files.image5.md5 +
                                              '.png',
                                            bhk: req.body.bhk,
                                            data: null,
                                            data1:
                                              req.files.image1.md5 + '.png',
                                            State: state(),
                                            City: city(),
                                          });
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.redirect('/');
  }
});

app.post('/property2', function (req, res) {
  if (req.isAuthenticated()) {
    if (req.files.filename) {
      req.files.filename.mv(
        'public/images/' + req.files.filename.md5 + '.pdf',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image1.mv(
              'public/images/' + req.files.image1.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image2.mv(
                    'public/images/' + req.files.image2.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image3.mv(
                          'public/images/' + req.files.image3.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(err);
                              res.redirect('/profile');
                            } else {
                              req.files.image4.mv(
                                'public/images/' +
                                  req.files.image4.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(errr);
                                    res.redirect('/profile');
                                  } else {
                                    req.files.image5.mv(
                                      'public/images/' +
                                        req.files.image5.md5 +
                                        '.png',
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          Info.updateOne(
                                            {
                                              username: req.user.username,
                                            },
                                            {
                                              property2pdf:
                                                req.files.filename.md5 + '.pdf',
                                              property2name:
                                                req.body.propertyname,
                                              property2address:
                                                req.body.propertyaddress,
                                              property2image1:
                                                req.files.image1.md5 + '.png',
                                              property2image2:
                                                req.files.image2.md5 + '.png',
                                              property2image3:
                                                req.files.image3.md5 + '.png',
                                              property2image4:
                                                req.files.image4.md5 + '.png',
                                              property2image5:
                                                req.files.image5.md5 + '.png',
                                              property2bhk: req.body.bhk,
                                              property2state: req.body.state,
                                              property2city: req.body.city,
                                            },
                                            function (err) {
                                              if (err) {
                                                console.log(err);
                                                res.redirect('/profile');
                                              } else {
                                                res.render('property2', {
                                                  propertyPdf:
                                                    '/images/' +
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  propertyName:
                                                    req.body.propertyname,
                                                  propertyAddress:
                                                    req.body.propertyaddress,
                                                  image1:
                                                    '/images/' +
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  image2:
                                                    '/images/' +
                                                    req.files.image2.md5 +
                                                    '.png',
                                                  image3:
                                                    '/images/' +
                                                    req.files.image3.md5 +
                                                    '.png',
                                                  image4:
                                                    '/images/' +
                                                    req.files.image4.md5 +
                                                    '.png',
                                                  image5:
                                                    '/images/' +
                                                    req.files.image5.md5 +
                                                    '.png',
                                                  bhk: req.body.bhk,
                                                  data:
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  data1:
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  State: state(),
                                                  City: city(),
                                                });
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      req.files.image1.mv(
        'public/images/' + req.files.image1.md5 + '.png',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image2.mv(
              'public/images/' + req.files.image2.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image3.mv(
                    'public/images/' + req.files.image3.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image4.mv(
                          'public/images/' + req.files.image4.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(errr);
                              res.redirect('/profile');
                            } else {
                              req.files.image5.mv(
                                'public/images/' +
                                  req.files.image5.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(err);
                                    res.redirect('/profile');
                                  } else {
                                    Info.updateOne(
                                      {
                                        username: req.user.username,
                                      },
                                      {
                                        property2name: req.body.propertyname,
                                        property2address:
                                          req.body.propertyaddress,
                                        property2image1:
                                          req.files.image1.md5 + '.png',
                                        property2image2:
                                          req.files.image2.md5 + '.png',
                                        property2image3:
                                          req.files.image3.md5 + '.png',
                                        property2image4:
                                          req.files.image4.md5 + '.png',
                                        property2image5:
                                          req.files.image5.md5 + '.png',
                                        property2bhk: req.body.bhk,
                                        property2state: req.body.state,
                                        property2city: req.body.city,
                                      },
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          res.render('property2', {
                                            propertyPdf: null,
                                            propertyName: req.body.propertyname,
                                            propertyAddress:
                                              req.body.propertyaddress,
                                            image1:
                                              '/images/' +
                                              req.files.image1.md5 +
                                              '.png',
                                            image2:
                                              '/images/' +
                                              req.files.image2.md5 +
                                              '.png',
                                            image3:
                                              '/images/' +
                                              req.files.image3.md5 +
                                              '.png',
                                            image4:
                                              '/images/' +
                                              req.files.image4.md5 +
                                              '.png',
                                            image5:
                                              '/images/' +
                                              req.files.image5.md5 +
                                              '.png',
                                            bhk: req.body.bhk,
                                            data: null,
                                            data1:
                                              req.files.image1.md5 + '.png',
                                            State: state(),
                                            City: city(),
                                          });
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.redirect('/');
  }
});

app.post('/property3', function (req, res) {
  if (req.isAuthenticated()) {
    if (req.files.filename) {
      req.files.filename.mv(
        'public/images/' + req.files.filename.md5 + '.pdf',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image1.mv(
              'public/images/' + req.files.image1.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image2.mv(
                    'public/images/' + req.files.image2.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image3.mv(
                          'public/images/' + req.files.image3.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(err);
                              res.redirect('/profile');
                            } else {
                              req.files.image4.mv(
                                'public/images/' +
                                  req.files.image4.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(errr);
                                    res.redirect('/profile');
                                  } else {
                                    req.files.image5.mv(
                                      'public/images/' +
                                        req.files.image5.md5 +
                                        '.png',
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          Info.updateOne(
                                            {
                                              username: req.user.username,
                                            },
                                            {
                                              property3pdf:
                                                req.files.filename.md5 + '.pdf',
                                              property3name:
                                                req.body.propertyname,
                                              property3address:
                                                req.body.propertyaddress,
                                              property3image1:
                                                req.files.image1.md5 + '.png',
                                              property3image2:
                                                req.files.image2.md5 + '.png',
                                              property3image3:
                                                req.files.image3.md5 + '.png',
                                              property3image4:
                                                req.files.image4.md5 + '.png',
                                              property3image5:
                                                req.files.image5.md5 + '.png',
                                              property3bhk: req.body.bhk,
                                              property3state: req.body.state,
                                              property3city: req.body.city,
                                            },
                                            function (err) {
                                              if (err) {
                                                console.log(err);
                                                res.redirect('/profile');
                                              } else {
                                                res.render('property3', {
                                                  propertyPdf:
                                                    '/images/' +
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  propertyName:
                                                    req.body.propertyname,
                                                  propertyAddress:
                                                    req.body.propertyaddress,
                                                  image1:
                                                    '/images/' +
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  image2:
                                                    '/images/' +
                                                    req.files.image2.md5 +
                                                    '.png',
                                                  image3:
                                                    '/images/' +
                                                    req.files.image3.md5 +
                                                    '.png',
                                                  image4:
                                                    '/images/' +
                                                    req.files.image4.md5 +
                                                    '.png',
                                                  image5:
                                                    '/images/' +
                                                    req.files.image5.md5 +
                                                    '.png',
                                                  bhk: req.body.bhk,
                                                  data:
                                                    req.files.filename.md5 +
                                                    '.pdf',
                                                  data1:
                                                    req.files.image1.md5 +
                                                    '.png',
                                                  State: state(),
                                                  City: city(),
                                                });
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
      req.files.image1.mv(
        'public/images/' + req.files.image1.md5 + '.png',
        function (err) {
          if (err) {
            console.log(err);
            res.redirect('/profile');
          } else {
            req.files.image2.mv(
              'public/images/' + req.files.image2.md5 + '.png',
              function (err) {
                if (err) {
                  console.log(err);
                  res.redirect('/profile');
                } else {
                  req.files.image3.mv(
                    'public/images/' + req.files.image3.md5 + '.png',
                    function (err) {
                      if (err) {
                        console.log(err);
                        res.redirect('/profile');
                      } else {
                        req.files.image4.mv(
                          'public/images/' + req.files.image4.md5 + '.png',
                          function (err) {
                            if (err) {
                              console.log(errr);
                              res.redirect('/profile');
                            } else {
                              req.files.image5.mv(
                                'public/images/' +
                                  req.files.image5.md5 +
                                  '.png',
                                function (err) {
                                  if (err) {
                                    console.log(err);
                                    res.redirect('/profile');
                                  } else {
                                    Info.updateOne(
                                      {
                                        username: req.user.username,
                                      },
                                      {
                                        property3name: req.body.propertyname,
                                        property3address:
                                          req.body.propertyaddress,
                                        property3image1:
                                          req.files.image1.md5 + '.png',
                                        property3image2:
                                          req.files.image2.md5 + '.png',
                                        property3image3:
                                          req.files.image3.md5 + '.png',
                                        property3image4:
                                          req.files.image4.md5 + '.png',
                                        property3image5:
                                          req.files.image5.md5 + '.png',
                                        property3bhk: req.body.bhk,
                                        property3state: req.body.state,
                                        property3city: req.body.city,
                                      },
                                      function (err) {
                                        if (err) {
                                          console.log(err);
                                          res.redirect('/profile');
                                        } else {
                                          res.render('property3', {
                                            propertyPdf: null,
                                            propertyName: req.body.propertyname,
                                            propertyAddress:
                                              req.body.propertyaddress,
                                            image1:
                                              '/images/' +
                                              req.files.image1.md5 +
                                              '.png',
                                            image2:
                                              '/images/' +
                                              req.files.image2.md5 +
                                              '.png',
                                            image3:
                                              '/images/' +
                                              req.files.image3.md5 +
                                              '.png',
                                            image4:
                                              '/images/' +
                                              req.files.image4.md5 +
                                              '.png',
                                            image5:
                                              '/images/' +
                                              req.files.image5.md5 +
                                              '.png',
                                            bhk: req.body.bhk,
                                            data: null,
                                            data1:
                                              req.files.image1.md5 + '.png',
                                            State: state(),
                                            City: city(),
                                          });
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  } else {
    res.redirect('/');
  }
});

app.post('/searchbystate', function (req, res) {
  Info.find(function (err, found) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('stateinformation', {
        data: found,
        search: req.body.state,
      });
    }
  });
});

app.post('/searchbycity', function (req, res) {
  Info.find(function (err, found) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('cityinformation', {
        data: found,
        search: req.body.city,
      });
    }
  });
});

app.post('/remove', function (req, res) {
  if (req.isAuthenticated()) {
    Info.deleteOne(
      {
        username: req.user.username,
      },
      function (err) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          User.deleteOne(
            {
              username: req.user.username,
            },
            function (err) {
              if (err) {
                console.log(err);
                res.redirect('/');
              } else {
                res.render('mainPage', {
                  heading: 'successfully deleted your account',
                  State: state(),
                  City: city(),
                });
              }
            }
          );
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.post('/delete1', function (req, res) {
  if (req.isAuthenticated()) {
    Info.updateOne(
      {
        username: req.user.username,
      },
      {
        property1image1: null,
        property1image2: null,
        property1image3: null,
        property1image4: null,
        property1image5: null,
        property1name: null,
        property1address: null,
        property1bhk: null,
        property1pdf: null,
        property1state: null,
        property1city: null,
      },
      function (err) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          res.redirect('/property1');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.post('/delete2', function (req, res) {
  if (req.isAuthenticated()) {
    Info.updateOne(
      {
        username: req.user.username,
      },
      {
        property2image1: null,
        property2image2: null,
        property2image3: null,
        property2image4: null,
        property2image5: null,
        property2name: null,
        property2address: null,
        property2bhk: null,
        property2pdf: null,
        property2state: null,
        property2city: null,
      },
      function (err) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          res.redirect('/property2');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.post('/delete3', function (req, res) {
  if (req.isAuthenticated()) {
    Info.updateOne(
      {
        username: req.user.username,
      },
      {
        property3image1: null,
        property3image2: null,
        property3image3: null,
        property3image4: null,
        property3image5: null,
        property3name: null,
        property3address: null,
        property3bhk: null,
        property3pdf: null,
        property3state: null,
        property3city: null,
      },
      function (err) {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          res.redirect('/property3');
        }
      }
    );
  } else {
    res.redirect('/');
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('server is running on port 3000.');
});
