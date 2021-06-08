const firebase = require("firebase");
const osc = require("osc"),
  http = require("http"),
  WebSocket = require("ws");

class Light_HS {
  constructor() {}

  async getDataLight_HS(osc, side, type) {
    var ref = firebase
      .database()
      .ref(`Data/BKKDSW/Light_Color_${side}_${type}/`)
      .on("value", (dataSnapshot) => {
        let value = dataSnapshot.val()["val"];
        this.sendDataToResulume(osc, side, type, value);
        // this.sendDataToResulume(osc, numberroom, dataSnapshot.val());
      });
  }

  sendDataToResulume(osc, side, type, value){
    
    console.log("type = " + type);
    console.log("hsv value = " + value);
    if(side=="L"){
        console.log("side = " + side);
    osc.send(
      {
        address: `/composition/layers/1/clips/2/video/source/solidcolor/color/${type}`,
        args: [
          {
            type: "f",
            value: value,
          },
        ],
      },
      "localhost",
      8000
    );
    }else if(side=="R"){
        console.log("side = " + side);
    osc.send(
      {
        address: `/composition/layers/2/clips/2/video/source/solidcolor/color/${type}`,
        args: [
          {
            type: "f",
            value: value,
          },
        ],
      },
      "localhost",
      8000
    );
    }

  }
}

module.exports = Light_HS;