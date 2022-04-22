/* PRELOADER */

(function(){ 
  document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
              
      /**
       * Setup your Lazy Line element.
       * see README file for more settings
       */
      let el = document.querySelector('#ONE_VECTOR_ILLUSTRATION');
      let myAnimation = new LazyLinePainter(el, {"ease":"easeLinear","strokeWidth":4.6,"strokeOpacity":1,"strokeColor":"#222F3D","strokeCap":"square"}); 
      myAnimation.paint();
      setTimeout(function(){
        el.setAttribute("class", "hidden")},
        2000)
    }
  }
})();






var counter = 0;
var timecodes = new Array();
var minSec = new Array();

let btnAdd = document.getElementById("illegal");
let btnRemove = document.getElementById("remove");
let btnResult = document.getElementById("resultbtn");
let number = 0;
let usertimecode = new Array;
let goodcalls = new Array;
let uniquegoodcalls = new Array;
let baddecisions = new Array;
resultsdiv = document.getElementById("results");

let btnStart = document.getElementById("playbtn");
let buttonsdiv = document.getElementById("buttonsdiv");







let table = document.querySelector('table');
let missedtable = document.getElementById('divtablemissed');
let nameInput = document.querySelector("[data-active = 'active']");



let vid = document.getElementById("myVideo");
let solutions = [69.897515, 93.365608]

let template =`
<table id="mytablestyle">
<tbody>
<tr>
    <th>Nr.</th>
    <th>Your Call</th>
    <th>Timecode</th>
    <th id="hiddencol">Replay</th>
    <th id="hiddencol">Solution</th>
</tr>
</tbody>
</table>
`;

let missedtemplate = `<tbody>
<tr>
    <th>Nr.</th>
    <th>Timecode</th>
    <th>Replay</th>
</tr>
</tbody>
`

function clearTables(){
  table.innerHTML = template;
  missedtable.innerHTML = missedtemplate;
  resultsdiv.innerHTML = "";
  btnStart.style.display ="inline-block";
  buttonsdiv.setAttribute("class", "nodisplay");
  btnRemove.disabled = false;
  btnAdd.disabled = false;
  btnRemove.setAttribute("class", "button");
  btnAdd.setAttribute("class", "button buttonillegal");
  btnResult.disabled = true;
  btnResult.setAttribute("class", "button disabled");
  document.getElementById("overlay").innerText = vid.getAttribute("src").slice(0,-4);
}


/* VIDEOS ARE HERE */

document.getElementById("vid1").addEventListener("click", function () {
  vid.setAttribute("src", "https://cdn.buttercms.com/OjemTzZeQoygSoN25LSx");
  solutions = [69.897515, 93.365608];
  clearTables();
  
  

})

document.getElementById("vid2").addEventListener("click", function () {
  vid.setAttribute("src", "video2.mp4");
  solutions = [10, 20, 30];
  clearTables();
})


function getCurTime() { 
  alert(vid.currentTime);
} 

function setCurTime() { 
  vid.currentTime=5;
} 



















const func = () => console.log("hi");
const repetition = timecodes.length;

Array.from({length: repetition}, () => func());

var b = 0;


/* function checkMistakes(){
        vid.currentTime = timecodes[b] - 5;
        vid.play();
        b++;
        };
*/
/* START BUTTON */




btnStart.addEventListener('click', ()=> {
  vid.play();
  buttonsdiv.setAttribute("class", "");
  btnStart.style.display ="none";
})

/* DECISION: On click, add new row to table */

/* add/remove row to table */


