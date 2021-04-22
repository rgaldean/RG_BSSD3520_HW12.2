  /////////////////////////////////////
 //           Javascript 12.2       //
/////////////////////////////////////
//////////////////////////////////////
// Drag and drop Credit to : Max1mmus
// code taken from :
//  https://github.com/Max1mmus/draggable-image-on-canvas/blob/master/draggable.js
// code accessed: 04/15/21
//
//  First I want to learn how to draw an image onto my canvas using this tutorial
// We can just steal the scream image from the tutorial
//
// https://www.w3schools.com/tags/canvas_drawimage.asp
//
//  Second, I want to see how to detect where the mouse is on the canvas.
// https://riptutorial.com/html5-canvas/example/11659/detecting-mouse-position-on-the-canvas
//
//  Third, I want to learn how to drag and drop a canvas image with the mouse.
// For that, I need to download or view the .js file from this repository.
// 
// https://github.com/Max1mmus/draggable-image-on-canvas
//
//  Maybe if there is time, I also want to figure out how to move things
// with the keyboard keys
// https://javascript.info/keyboard-events

//Homework 12.2 due Wednesday before 10PM
// x1. Take your smily face that is animating from homework 12.1, and let the user drag it around the screen and drop it somewhere.
// 2. Do not animate the eyes while the user is dragging the smiley face. You have to figure out how to stop the animation if the face is being dragged.
/////////////////////////////////////

"use strict";


const dropRegion = document.getElementById("drop-region");
const imagePreviewRegion = document.getElementById("image-preview");

  //coordinates for the top left corner of the draggable image
    let imgX = 0;
    let imgY = 0;
    let dragging = false;

document.addEventListener('DOMContentLoaded', ()=> {
    
    
    //flsg to test if should be dragging
   // let dragging = false;
    
    //draggable img width and height
    const iw = 100;
    const ih = 150;
    
    //store last mouse position
    let mouseX;
    let mouseY;
    
	const canvas = document.getElementById("canvas");
    const ctx    = canvas.getContext('2d');
    
    //load bg image
    const bgimg = document.createElement('img');
          bgimg.addEventListener('load', ()=> {
              ctx.drawImage(bgimg, 0,0, 200, 250);
          })
          bgimg.src = "img_the_scream.jpg";
    
    //load mustache img to drag
    const img = document.createElement('img');
          img.addEventListener('load', ()=> {
              ctx.drawImage(img, imgX, imgY, iw, ih);
          })
          img.src = "mst.png";
    
    const smiley = draw();
        

    //strt dragging if necessary on mouse down
    canvas.addEventListener("mousedown", (e) => {
        let cRect  = canvas.getBoundingClientRect();
        mouseX = Math.round(e.clientX - cRect.left);  
        mouseY = Math.round(e.clientY - cRect.top); 
        
        const minX = imgX;
        const minY = imgY;
        const maxX = imgX + iw;
        const maxY = imgY + ih;
        
        //check if mouse position in canvas is within bounds of the image.
        if(mouseX >= minX && mouseX <= maxX &&
           mouseY >= minY && mouseY <= maxY) {
                 dragging = true;
            console.log(dragging)
        }
    });
    
    //stop dragging when mouse let go
    canvas.addEventListener("mouseup", (e) => {
        //when mouse released, stop dragging
        dragging = false;
    });
    
    //test to drag and move image if mouse moving.
    canvas.addEventListener("mousemove", (e) => { 
        //if not dragging, leave function
        if(!dragging) return;
        
        let cRect  = canvas.getBoundingClientRect();
        const currMouseX = Math.round(e.clientX - cRect.left);  
        const currMouseY = Math.round(e.clientY - cRect.top);   
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        
        //change in x and y of the mouse since last movement
        const dx = currMouseX - mouseX;
        const dy = currMouseY - mouseY;
        
        //move image same amount mouse moved
        imgX += dx;
        imgY += dy;
        
        //update mouse global coordinate
        mouseX = currMouseX;
        mouseY = currMouseY;
        
        //draw bg image then mustache
        ctx.drawImage(bgimg, 0,0, 200, 250);
        ctx.drawImage(img, imgX, imgY, iw, ih);
        //ctx.fillText("X: "+mouseX+", Y: "+mouseY, 10, 20);
    });
    
    
});
   let position = -75;
   let direction = .5;

const draw = () => {
    
    
    let canvas = document.getElementById('canvas');
    let face=canvas.getContext("2d");
        face.moveTo(105,75);
        face.beginPath();
        face.fillStyle="yellow";
        face.arc(imgX,imgY,150,0,Math.PI*2);
        face.stroke();
        face.closePath();
        face.fill();
    
    
    if (dragging==false){ 
        position += direction;
        }
       
        if(position > canvas.height-100 || position < -75) {
            direction = -direction;
        }
            
    let eyes = canvas.getContext("2d");
        
        eyes.moveTo(55,50);
        eyes.beginPath();
        eyes.fillStyle="black";
        eyes.arc(imgX-75,imgY+position,8,0, Math.PI*2);
        eyes.closePath();
        eyes.fill();
    
    
        eyes.moveTo(103,49);
        eyes.beginPath();
        eyes.fillStyle="black";
        eyes.arc(imgX+75,imgY+position,8,0, Math.PI*2);
        eyes.closePath();
        eyes.fill();
    
    
     let smile = canvas.getContext("2d");
        smile.moveTo(105,75);
        smile.beginPath();
        smile.strokeStyle="black";
        smile.arc(imgX,imgY,60,0,Math.PI);
        smile.stroke();

    window.requestAnimationFrame(draw);
    }

