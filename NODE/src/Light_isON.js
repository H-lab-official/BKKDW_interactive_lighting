const firebase = require("firebase");
const osc = require("osc"),
  http = require("http"),
  WebSocket = require("ws");

class Light_isON {
  constructor() {}

  async getDataLight_isON(osc, side) {
    var ref = firebase
      .database()
      .ref(`Data/BKKDSW/Light_isON_${side}/`)
      .on("value", (dataSnapshot) => {
        let value = dataSnapshot.val()["Status"];
        this.sendDataToResulume(osc, side, value);
        // this.sendDataToResulume(osc, numberroom, dataSnapshot.val());
      });
  }

  sendDataToResulume(osc, side, value) {
    if (side == "L") {
      console.log("side = " + side);
      if(value==1){
          console.log("isOn value = " + value);
          osc.send(
            {
              address: `/composition/layers/1/clips/2/connect`,
              args: [
                {
                  type: "i",
                  value: 1,
                },
              ],
            },
            "localhost",
            8000
          );
      }else if(value==0){
          console.log("isOn value = " + value);
            osc.send(
            {
                address: `/composition/layers/1/clips/1/connect`,
                args: [
                {
                    type: "i",
                    value: 1,
                },
                ],
            },
            "localhost",
            8000
            );
      }
     
    } else if (side == "R") {
      console.log("side = " + side);
      if (value == 1) {
          console.log("isOn value = " + value);
        osc.send(
          {
            address: `/composition/layers/2/clips/2/connect`,
            args: [
              {
                type: "i",
                value: 1,
              },
            ],
          },
          "localhost",
          8000
        );
      } else if (value == 0) {
          console.log("isOn value = " + value);
        osc.send(
          {
            address: `/composition/layers/2/clips/1/connect`,
            args: [
              {
                type: "i",
                value: 1,
              },
            ],
          },
          "localhost",
          8000
        );
      }
    }
  }
}

module.exports = Light_isON;
