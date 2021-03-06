const { json } = require("body-parser");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "plasmacut2",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("База данных подключена");
  }
});

exports.setholders = function (value) {
  console.log(value);

  let obj = {
    recholders: {
      param: {
        Amin: value.Aminrec,
        Amax: value.Amaxrec,
        Bmin: value.Bminrec,
        Bmax: value.Bmaxrec,
      },
      ps1: value.PS1rec,
      ps2: value.PS2rec,
    },
    triholders: {
      param: {
        Amin: value.Amintri,
        Amax: value.Amaxtri,
        Bmin: value.Bmintri,
        Bmax: value.Bmaxtri,
        alphamin: value.alphamintri,
        alphamax: value.alphamaxtri,
      },
      ps1: value.PS1tri,
      ps2: value.PS2tri,
      ps3: value.PS3tri,
    },
    cirholders: {
      param: { Dmin: value.Dmincir, Dmax: value.Dmaxcir },
      ps1: value.PS1cir,
      ps2: value.PS2cir,
    },
    washolders: {
      param: {
        Dmin: value.Dminwas,
        Dmax: value.Dmaxwas,
        dmin: value.dminwas,
        dmax: value.dmaxwas,
      },
      ps1: value.PS1was,
      ps2: value.PS2was,
      ps3: value.PS3was,
    },
    secholders: {
      param: {
        dmin: value.dminsec,
        dmax: value.dmaxsec,
        hmin: value.hminsec,
        hmax: value.hmaxsec,
        alphamin: value.alphaminsec,
        alphamax: value.alphamaxsec,
      },
      ps1: value.PS1sec,
      ps2: value.PS2sec,
      ps3: value.PS3sec,
      ps4: value.PS4sec,
    },
  };

  let query =
    "INSERT INTO holders values(null,'" +
    value.name +
    "','" +
    value.thikness +
    "','" +
    JSON.stringify(obj) +
    "');";

  connection.query(query, (err, result) => {
    if (err) console.log(err);
  });
};
