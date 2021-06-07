function zfunc(){

		// $(".start").addClass('animate__animated', 'animate__fadeOut');
		const element = document.querySelector('.PAGEONE');
		element.classList.add('animate__animated', 'animate__fadeOut');
		let t2= setTimeout(function(){
			element.style.display = "none";
			const element2 = document.querySelector('.PAGETWO');
			element2.style.display = "inline";
			var content = element2.innerHTML;
			element2.innerHTML= content; 

			// element2.classList.add('animate__animated', 'animate__fadeInUp');
    }, 1000); 
    
    this.insertQ();

    }

    
    $(async function () {
        setCookie(null);
    firebase.database().ref("Data/Q/").limitToFirst(1).on('value', function(snapshot){

        if (snapshot.val() == null ){
            firebase.database().ref("Data/PresenQ/").limitToFirst(1).once('value', function(snapshot){
                console.log(snapshot.val().Q);
                document.getElementById('presenQ').innerHTML = snapshot.val().Q;
            });
        }else{
            document.getElementById('presenQ').innerHTML = Object.keys(snapshot.val())[0];
            document.getElementById('presenQ1').innerHTML = Object.keys(snapshot.val())[0];
            let checkQ = getCookie("Q");
            if(checkQ != "")
            {
            console.log(checkQ);
             document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
             let remain_q = document.getElementById('wait1').innerHTML;
            if (remain_q == '0'){
                Qzero();
            }
             // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
            }else{
             
            }
          
        }
        let checkQ = getCookie("Q");
        
        if(snapshot.val() != null)
        {
            if(checkQ == Object.keys(snapshot.val())[0]){
                timeOut(checkQ);
            }


        }

    })

    let checkQ = getCookie("Q");
    if(checkQ != "")
    {
               // $(".start").addClass('animate__animated', 'animate__fadeOut');
    const element = document.querySelector('.PAGEONE');
    element.classList.add('animate__animated', 'animate__fadeOut');

        element.style.display = "none";
        const element2 = document.querySelector('.PAGETWO');
        element2.style.display = "inline";
        var content = element2.innerHTML;
        element2.innerHTML= content; 

        let rest_q = document.getElementById('wait1').innerHTML;
        console.log("restQQ = "+checkQ);

        // element2.classList.add('animate__animated', 'animate__fadeInUp');
        
    firebase.database().ref("Data/Q/"+checkQ).on('value', function (params) {
        console.log("validate count ="+JSON.stringify(params.val()));
        if(params.val()===null){
             var mydate = new Date();
             mydate.setTime(mydate.getTime() - 1);
             document.cookie = "Q=null; expires=" + mydate.toGMTString(); 
             document.cookie = "Time=null; expires=" + mydate.toGMTString();
             location.reload();
        }
    })
        
    }

    firebase.database().ref("Data/Q/").limitToFirst(1).on('value',async function(snapshot){
        document.getElementById('wait').innerHTML = 0; 
  
        if(snapshot.val() != undefined || snapshot.val()!=null){
            var x =await Object.keys(snapshot.val())[0];
            firebase.database().ref("Data/Q/").once('value',async function(snapshot){
                console.log("NUM" + snapshot.numChildren() + "    X "+x);
                document.getElementById('wait').innerHTML =await snapshot.numChildren();
                // document.getElementById('wait1').innerHTML = Object.keys(snapshot.val())[0]-x+1;
            });
            if (snapshot.val() == null ){
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+0+'</p>';
            }else{
                // document.getElementById('allQ').innerHTML = '<p> คิวทั้งหมด : '+snapshot.val()+'</p>';
            }
        }

    })
    firebase.database().ref("Data/Q/").limitToLast(1).on('value', function(snapshot){

    });

});


