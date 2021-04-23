// déclaration des var et valeur par défauts
var clicks = []; // tableau pour stocker les valeurs des x,y, dragging --> potentiel retour en arrière programmable
var mouseDown = false;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var color = colorPurple;

// push --> ajoute un nouvel item à une array
function addClick(x, y, dragging) {
    clicks.push( {
        x: x,
        y: y,
        dragging: dragging, // boolean --> possibilité de faire un bouton pour faire des lignes ou non
        color: color
    } );
 }

// Fonction redraw --> la ou la magie opère --> à chaque fois que la fonction est appelée, le canvas est netoyé 
// Ceci permet de potentiellement crée une fonction control z qui n'efface pas les ancients traits se trouvant sur le même tracer que la dernière action
// + quelques propriétés pour la couleur, forme et largeur du marker
function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    //context.strokeStyle = color;
    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i = 0; i < clicks.length; i++) {
        context.beginPath();
        context.strokeStyle = clicks[i].color;
        if(i > 0 && clicks[i - 1].dragging) {
            context.moveTo(clicks[i-1].x, clicks[i-1].y);
        }
        else {
           context.moveTo(clicks[i].x, clicks[i].y);
        }
        context.lineTo(clicks[i].x, clicks[i].y);
        context.closePath();
        context.stroke();
    }
}

function onMouseDown(event) {
    mouseDown = true;
    addClick(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop, true);
    redraw();
}

function ready() {
    //Chope le canvas
    canvas = $("#canv"); //$() Permet d'acceder a des elements du document html / # --> variable
    context = canvas[0].getContext("2d");

    // fonction mouse down --> addclick function --> permet de choper le x et le y dans une array
    // + paint en boolean
    // redraw --> fonction qui dessine
    canvas.mousedown(onMouseDown);

    // Déplacement de la souries --> comme si on dessinait avec un marker (si paint = true)
    canvas.mousemove(function(e){
        if(mouseDown) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, color);
            redraw();
        }
    });

    // Marker non appuyer (mouse up) --> paint = false
    canvas.mouseup(function(e) {
        if(mouseDown) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false, color);
            redraw();
        }
        mouseDown = false;
    });

    // La souris quitte le canvas --> paint = false
    canvas.mouseleave(function(e){
        if(mouseDown) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false, color);
            redraw();   
        }
        mouseDown = false;
    });

    
        // Changement de couleur avec appuyage sur le boutonage
        $('#vert').click(function() {
            color = colorGreen;

        });

        $('#jaune').click(function() {
            color = colorYellow;

        });

        $('#marron').click(function() {
            color = colorBorwn;

        });

        $('#violet').click(function() {
            color = colorPurple;

        });
}

$(ready); // $() appel de la fonction lié à JQuery une fois que tout est loadé
