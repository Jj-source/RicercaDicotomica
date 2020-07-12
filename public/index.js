        console.log("In esecuzione!");
        var a=[], n=2;
        var pd, pe;
        var convalida;
        var Canvas = document.getElementById('canvas');
        var Ctx = null ;
        var Width = Canvas.width ;
        var Height = Canvas.height ;

function Validate() {
        console.log("checkInizioValidate");
        convalida=true;
        console.log(convalida);
        document.getElementById("details").innerHTML ="";
            for (let q=n; q>=0; q--){
              let Term = "term"+q;
              a[q] = document.getElementById(Term).value;
            }
            d = document.getElementById("dterm").value;
            e = document.getElementById("eterm").value;

            // validate a, b and c
            for(let q=n; q>=0; q--){
              var ValoreNan = a[q];
              if (isNaN(ValoreNan) || ValoreNan=="") {
                  document.getElementById("demo").innerHTML ="coefficents must be numbers! Se non correggi l'errore i risultati saranno errati";
                  convalida=false;
                  console.log(convalida);
                }
            }
            if (isNaN(d) || d=="" || isNaN(e) || e=="" ) {
                document.getElementById("demo").innerHTML ="coefficents must be numbers! Se non correggi l'errore i risultati saranno errati";
                convalida=false;
                console.log(convalida);
              }
            console.log("checkFineValidate");
}

function CambioCoefficenti(){
    console.log("coeff in");
    var coeff = prompt("Qual'è il grado della funzione?", "3");
  if (isNaN(coeff) || coeff=="") {
      document.getElementById("demo").innerHTML ="Input non valido";
    } else {
      n=coeff;
      document.getElementById("demo").innerHTML ="Cambio di grado effettuato!";
    }
    AggiungiInput()

}

function AggiungiInput(){
            var container = document.getElementById("input_form");
            // Clear previous contents of the container
            while (container.hasChildNodes()) {
                container.removeChild(container.lastChild);
            }
            for (let q=n; q>=0; q--){
                // Create an <input> element, set its type and name attributes
                var input = document.createElement("input");
                input.id = "term"+q;
                input.className = "Coeff rounded";
                input.placeholder = "a"+q;
                container.appendChild(input);
            }
        }

function Calcolo(inc){
  var risultato=0;
  for (let q=n; q>=0; q--){
    risultato+=a[q]*(Math.pow(inc, q));
  }
  return risultato;
}
function Media(a,b){
  return ((-(a*-1)-(b*-1))/2);
}
function GetRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Zeri(){
  Validate();
  if(convalida===true){
    console.log("checkzeri");
    Estremi();
  }
}

function MasMin(){
  Validate();
  if(convalida===true){
  IndMasMin();
}
}

///////////////////////////////////////////////////
function EstSx(){
  var i=Media(e,d);
  if(Calcolo(i) <= 0.000001 && Calcolo(i) >= -0.000001){
    document.getElementById("demo").innerHTML ="Lo zero è nel punto:"+i;
  } else if(Calcolo(i) >0.000001) {
      d=i;
      EstSx();
  //    console.log(Arrotonda(d));
    } else if(Calcolo(i) <-0.000001) {
        e=i;
        EstSx();
    //    console.log(Arrotonda(e));
      }
}
function EstDx(){
  var i=Media(e,d);
 if(Calcolo(i) <= 0.000001 && Calcolo(i) >= -0.000001){
   document.getElementById("demo").innerHTML ="Lo zero è nel punto:"+i;
 } else if(Calcolo(i) >0.000001) {
     e=i;
     EstDx();
  //   console.log(Arrotonda(e));
   } else if(Calcolo(i) <-0.000001) {
       d=i;
       EstDx();
    //   console.log(Arrotonda(d));
     }
}