btnAdd.addEventListener('click', () => {
    number ++;
    let illegalattack = btnAdd.value;
    usertimecode.push(vid.currentTime);

    /* Check if usertimecodes are in solutions array - 3 SECONDS available to press illegal attack */
    let solution = 0;
    for (let i=0; i<solutions.length; i++) {
      if (((vid.currentTime - solutions[i]) < 3) && ((vid.currentTime - solutions[i]) >= 0)){
        solution += 1;
        goodcalls.push(solutions[i]);
      
      }
    }

    if (solution != 0) {
      solution = `<td id="hidden" class="correct">correct</td>`
      ;
    } else solution = `<td id="hidden" class="incorrect">incorrect</td>`;

    /* calculate times (min and sec) */

    let usertimecodeshort = Math.floor(vid.currentTime / 60) + " min " + Math.round((vid.currentTime - (Math.floor(vid.currentTime / 60) *60))) + " sec";

    /* HTML template to fill into code */
    let template = `
                <tr>
                  <td>${number}</td>  
                  <td>${illegalattack}</td>
                  <td>${usertimecodeshort}</td>
                  <td id="hiddencol"><button id="replaybtn" class="buttonreplay">Replay</button></td>
                  ${solution}
                </tr>`

    table.innerHTML += template;

       /* scroll to bottom of DIV */

       var divtable = document.getElementById("divtable");
       divtable.scrollTop = divtable.scrollHeight;
   

      /* select and set replay */

    for (let i=0; i < usertimecode.length; i++ ){
      document.querySelectorAll('#replaybtn')[i].addEventListener('click', () => {
      vid.currentTime = usertimecode[i] - 4;
      vid.play();
      vid.playbackRate = 0.5;
      setTimeout(function(){
        vid.pause()},
        9000)
      });
    };

    console.log(usertimecode);

  });

  /* DELETE ROW (UNDO) */

btnRemove.addEventListener('click', () => {
  table.deleteRow(-1);
  number --;
  usertimecode.splice(-1);
  let tb = document.querySelectorAll('tbody');
  for (let i =0; i<tb.length; i++){
    if (tb[i].children.length === 0) {
      tb[i].parentNode.removeChild(tb[i]);
    }
  }
});

/* SHOW RESULTS button */

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


btnResult.addEventListener('click', ()=> {

  /* Select only the unique values of GoodCalls and then remove those from solutions to get the array of missed illegal attacks
     variable name: missedillegals */

  uniquegoodcalls = goodcalls.filter(onlyUnique);

  missedillegals = solutions.filter( ( el ) => !uniquegoodcalls.includes( el ));
  console.log(missedillegals);

  for (let i=0; i < missedillegals.length; i++ ){
    let templatemissed = `
                <tr>
                  <td>${i+1}</td>  
                  <td>${Math.floor(missedillegals[i] / 60) + " min " + Math.round((missedillegals[i]) - (Math.floor(missedillegals[i] / 60) *60)) + " sec"}</td>
                  <td id="hiddencol"><button id="replaybtnmissed" class="buttonreplay">Replay</button></td>
                </tr>`

      missedtable.innerHTML += templatemissed;
  };

  for (let i=0; i < missedillegals.length; i++ ){
    document.querySelectorAll('#replaybtnmissed')[i].addEventListener('click', () => {
    vid.currentTime = missedillegals[i] - 4;
    vid.play();
    vid.playbackRate = 0.5;
    });
  };

  resultsdiv.innerHTML += 
    `<p> Total Calls: ${number} <br>
     Correct calls: ${uniquegoodcalls.length} / ${solutions.length} (${Math.round((uniquegoodcalls.length / solutions.length)*100)} %) <br>
     Incorrect calls: ${number - uniquegoodcalls.length} <br>
     Missed calls: ${missedillegals.length} <br>
    </p>
    `;

    btnRemove.disabled = true;
    btnAdd.disabled = true;
    btnRemove.setAttribute("class", "button disabled");
    btnAdd.setAttribute("class", "button buttonillegal disabled");
    btnResult.disabled = true;
    btnResult.setAttribute("class", "button disabled");

  for (let i=0; i < usertimecode.length; i++ ){
    document.querySelectorAll('#replaybtn')[i].style.display = "block";
    document.querySelectorAll('#hidden')[i].style.display = "block";    
}});

/* only enable SHOW results 10 seconds before the end of the video */

let showresultsbtn = document.getElementById("resultbtn");
showresultsbtn.disabled = true;
vid.addEventListener('timeupdate', function(){
  if (vid.currentTime > (vid.duration - 10)){
    showresultsbtn.setAttribute("class", "button");
    showresultsbtn.disabled = false;
  };
  });




/* restart game*/










/*vid.addEventListener("function", function(){
    if (this.currentTime == 15){
        alert('Number of your illegal attacks: $counter');
}})*/

