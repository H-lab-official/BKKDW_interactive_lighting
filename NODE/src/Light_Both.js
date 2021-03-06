const firebase = require("firebase");
const osc = require("osc"),
  http = require("http"),
  WebSocket = require("ws");

class Light_Both {
  constructor() {}

  async getDataLight_Both(osc) {
    var ref = firebase
      .database()
      .ref(`Data/BKKDSW/Light_Both/`)
      .on("value", (dataSnapshot) => {
        let value = dataSnapshot.val()["Status"];
        this.sendDataToResulume(osc, value);
        // this.sendDataToResulume(osc, numberroom, dataSnapshot.val());
      });
  }

  sendDataToResulume(osc, value) {
      if (value == 1) {
        console.log("light both val = " + value);
        osc.send(
          {
            address: `/composition/columns/1/connect`,
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
      } else if (value == 2) {
        //Auto1
        console.log("light both val = " + value);
        osc.send(
          {
            address: `/composition/columns/3/connect`,
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
      } else if (value == 3) {
        //Auto2
        console.log("light both val = " + value);
        osc.send(
          {
            address: `/composition/columns/4/connect`,
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
      }else{
        console.log("Bla Bla");
      }

        
  }
}

module.exports = Light_Both;
