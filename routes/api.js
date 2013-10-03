/*
 * Serve JSON to our AngularJS client
 */

exports.getUserInfo = function(db) {
  return function(req, res) {
    var userid = req.params.id;

    db.query("SELECT a.id, a.username, a.primary_email, a.summary, a.firstname, a.lastname, " +
             "a.orgname, b.email, c.picname, a.primary_pic from users a " +
             "LEFT JOIN emails b ON a.primary_email = b.id " +
             "LEFT JOIN pictures c ON a.primary_pic = c.id " +
             "WHERE a.id = $1", [userid], function(err, rows) {
      if(err)
        res.json(null);
      if(rows)
        res.json(rows.rows);
    });
  };
};

exports.updatePerson = function(db) {
 return function(req, res) {
   var id = req.route.params.id;
   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   db.query("UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3",
             [firstname, lastname, id], function(err) {
     if(err) console.log(err);
     else res.json({success: 'success'});
   });
 };
};

exports.deletePerson = function(db) {
  return function(req, res) {
    var id = req.route.params.id;
    db.query("UPDATE users SET firstname = '', lastname = '' WHERE id = $1",
              [id], function(err) {
      if(err) console.log(err);
        else res.json({success: 'success'});
      });
  };
};

exports.updateOrg = function(db) {
  return function(req, res) {
    var id = req.route.params.id;
    var orgname = req.body.orgname;
    db.query("UPDATE users SET orgname = $1 WHERE id = $2",
              [orgname, id], function(err) {
      if(err) console.log(err);
      else res.json({success: 'success'});
    });
  };
};

exports.deleteOrg = function(db) {
  return function(req, res) {
    var id = req.route.params.id;
    db.query("UPDATE users SET orgname = '' WHERE id = $1",
              [id], function(err) {
      if(err) console.log(err);
      else res.json({success: 'success'});
    });
  };
};

exports.addEmail = function(db) {
  return function(req, res) {
    var email = req.body.email;
    var userid = req.body.userid;
    db.query("INSERT INTO emails(email, userid) VALUES($1, $2)",
      [email, userid], function(err, result) {
        res.json({id: result.insertId});
      });
  };
};

exports.getEmails = function(db) {
  return function(req, res) {
    var uid = req.params.uid;
    db.query("SELECT id, email FROM emails WHERE userid = $1", [uid], function(err, rows) {
      if(rows)
        res.json(rows.rows);
      if(err)
        res.json(null);
    });
  };
};

exports.setPrimaryEmail = function(db) {
  return function(req, res) {
    var eid = req.params.eid;
    var uid = req.params.uid;
    db.query("UPDATE users SET primary_email = $1 WHERE id = $2", [eid, uid], function(err) {
      if(err)
        res.json(null);
      else
        res.json({success: "success"});
    });
  };
};

exports.deleteEmail = function(db) {
  return function(req, res) {
    var id = req.params.id;
    db.query("DELETE FROM emails WHERE id = $1", [id], function(err) {
      if(err) console.log(err);
      else res.json({success: "success"});
    });
  };
};

exports.updateSummary = function(db) {
  return function(req, res) {
    var id = req.params.id;
    var summary = req.body.summary;
    db.query("UPDATE users SET summary = $1 WHERE id = $2", [summary, id], function(err) {
      if(err) console.log(err);
      else res.json({success: "success"});
    });
  };
};

exports.getPictures = function(db) {
  return function(req, res) {
    var uid = req.params.uid;
    db.query("SELECT id, picname FROM pictures WHERE userid = $1", [uid], function(err, rows) {
      if(rows)
        res.json(rows.rows);
      if(err)
        res.json(null);
    });
  };
};

exports.uploadImage = function(db, fs, dirpath) {
  return function(req, res) {
    var uid = req.params.uid;
    var new_path = dirpath + '/public/images/photos/';
    var file_name = req.files.file.name;
    fs.copy(req.files.file.path, new_path + file_name, function(err) {
      if(err)
        res.json(null);
      else {
        db.query("INSERT INTO pictures(picname, userid) VALUES($1, $2)", [file_name, uid], function(err, result) {
          if(err)
            res.json(null);
          else
            res.json({photo: file_name, id: result.insertId});
        });
      }

    });

  };
};

exports.setPrimaryPic = function(db) {
  return function(req, res) {
    var pid = req.params.pid;
    var uid = req.params.uid;
    db.query("UPDATE users SET primary_pic = $1 WHERE id = $2", [pid, uid], function(err) {
        if(err)
            res.json(null);
        else
            res.json({success: "success"});
    });
  };
};