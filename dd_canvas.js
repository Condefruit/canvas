// déclaration des var et valeur par défauts
var clicks = []; // tableau pour stocker les valeurs des x,y, dragging --> potentiel retour en arrière programmable
var mouseDown = false;
var mouseIn = true;
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var colorWhite = "#FFFFFF";
var color = colorPurple;
colors = [colorBrown, colorGreen, colorYellow, colorPurple]
vsizes = [5, 10, 20, 30]

var vsize = 10;

// push --> ajoute un nouvel item à une array
function addClick(x, y, dragging) {
    clicks.push( {
        x: x,
        y: y,
        dragging: dragging, // boolean --> possibilité de faire un bouton pour faire des lignes ou non
        color: color,
        vsize: vsize 
    } );
 }

// Fonction redraw --> la ou la magie opère --> à chaque fois que la fonction est appelée, le canvas est netoyé 
// Ceci permet de potentiellement crée une fonction control z qui n'efface pas les ancients traits se trouvant sur le même tracer que la dernière action
// + quelques propriétés pour la couleur, forme et largeur du marker
function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    //context.strokeStyle = color;
    context.lineJoin = "round";
    // context.lineWidth = 5;

    for(var i = 0; i < clicks.length; i++) {
        context.beginPath();
        context.strokeStyle = clicks[i].color;
        context.lineWidth = clicks[i].vsize;
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
    if(mouseIn) {
        mouseDown = true;
        addClick(event.pageX - event.target.offsetLeft, event.pageY - event.target.offsetTop, true);
        redraw();
    }
}

function ready() {
    //Chope le canvas
    canvas = $("#canv"); //$() Permet d'acceder a des elements du document html / # --> variable
    context = canvas[0].getContext("2d"); // chope les positions par rapport au canvas ?

    // fonction mouse down --> addclick function --> permet de choper le x et le y dans une array
    // + paint en boolean
    // redraw --> fonction qui dessine
    canvas.mousedown(onMouseDown);

    // Déplacement de la souries --> comme si on dessinait avec un marker (si paint = true)
    canvas.mousemove(function(e){
        if(mouseDown & mouseIn) {
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
        mouseIn = false;
    });

    // La souris rentre le canvas --> paint = false
    canvas.mouseenter(function(e){
        //if(e.whichbuttons & 1 === 1) {
            {
/*
  1 = Left   mouse button
  2 = Centre mouse button
  3 = Right  mouse button
*/
    //if(e.buttons & 1 === 1) { moins reconnu par les navigateurs parce que les bouttons varient ?
        if(mouseDown) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, color);
            redraw();
        }
            mouseIn = true;   
        }
    });

    /* FONCTION TABLETTE !!!!!!!!!
    canvas.touchstart(function(e){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true, color);
        redraw();
    });
    */

    
        // Changement de couleur avec appuyage sur le boutonage
   /*     $('#vert').click(function() {
            color = colorGreen;

        });

        $('#jaune').click(function() {
            color = colorYellow;

        });

        $('#marron').click(function() {
            color = colorBrown;

        });

        $('#violet').click(function() {
            color = colorPurple;

        });
        */

        /*$('#small').click(function() {
            vsize = 5;

        });

        $('#medium').click(function() {
            vsize = 10;

        });

        $('#large').click(function() {
            vsize = 20;

        });

        $('#huge').click(function() {
            vsize = 30;

        });

        */

        $('#blanc').click(function() {
            color = colorWhite;

        });

        $('#clear').click(function() {
            clicks = [];
            redraw();

        });

        $(function() {
            let buttons = ["Kentin tete de bite", "Couleur verte", "Couleur jaune", "Couleur rose"];
            for(let i = 0; i < buttons.length; i++) {
                $("#Tools2").append("<input id=\"button"+i+"\" type=\"image\" border=1 src=\"rond.png\" width=\""+(40+i*20)+"em\" height=\""+(40+i*20)+"em\"></input> ");
                let label = buttons[i];
                $("#button"+i).click(function() {
                    vsize = vsizes[i];
                });
            }

        });

        $(function() {
            let buttons = ["Kentin tete de bite", "Couleur verte", "Couleur jaune", "Couleur rose"];
            for(let i = 0; i < buttons.length; i++) {
                $("#Tools").append("<input id=\"button"+i+"\" type=\"image\" border=1 src=\"Color"+i+".png\" width=\"70em\" height=\"70em\"></input> ");
                let label = buttons[i];
                $("#button"+i).click(function() {
                    color = colors[i];
                    //$("#Truc").append(label + "<BR>");
                    //$("#Truc").append(label + " ");
                });
            }

        });
    
}

$(ready); // $() appel de la fonction lié à JQuery une fois que tout est loadé
