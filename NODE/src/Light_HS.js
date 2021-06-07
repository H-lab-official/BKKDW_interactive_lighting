const firebase = require("firebase");
const osc = require("osc"),
  http = require("http"),
  WebSocket = require("ws");
class Light_HS {
  constructor() {}

  async getDataLight_L_H(osc, side, type) {
    var ref = firebase
      .database()
      .ref(`BKKDSW/Light_Color_${side}_${type}/`)
      .on("value", (dataSnapshot) => {
        let value = dataSnapshot.val()["val"];
        this.sendDataToResulume(osc, side, type, value);
        // this.sendDataToResulume(osc, numberroom, dataSnapshot.val());
      });
  }

  sendDataToResulume(osc, numberroom, RGB, color) {
    console.log("numberroom = " + numberroom);
    console.log("color = " + color);
    console.log("RGB = " + RGB);
    osc.send(
      {
        address: `/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/${color}`,
        args: [
          {
            type: "f",
            value: RGB,
          },
        ],
      },
      "localhost",
      8000
    );
  }
}

module.exports = Light_HS;