async function insertQ(){
  

    let conf=await confirm("คุณต้องการจองคิวหรือไม่ ? ");
    if(conf ==await true)
    {    
        
     var result =await  this.validateQ().then(function(params) {
                 return params
             });
     let count =parseInt(result)+1;
 
   this.setCookie(count);
             
      await  firebase.database().ref("Data/Q/"+parseInt(count)).set({
             "TimeStart" : "X",
             "TimeEnd":"A"
             
        });
     await  firebase.database().ref("Data/AllQ/Q/").set(
         parseInt(count)
    );
    await  firebase.database().ref("Data/PresenQ/Q/").set(
        parseInt(count)
   );
    firebase.database().ref("Data/Q/"+count).on('value', function (params) {
        console.log("validate count ="+JSON.stringify(params.val()));
        if(params.val()===null){
             var mydate = new Date();
             mydate.setTime(mydate.getTime() - 1);
             document.cookie = "Q=null; expires=" + mydate.toGMTString(); 
             document.cookie = "Time=null; expires=" + mydate.toGMTString();
             location.reload();
        }
    })
//    console.log('COOQQQQQQQ = '+JSON.stringify(count));
    }

    firebase.database().ref("Data/Q/").limitToFirst(1).once('value', function(snapshot){
        let checkQ = getCookie("Q");
        if(checkQ != "")
        {
            console.log(checkQ);
         document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];
         // document.getElementById('wait1').innerHTML = checkQ -Object.keys(snapshot.val())[0];


        }else{
         
        }
    });
 }
 
 async function validateQ() {
     return new Promise(async (resolve, reject) => {
         await firebase.database().ref("Data/AllQ/Q").once('value',async function(snapshot){
             if(snapshot.val() == null){
                 resolve(0);
                 return
             }
         Q =await snapshot.val(); 
         resolve(Q);
         return
        });
 
     });
 }
 
 async function setCookie(count) {
     if(count == null)
     {
         var qcookie = this.getCookie("Q");
         document.getElementById('yourQ').innerHTML = qcookie;
 
         return
     }
     var mydate = new Date();
     mydate.setTime(mydate.getTime() + 4800 * 1000);
     console.log(mydate)
     document.cookie = `Q=${count}; expires= ${mydate} `
     var qcookie = this.getCookie("Q");
     document.getElementById('yourQ').innerHTML =  qcookie;
 }
 
 function getCookie(cname) {
     var name = cname + "=";
     var decodedCookie = decodeURIComponent(document.cookie);
     var ca = decodedCookie.split(';');
     for(var i = 0; i <ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
     }
     return "";
   }
 
   var intervalcountdown = null

  async function  timeOut(Q) {
      var count = 180;
    //   alert(getCookie('Time'))
      console.log("cookidfdfde = "+getCookie('Time'));
      if(getCookie('Time')<=count && getCookie('Time')!=""){
          count = getCookie('Time');
      }
    
      intervalcountdown = setInterval(async function () {
        count--;
        console.log(count);
        document.cookie = `Time=${count}`;
        console.log("cookie = " + getCookie("Time"));
        document.querySelector(
          ".navbar"
        ).innerHTML = `<h2>คุณมีเวลาเหลือ ${getCookie("Time")} วินาที</h2>`;
        // document.getElementById('time').innerHTML = '<p> เหลือเวลา : '+ count+'</p>';
        if (count == 0) {
          console.log(count);
          clearInterval(intervalcountdown);
          var mydate = new Date();
          mydate.setTime(mydate.getTime() - 1);
          document.cookie = "Q=null; expires=" + mydate.toGMTString();
          document.cookie = "Time=null; expires=" + mydate.toGMTString();
          firebase
            .database()
            .ref("Data/Q/" + Q)
            .remove();

          setSpeed2Firebase(0);
          firebase.database().ref("Data/Movement").set({
            Status: 11,
          });

          for (let indexz = 0; indexz < 24; indexz++) {
            firebase
              .database()
              .ref("Data/Color/Room" + (indexz + 1))
              .set({
                red: 255,
                green: 255,
                blue: 255,
              });
          }

          var z = setTimeout(function () {
            location.reload();
          }, 1000);
        }
      }, 1000);
     
   }











