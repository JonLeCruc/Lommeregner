/*Laver to variabler der bliver hentet af id
Disse bliver brugt til output og udregning*/
var input_box=document.getElementById("udregning");
var output_box=document.getElementById("output");
/*Laver en masse variabler som jeg bruger til at bestemme om
useren har trykket bestemte knapper eller ej.*/
var clear=false;
var operatorPressed = false;
var powerValue;
var powerPressed = false;
var squareValue;
var squarePressed = false;
var percentagePressed = false;
var sinPressed = false;
var cosPressed = false;
var tanPressed = false;
var powerValue2;
var powerPressed2 = false;

//laver en funktion der viser inputtet af hvad man indtaster i lommeregneren
function UserClickButton(value){
    /*Laver to if statements som afgører at hvis value er po(parentes open) 
    skal værdien være "(", og hvis value er pc(parentes close), skal den være
    ")"*/
    if(value=="po"){
        value="(";
    }
    if(value=="pc"){
        value=")";
    }
    /*Laver en funktion der tjekker om operatorpressed = true, og hvis den er, sættes clear til false*/
    if(value == '+' || value == '-' || value == '*' || value == '/' || value == '%' || value == '(' || value == ')' 
    || value == '^' || value == '√' || value == '％' || value == '^2'){
        operatorPressed=true;
        clear=false;
    }
    else{
        operatorPressed=false;
    }
    /*Her tjekker den om clear = true (hvis der lige er blevet foretaget en udregning)
        OG om operatorPressed = false (hvis brugeren ikke trykker på en operator efter en udregning)
        så skal den clear inputbox og outputbox*/
    if(clear==true && operatorPressed==false){
     output_box.value="";
     input_box.value="";
     clear=false;
}
        /*tilægger input fra useren*/
            input_box.value += value;
            output_box.value=input_box.value;  
        /*Her laver jeg en funktion der tjekker om værdien indeholder "^"
        Hvis den gør det skal min variable være = Math.pow("input før ^"),("input efter^")
        Derefter sætter den powerPressed til true som skal bruges til calculation.*/
        if(input_box.value.includes("^")){
            powerValue=Math.pow(parseInt(input_box.value.split("^")[0]),parseInt(input_box.value.split("^")[1]))
            powerPressed = true;
        }  
        /*Samme koncept her, bortset fra at den her sætter variablen til at være
        math.pow("input før operator"), 2*/
        if(input_box.value.includes("^2")){
            powerValue2=Math.pow(parseInt(input_box.value.split("^2")[0])), 2
            powerPressed2 = true;
        }
        if(input_box.value.includes("√")){
            squareValue=Math.sqrt(parseInt(input_box.value.split("√")[1]))
            squarePressed = true;
        }
        if(input_box.value.includes("％")){
            percentagePressed = true;
        }        
        if(input_box.value.includes("Sin")){
            sinPressed = true;
        }
        if(input_box.value.includes("Cos")){
            cosPressed = true;
        }
        if(input_box.value.includes("Tan")){
            tanPressed = true;
        }
}

//laver en funktion der beregner værdien af input boxen
function CalculateValue(){
    var input=input_box.value;
    var result;
    if(powerPressed == true) {
        result = powerValue;
        powerPressed = false;
    }
    else if(powerPressed2 == true) {
        result = powerValue2;
        powerPressed2 = false;
    }
    else if(squarePressed == true) {
        result = squareValue;
        squarePressed = false;
    }
    //samme koncept som før, bortset fra, at det er sat op på en mere simpel måde.
    //her tager den bare 2 input og ganger dem med hinanden og divaderer derefter med 100
    //(formlen for procentregning)
    else if(percentagePressed == true) {
        result = parseInt(input_box.value.split("％")[0]) * parseInt(input_box.value.split("％")[1]) / 100
        percentagePressed = false;
    }
    /*Her har jeg for sin, cos og tan lavet en funktion der først tjekker værdien af RAD knappen
    hvis værdien er "DEG", så skal radians være lig med input efter "sin", * Math.PI/180
    Hvilket er formlen for af lave degrees om til radians.
    og hvis værdien er "RAD", skal den bare køre den normale math.sin()*/
    else if(sinPressed == true) {   
        if(button.innerHTML === "DEG"){
            radians = parseInt(input_box.value.split("Sin")[1]) * Math.PI/180;
            result = Math.sin(radians);
            sinPressed = false;
        }
        else{
            result = Math.sin(parseInt(input_box.value.split("Sin")[1]))
            sinPressed = false;
        }
    }
    else if(cosPressed == true) {  
        if(button.innerHTML === "DEG"){
            radians = parseInt(input_box.value.split("Cos")[1]) * Math.PI/180;
            result = Math.cos(radians);
            cosPressed = false;
        }
        else{
            result = Math.cos(parseInt(input_box.value.split("Cos")[1]))
            cosPressed = false;
        } 
    }
    else if(tanPressed == true) {   
        if(button.innerHTML === "DEG"){
            radians = parseInt(input_box.value.split("Tan")[1]) * Math.PI/180;
            result = Math.tan(radians);
            tanPressed = false;
        }
        else{
            result = Math.tan(parseInt(input_box.value.split("Tan")[1]))
            tanPressed = false;
        }
    }
    
    else{
        /*eval er godt at bruge, fordi den følger regnehiarkiets regler for at prioritere de forskellige operators
        samt kan den f.eks. også regne med negative tal, dog er jeg godt klar over at eval kan være farligt at bruge*/
        result=eval(input);
    }
    input_box.value=result;
    clear=true;
    //console.log(clear)
}

/*Sætter værdien til input_box.value til ingenting ved brug af "", 
Hvilket rydder alt i feltet*/
function ClearData(){
    input_box.value="";
    output_box.value="";
}


/*Her har jeg lavet en funktion til backspace hvor jeg har sagt, at hvis clear er true (hvis man lige har lavet en udregning)¨
så skal den slette et tal ad gangen men kun i øverste felt, ellers skal den slette et tal ad gangen i begge felter */
function backspace() {
    if(clear == true){
        var udregning = document.getElementById("udregning").value;
        document.getElementById("udregning").value = udregning.substring(0, udregning.length - 1);
    }
    else{
/*Jeg laver først 2 variabler og sætter dem til værdien af de 2 felter.
Derefter bestemmer jeg at deres værdi skal være = output/udregnings længde - 1 
note: jeg ved godt man i stedet kunne bruge .pop(), men synes dette er en sjovere metode.*/
        var output = document.getElementById("output").value;
        var udregning = document.getElementById("udregning").value;
        document.getElementById("output").value = output.substring(0, output.length - 1);
        document.getElementById("udregning").value = udregning.substring(0, udregning.length - 1);
    }
  }

  /*ændrer værdien af "RAD" til "DEG" onclick og modsat, og dermed også farven af teksten.*/
  function changeState() {
    var button = document.querySelector("#button");
    if (button.innerHTML === "RAD") {
        button.innerHTML = "DEG";
        button.style.color = 'crimson';
    } else {
        button.innerHTML = "RAD";
        button.style.color = 'blue';
    }
}



  
  

  

  
  