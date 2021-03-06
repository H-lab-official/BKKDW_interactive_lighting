const firebase = require('firebase');
const controller = require('./src/Controller')
const room = require('./src/Room');
const validate = require('./src/Controller');
const counter = require('./src/Counter');
const lightHSV = require("./src/Light_HS");
const lightisON = require("./src/Light_isON");
const LightBoth = require("./src/Light_Both");

const osc = require("osc"),
    http = require("http"),
    WebSocket = require("ws");
class Index{

    constructor(){
        this.app = firebase.initializeApp({     
            apiKey: "AIzaSyDFSl2QDM96BReRFGR4MwrpbFXwao7NuP0",
        authDomain: "ubon-88459.firebaseapp.com",
        databaseURL: "https://ubon-88459.firebaseio.com",
        projectId: "ubon-88459",
        storageBucket: "ubon-88459.appspot.com",
        messagingSenderId: "835364456620",
        appId: "1:835364456620:web:337d85f78f0f4f75da7709",
        measurementId: "G-J3YXEF9H0V"});
        
        // this.udpPort = new osc.UDPPort({
        //     localAddress: "0.0.0.0",
        //     localPort: 1235,
        //     metadata: true
        // });
                this.udpPort = new osc.UDPPort({
            localAddress: "0.0.0.0",
            localPort: 1235,
            metadata: true
        });
        this.udpPort.open();
        // for(let i=1; i<=24; i++){
        //     new room().getDataRoom(this.udpPort, i);
        // }  
        // new controller().getDataMovement(this.udpPort);
        // new controller().getDataSpeed(this.udpPort);

        new lightHSV().getDataLight_HS(this.udpPort, 'L', 'hue');
        new lightHSV().getDataLight_HS(this.udpPort, "L", "saturation");
        new lightHSV().getDataLight_HS(this.udpPort, "R", "hue");
        new lightHSV().getDataLight_HS(this.udpPort, "R", "saturation");

        new lightisON().getDataLight_isON(this.udpPort, "L");
        new lightisON().getDataLight_isON(this.udpPort, "R");

        new LightBoth().getDataLight_Both(this.udpPort);
        new counter().removeQ();
    }

//    async getData(xxx,numberroom){
//        //address:`/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/`,
//         var ref = firebase.database().ref(`Data/Color/Room${numberroom}/`).on('value',async function(dataSnapshot) {
//             // console.log(dataSnapshot.val());

//                        xxx.send({
//                 address: `/composition/layers/${numberroom}/clips/8/video/source/solidcolor/color/`,
//                 args: [
//                     {
//                         type: "r",
//                         value: {
//                             r: dataSnapshot.val().R,
//                             g: dataSnapshot.val().G,
//                             b: dataSnapshot.val().B,
//                         }
//                     }
//                 ],
//             }, "127.0.0.1", 1235);
          
   
//           }
//           );
          
//     }

//     async xxx(data){

//         // var udpPort = new osc.UDPPort({
//         //     localAddress: "0.0.0.0",
//         //     localPort: 1234,
//         //     metadata: true
//         // });
//         // udpPort.open();
//         // udpPort.on("ready",async function () {
//         //     console.log("s");
//         //     udpPort.send({
//         //         address: "/s_new",
//         //         args: [
//         //             {
//         //                 type: "s",
//         //                 value: "default"
//         //             },
//         //             {
//         //                 type: "i",
//         //                 value: 200
//         //             }
//         //         ]
//         //     }, "192.168.1.160", 1234);
//         // });
//     }
}

var x = new Index();