//----------------Start initController function----------------
const initController = ()=>{
  //initvalue
  setLight_HS_2Firebase("L", "hue", 0);
  setLight_HS_2Firebase("L", "saturation", 0);
  setLight_HS_2Firebase("R", "hue", 0);
  setLight_HS_2Firebase("R", "saturation", 0);
  setLight_isON_2Firebase("L", 0);
  setLight_isON_2Firebase("R", 0);
  setLight_BOTH_2Firebase(1);
  //----------------initial variable----------------
  // Create new link Element
  var link = document.createElement("link");

  // set the attributes for link element
  link.rel = "stylesheet";

  link.type = "text/css";

  link.href = "controller.css";

  // Get HTML head element to append
  // link element to it
  document.getElementsByTagName("HEAD")[0].appendChild(link);

  //resetbtn
  let resetbtn = document.querySelector(".resetbtn");
  
  
      resetbtn.onclick = () => {
        console.log("into reset");
        
        var r = confirm("Are You sure to finish?");
        if (r == true) {
                  firebase
                    .database()
                    .ref("Data/Q/")
                    .limitToFirst(1)
                    .once("value", function (snapshot) {
                      console.log("testFIREBASE");
                      console.log(snapshot.val());
                      if (snapshot.val() === null) {
                        console.log("isNUll");
                      } else {
                        console.log("notNUll");
                        console.log("Hello" + Object.keys(snapshot.val()));
                        firebase
                          .database()
                          .ref("Data/Q/" + Object.keys(snapshot.val()))
                          .remove();
                        console.log("DELETE Q");

                        clearInterval(intervalcountdown);
                        var mydate = new Date();
                        mydate.setTime(mydate.getTime() - 1);
                        document.cookie =
                          "Q=null; expires=" + mydate.toGMTString();
                        document.cookie =
                          "Time=null; expires=" + mydate.toGMTString();

                        var z = setTimeout(function () {
                          location.reload();
                        }, 1000);
                      }
                    });
        } else {
          
        }

      };

  //color picker
  let colorPickerL_hue = new iro.ColorPicker("#pickerL_hue", {
    layoutDirection: "horizontal",
    width: 240,
    margin: 50,
    layout: [
      {
        component: iro.ui.Slider,
        options: {
          // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
          sliderType: "hue",
        },
      },
    ],
  });

  let colorPickerL_sat = new iro.ColorPicker("#pickerL_sat", {
    layoutDirection: "horizontal",
    width: 240,
    margin: 50,
    layout: [
      {
        component: iro.ui.Slider,
        options: {
          // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
          sliderType: "saturation",
        },
      },
    ],
  });

  let colorPickerR_hue = new iro.ColorPicker("#pickerR_hue", {
    layoutDirection: "horizontal",
    width: 240,
    margin: 50,
    layout: [
      {
        component: iro.ui.Slider,
        options: {
          // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
          sliderType: "hue",
        },
      },
    ],
  });

  let colorPickerR_sat = new iro.ColorPicker("#pickerR_sat", {
    layoutDirection: "horizontal",
    width: 240,
    margin: 50,
    layout: [
      {
        component: iro.ui.Slider,
        options: {
          // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
          sliderType: "saturation",
        },
      },
    ],
  });

  //----------------function for set css in each element----------------
  const css = (element, style) => {
    for (const property in style) element.style[property] = style[property];
  };


  //----------------function about color picker----------------

  //colorPickerL_hue;
  colorPickerL_hue.on("color:change", function (color) {
    // console.log("colorPickerL_hue; = "+color);
  });

  colorPickerL_hue.on("input:end", function (color) {
    console.log("colorPickerL_hue End = "+color.$.h);
    let norm_color = color.$.h/360;
    console.log("colorPickerL_hue NORM = " + norm_color);
    setLight_HS_2Firebase('L','hue',norm_color);
    setLight_BOTH_2Firebase(0);
});

  //colorPickerL_sat;
  colorPickerL_sat.on("color:change", function (color) {
    // console.log("colorPickerL_sat; = "+color);
  });

  colorPickerL_sat.on("input:end", function (color) {
    console.log("colorPickerL_sat End = " + color.$.s);
    let norm_color = color.$.s / 100;
    console.log("colorPickerL_sat NORM = " + norm_color);
    setLight_HS_2Firebase("L", "saturation", norm_color);
    setLight_BOTH_2Firebase(0);
});

  //colorPickerR_hue;
  colorPickerR_hue.on("color:change", function (color) {
    // console.log("colorPickerR_hue; = "+color);
  });

  colorPickerR_hue.on("input:end", function (color) {
    console.log("colorPickerR_hue End = " + color.$.h);
    let norm_color = color.$.h / 360;
    console.log("colorPickerR_hue NORM = " + norm_color);
    setLight_HS_2Firebase('R','hue',norm_color);
    setLight_BOTH_2Firebase(0);
});

  //colorPickerR_sat;
  colorPickerR_sat.on("color:change", function (color) {
    // console.log("colorPickerR_sat; = "+color);
  });

  colorPickerR_sat.on("input:end", function (color) {
    console.log("colorPickerR_sat End = " + color.$.s);
    let norm_color = color.$.s / 100;
    console.log("colorPickerR_sat NORM = " + norm_color);
    setLight_HS_2Firebase("R", "saturation", norm_color);
    setLight_BOTH_2Firebase(0);
});


//toggle
let toggle_light_L = document.querySelector("#toggle_light_L");
let toggle_light_R = document.querySelector("#toggle_light_R");

toggle_light_L.onchange = () => {
  var isChecked = document.getElementById("toggle_light_L").checked;
  if (isChecked) {
    let norm_toggle = 1;
    console.log("toggle_L " + norm_toggle);
    setLight_isON_2Firebase('L',norm_toggle);
    setLight_BOTH_2Firebase(0);
  } else {
    let norm_toggle = 0;
    console.log("toggle_L " + norm_toggle);
    setLight_isON_2Firebase("L", norm_toggle);
    setLight_BOTH_2Firebase(0);
  }
};

toggle_light_R.onchange = () => {
  var isChecked = document.getElementById("toggle_light_R").checked;
  if (isChecked){
    let norm_toggle = 1;
    console.log("toggle_R " + norm_toggle);
    setLight_isON_2Firebase('R',norm_toggle);
    setLight_BOTH_2Firebase(0);
  }else{
    let norm_toggle = 0;
    console.log("toggle_R " + norm_toggle);
    setLight_isON_2Firebase("R", norm_toggle);
    setLight_BOTH_2Firebase(0);
  }
};
    




}
//----------------END initController function----------------



