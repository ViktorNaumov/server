const fs = require("fs");

module.exports.DxfCreator = function (type, param) {
  switch (type) {
    case "rec":
      let rec_start = fs
        .readFileSync("./snipets/rec_start.dxf", "utf8")
        .split("+");
      let rec_end = fs.readFileSync("./snipets/rec_end.dxf", "utf8").split("+");
      let rec_body_string =
        "90\n" +
        "4\n" +
        "70\n" +
        "1\n" +
        "10\n" +
        "0\n" +
        "20\n" +
        "0\n" +
        "30\n" +
        "0\n" +
        "10\n" +
        param.A +
        "\n" +
        "20\n" +
        "0\n" +
        "30\n" +
        "0\n" +
        "10\n" +
        param.A +
        "\n" +
        "20\n" +
        param.B +
        "\n" +
        "30\n" +
        "0\n" +
        "10\n" +
        "0\n" +
        "20\n" +
        param.B +
        "\n" +
        "30\n" +
        "0\n" +
        "0\n";

      let rec_body_start;
      for (let i = 0; i < rec_start.length; i++) {
        if (rec_body_start === undefined) {
          rec_body_start = rec_start[i];
        } else rec_body_start = rec_body_start + rec_start[i];
      }

      let rec_body_end;
      for (let i = 0; i < rec_end.length; i++) {
        if (rec_body_end === undefined) {
          rec_body_end = rec_end[i];
        } else rec_body_end = rec_body_end + rec_end[i];
      }
      return rec_body_start + rec_body_string + rec_body_end;

      break;
    case "cir":
      let cir_start = fs
        .readFileSync("./snipets/cir_start.dxf", "utf8")
        .split("+");
      let cir_end = fs.readFileSync("./snipets/cir_end.dxf", "utf8").split("+");
      let cir_body_string =
        "10\n" +
        param.D +
        "\n" +
        "20\n" +
        param.D +
        "\n" +
        "30\n" +
        "0\n" +
        "40\n" +
        Number(param.D) / 2 +
        "\n" +
        "0\n";

      let cir_body_start;
      for (let i = 0; i < cir_start.length; i++) {
        if (cir_body_start === undefined) {
          cir_body_start = cir_start[i];
        } else cir_body_start = cir_body_start + cir_start[i];
      }

      let cir_body_end;
      for (let i = 0; i < cir_end.length; i++) {
        if (cir_body_end === undefined) {
          cir_body_end = cir_end[i];
        } else cir_body_end = cir_body_end + cir_end[i];
      }
      return cir_body_start + cir_body_string + cir_body_end;
      break;
    case "tri":
      let tri_start = fs
        .readFileSync("./snipets/tri_start.dxf", "utf8")
        .split("+");
      let tri_end = fs.readFileSync("./snipets/tri_end.dxf", "utf8").split("+");
      let tri_body_string =
        "10\n" +
        "0\n" +
        "20\n" +
        "0\n" +
        "30\n" +
        "0\n" +
        "10\n" +
        param.A +
        "\n" +
        "20\n" +
        "0\n" +
        "30\n" +
        "0\n" +
        "10\n" +
        Math.sqrt(
          Math.pow(param.B, 2) -
            Math.pow(param.B * Math.sin((param.alpha * Math.PI) / 180), 2)
        ).toFixed(2) +
        "\n" +
        "20\n" +
        (param.B * Math.sin((param.alpha * Math.PI) / 180)).toFixed(2) +
        "\n" +
        "30\n" +
        "0\n" +
        "0\n";

      let tri_body_start;
      for (let i = 0; i < tri_start.length; i++) {
        if (tri_body_start === undefined) {
          tri_body_start = tri_start[i];
        } else tri_body_start = tri_body_start + tri_start[i];
      }

      let tri_body_end;
      for (let i = 0; i < tri_end.length; i++) {
        if (tri_body_end === undefined) {
          tri_body_end = tri_end[i];
        } else tri_body_end = tri_body_end + tri_end[i];
      }

      return tri_body_start + tri_body_string + tri_body_end;
      break;
    case "was":
      let was_start = fs
        .readFileSync("./snipets/was_start.dxf", "utf8")
        .split("+");
      let was_end = fs.readFileSync("./snipets/was_end.dxf", "utf8").split("+");
      let was_body_string =
        "CIRCLE\n5\n100\n100\nAcDbEntity\n8\nСлой_1\n62\n7\n100\nAcDbCircle\n90\n1\n70\n1\n" +
        "10\n" +
        param.D / 2 +
        "\n" +
        "20\n" +
        param.D / 2 +
        "\n" +
        "30\n0\n40\n" +
        param.D / 2 +
        "\n0\n" +
        "CIRCLE\n5\n101\n100\nAcDbEntity\n8\nСлой_1\n62\n7\n100\nAcDbCircle\n90\n1\n70\n1\n" +
        "10\n" +
        param.D / 2 +
        "\n" +
        "20\n" +
        param.D / 2 +
        "\n" +
        "30\n0\n40\n" +
        param.d / 2 +
        "\n0\n";

      let was_body_start;
      for (let i = 0; i < was_start.length; i++) {
        if (was_body_start === undefined) {
          was_body_start = was_start[i];
        } else was_body_start = was_body_start + was_start[i];
      }

      let was_body_end;
      for (let i = 0; i < was_end.length; i++) {
        if (was_body_end === undefined) {
          was_body_end = was_end[i];
        } else was_body_end = was_body_end + was_end[i];
      }

      return was_body_start + was_body_string + was_body_end;
      break;
    case "sec":
      let beta = param.alpha / 2;
      let AC = (R) => {
        let sinus = Math.sin((beta * Math.PI) / 180);
        let ac = sinus * R * 2;
        return ac;
      };

      let gamma = 90 - (180 - param.alpha) / 2;
      let delta_x = (R) => {
        return Math.cos((gamma * Math.PI) / 180) * AC(R);
      };
      let delta_y = (R) => {
        return Math.sin((gamma * Math.PI) / 180) * AC(R);
      };
      let k42 = Math.tan(((param.alpha / 4) * Math.PI) / 180);

      let sec_start = fs
        .readFileSync("./snipets/sec_start.dxf", "utf8")
        .split("+");
      let sec_end = fs.readFileSync("./snipets/sec_end.dxf", "utf8").split("+");
      let sec_body_string =
        "10\n" +
        (Number(param.d / 2) + Number(param.h)) +
        "\n" +
        "20\n" +
        "0\n30\n0\n42\n" +
        "-" +
        k42 +
        "\n" +
        "10\n" +
        (Number(param.d / 2) +
          Number(param.h) -
          delta_x(Number(param.d / 2) + Number(param.h))) +
        "\n" +
        "20\n" +
        (0 + delta_y(param.d / 2 + Number(param.h))) +
        "\n" +
        "30\n0\n" +
        "10\n" +
        (param.d / 2 + Number(param.h) - delta_x(param.d / 2)) +
        "\n" +
        "20\n" +
        (Number(param.h) + delta_y(param.d / 2)) +
        "\n" +
        "30\n0\n42\n" +
        k42 +
        "\n" +
        "10\n" +
        (param.d / 2 + Number(param.h)) +
        "\n" +
        "20\n" +
        param.h +
        "\n" +
        "30\n0\n0\n";

      let sec_body_start;
      for (let i = 0; i < sec_start.length; i++) {
        if (sec_body_start === undefined) {
          sec_body_start = sec_start[i];
        } else sec_body_start = sec_body_start + sec_start[i];
      }

      let sec_body_end;
      for (let i = 0; i < sec_end.length; i++) {
        if (sec_body_end === undefined) {
          sec_body_end = sec_end[i];
        } else sec_body_end = sec_body_end + sec_end[i];
      }

      return sec_body_start + sec_body_string + sec_body_end;
      break;
  }
};