function Estremi(){
  pd=Calcolo(d);
  pe=Calcolo(e);
  document.getElementById("details").innerHTML ="f(x1)="+pd+", f(x2)="+pe;
  if(pd>=0 && pe<=0){
    console.log("x1 è il maggiore");
    EstSx();
  }else if(pe>=0 && pd<=0){
      console.log("x2 è il maggiore");
     EstDx();
    }else{
      document.getElementById("demo").innerHTML ="L'intervallo non soddisfa le condizioni del teorema, uno degli estremi dev'essere positivo e l'altro negativo: prova a modificarli!";
    }
}
//////////////////////////////////////////////////////////

function IndMasMin(){
  console.log("CheckindMasMin");
  var maxi=0, mini=0;
  var max=-1e20;
  var min=1e20;
  var i=Arrotonda(d);
  //console.log(d+" "+i+" "+e);
  do{
  //  console.log(calcolo(i) + " in "+ i)
    if(Calcolo(i)<min){
      min=Calcolo(i);
      mini=i;
    } else if (Calcolo(i)>max) {
      max=Calcolo(i);
      maxi=i;
    } else
    i= Arrotonda(i+0.02);
  //  console.log(i);
  } while(i<e);
  document.getElementById("demo").innerHTML ="Nell'intervallo, il massimo è in "+maxi+" ("+Arrotonda(max)+") ed il minimo in "+mini+" ("+Arrotonda(min)+")";
}

function Arrotonda(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

function ACaso(){
  console.log("checkRandom");
  for (let q=n; q>=0; q--){
    let Term = "term"+q;
    let ValoreRandom = GetRndInteger(-10,10);
    document.getElementById(Term).value = ValoreRandom;
}
  d = GetRndInteger(-15,14);
  document.getElementById("dterm").value = d;
  e = GetRndInteger(d+1,15);
  document.getElementById("eterm").value = e;
}

//////////////////////////////////////////////////////////

// Returns the right boundary of the logical viewport:
function MaxX() {
  return 20 ;
}

// Returns the left boundary of the logical viewport:
function MinX() {
  return -20 ;
}

// Returns the top boundary of the logical viewport:
function MaxY() {
  return MaxX() * Height / Width;
}

// Returns the bottom boundary of the logical viewport:
function MinY() {
   return MinX() * Height / Width;
}
// Returns the physical x-coordinate of a logical x-coordinate:
function XC(x) {
  return (x - MinX()) / (MaxX() - MinX()) * Width ;
}

// Returns the physical y-coordinate of a logical y-coordinate:
function YC(y) {
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height ;
}

/* Rendering functions */

// Clears the canvas, draws the axes and graphs the function F.
function Draw() {
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height);
   DrawAxes();
   Validate();
   RenderFunction();
}

// Returns the distance between ticks on the X axis:
function XTickDelta() {
  return 1 ;
}

// Returns the distance between ticks on the Y axis:
function YTickDelta() {
  return 1 ;
}

// DrawAxes draws the X ad Y axes, with tick marks.
function DrawAxes() {
 Ctx.save() ;
 Ctx.lineWidth = 2 ;
 // +Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MaxY())) ;
 Ctx.stroke() ;

 // -Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MinY())) ;
 Ctx.stroke() ;

 // Y axis tick marks
 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) < MaxY() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;
 }

 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) > MinY() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;
 }

 // +X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MaxX()),YC(0)) ;
 Ctx.stroke() ;

 // -X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MinX()),YC(0)) ;
 Ctx.stroke() ;

 // X tick marks
 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) < MaxX() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;
 }

 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) > MinX() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;
 }
 Ctx.restore() ;
}


// When rendering, XSTEP determines the horizontal distance between points:
var XSTEP = (MaxX()-MinX())/Width ;


// RenderFunction(f) renders the input funtion f on the canvas.
function RenderFunction() {
  var first = true;

  Ctx.beginPath() ;
  for (var x = MinX(); x <= MaxX(); x += XSTEP) {
   var y = Calcolo(x);
   if (first) {
    Ctx.moveTo(XC(x),YC(y)) ;
    first = false ;
   } else {
    Ctx.lineTo(XC(x),YC(y)) ;
   }
  }
  Ctx.stroke() ;
}