// --------------------------------FIRE BASE func---------------------------

// firebase.database().ref("Data/Color/").limitToFirst(1).on('value', function(snapshot){
//     console.log("testFIREBASE");
//     console.log(snapshot.val());
// });


const setRoomcolor2Firebase=(buillding_arr,roomindex,row_index,col_index)=>{
    firebase.database().ref("Data/Color/Room"+(roomindex+1)).set({
             "red" :buillding_arr[row_index][col_index].r,
             "green" :buillding_arr[row_index][col_index].g,
             "blue" :buillding_arr[row_index][col_index].b
    });
}


// firebase.database().ref("Data/Q/kkk").set({
//              "TimeStart" : "1",
//              "TimeEnd":"ss"
             
// });

// firebase.database().ref("Data/Q/kkk").remove();


const setMovement2Firebase=(movement_state)=>{


    firebase.database().ref("Data/Movement").set({
             "Status" : movement_state,
    });
}


const setSpeed2Firebase=(speed_state)=>{
    firebase.database().ref("Data/Speed").set({
             "Status" : speed_state,
    });
}



//-------------NEO Firebase function-----------
const setLight_HS_2Firebase = (
  side,
  type,
  norm_val,
) => {
  firebase.database().ref(`Data/BKKDSW/Light_Color_${side}_${type}`).set({
    val: norm_val,
  });
};

const setLight_isON_2Firebase = (side, norm_val) => {
  firebase.database().ref(`Data/BKKDSW/Light_isON_${side}`).set({
    Status: norm_val,
  });
};

const setLight_BOTH_2Firebase = (norm_val) => {
  firebase.database().ref(`Data/BKKDSW/Light_Both`).set({
    Status: norm_val,
  });
};

//-------------footer btn section-------------

let navbar = document.querySelector('.navbar');
let firstpage = document.querySelector('.firstpage');
let splashpage = document.querySelector('.splash');
let aboutUSsection = document.querySelector('.aboutUSsection');
// let aboutUSdiv = document.querySelector('.aboutUSdiv');
const css=(element, style)=> {
    for (const property in style)
        element.style[property] = style[property];
}


let colorpickSection = document.querySelector('.colorpicksection');
css(colorpickSection, { display: "none" });


//-------------------------Qzero ->this finction worl when rest of Q is Zero-------------------------
const Qzero =()=>{
    css(splashpage,{'display':'none',}); 
    css(firstpage,{'display':'none',}); 
    initController(); //init light,movement,speed controller
    let t1= setTimeout(() => { 
        
        css(colorpickSection,{'display':'flex',});
        colorpickSection.classList.add('animate__animated', 'animate__fadeInUp');
        // footerparent1.classList.remove('BACTIVE');
        // footerparent2.classList.add('BACTIVE');
        // footerparent3.classList.remove('BACTIVE');
        // footerparent4.classList.remove('BACTIVE');
        // let divbtnMovementdefault = document.querySelector('#directionbtn'+0);
        // divbtnMovementdefault.src = "img/Button/active/act1.png";
        setMovement2Firebase(10);
    }, 1000);
//---------------- mode color pick toggle----------------
    
}