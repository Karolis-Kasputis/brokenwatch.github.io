var c = document.getElementById('pane').getContext('2d'); 
///////////////////////////////////////////////////////////////BEGIN LIBRARY CODE
function getRndColor(r,g,b,rr,gg,bb) {
    var r = r*Math.random()+rr|0,
        g = g*Math.random()+gg|0,
        b = b*Math.random()+bb|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};


var w = c.canvas.width;
var h = c.canvas.height;
var xonclick = w/2;
var yonclick = h/2;
var keyA = false;
var keyD = false;
var keyF = false;
var keyQ = false;
var keyW = false;
var keyE = false;
var keyR = false;
var key1 = false;
var sckeyboard = 0;
var scmouse = 0;
var timer = 0;
var dif = 1;

	  // tracking if mouse down
	  var isMouseDown = false;
	  c.canvas.onmousedown = 
		function(evt) { isMouseDown = true; 
						
					} ;
		c.canvas.onmouseup = 
			function(evt) {isMouseDown = false; }; 
			
		 //mouse position tracking
		 var mouse = { x: 0, y: 0};
		c.canvas.onmousemove = 
			function(evt) {
				mouse.x = evt.clientX-8;
				mouse.y = evt.clientY-8;
				}; 
	  // Keep track of whether the mouse is up or down

	  
	  // keyboard trackerz
 
  c.canvas.onkeydown = function(evt) {
	if ( evt.keyCode == 65) {
     keyA = true; 
    evt.preventDefault(); 
	}
	  if ( evt.keyCode == 68) {
     keyD = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 70) {
     keyF = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 81) {
     keyQ = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 87) {
     keyW = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 69) {
     keyE = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 82) {
     keyR = true; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 49) {
     key1 = true; 
    evt.preventDefault(); 
	}
};

 c.canvas.onkeyup = function(evt) {
 if ( evt.keyCode == 65) {
     keyA = false; 
    evt.preventDefault(); 
	}
	  if ( evt.keyCode == 68) {
     keyD = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 70) {
     keyF = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 81) {
     keyQ = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 87) {
     keyW = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 69) {
     keyE = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 82) {
     keyR = false; 
    evt.preventDefault(); 
	}
	if ( evt.keyCode == 49) {
     key1 = false; 
    evt.preventDefault(); 
	}
	  
};

	  
	  
//LIBRARYSHIT//////////////////////////////////////////////////////////////////////////////
//RANDOM EDGE STUFF
var randomEdgeX = null;
var randomEdgeY = null;


function randomEdge () {
this.x = 0;
this.y = 0;
if (Math.random() > 0.5) {
					this.x = Math.random()*w;
							if (Math.random() > 0.5) {
								this.y = 0;
							}
							else this.y = h;
				}
				else { 
					this.y = Math.random()*h;
							if (Math.random() > 0.5) {
									this.x = 0;
							}
							else this.x = w;
					}
randomEdgeX = this.x;
randomEdgeY = this.y
};
////////////////////////////////////////////////////////////////////

function background() {
	c.clearRect(0, 0, w, h);
	c.rect(0, 0, w, h);
     var grd = c.createRadialGradient(w+500,-500, 1, w+500, -500, 1800);
      grd.addColorStop(0, '#9C2797');
      grd.addColorStop(1, 'black');
      c.fillStyle = grd;
      c.fill();


};
function score() {
c.strokeStyle = '#8B1A89';
c.font = 'italic bold 25px Calibri';
c.fillStyle = 'white';
c.textAlign = 'left';
c.fillText('BlueLife: ', w- 200, 50);
c.fillText('PurpleTime: ', w- 200, 100);
c.fillText('Orange#: ', w- 200, 150);
c.lineWidth = '1';
c.strokeText('BlueLife: ', w- 200, 50);
c.lineWidth = '1';
c.strokeText('PurpleTime: ', w- 200, 100);
c.lineWidth = '1';
c.strokeText('Orange#: ', w- 200, 150);

c.strokeStyle = '#8B1A89';
c.font = 'italic bold 25px Calibri';
c.fillStyle = 'white';
c.textAlign = 'right';
c.fillText(enemiesLife, w- 20, 50);
c.fillText(enemykL.toFixed(2), w- 20, 100);
c.fillText(ProjectilesNum, w- 20, 150);
c.lineWidth = '1';
c.strokeText(enemiesLife, w- 20, 50);
c.lineWidth = '1';
c.strokeText(enemykL.toFixed(2), w- 20, 100);
c.lineWidth = '1';
c.strokeText(ProjectilesNum, w- 20, 150);

	



	timer = timer + 0.01;


c.fillStyle = 'white';
c.font = 'italic bold 90px Calibri';
c.textAlign = 'left';
c.fillText((timer).toFixed(1) + 's', 20, 90);
c.lineWidth = '2';
c.strokeText((timer).toFixed(1) + 's', 20, 90);

};


// The parameters of strokeRect are
// strokeRect(left, top, width, height)
function Hero(x, y, speed){
	this.x = x; 
	this.y = y;
	this.speed = speed;
	this.dx = 0;
	this.dy = 0;
	this.reload = 90;
	this.range = 300;
	this.life = 100;
	this.melee = 60;
	this.areload = 10;	
	this.enemiesDet = function () {	
					this.objDet = false;
					for (i = 0; i < enemies.length; i++){
						if (enemies[i].objDet === true)
							{ this.objDet = true; 
							 break;
							} 
						else {this.objDet = false;}
					}
					return this.objDet;
	
	};

	this.enemykDet = function () {	
					this.objDet = false;
					for (i = 0; i < enemyk.length; i++){
						if (enemyk[i].objDet === true)
							{ this.objDet = true; 
							 break;
							} 
						else {this.objDet = false;}
					}
					return this.objDet;
	
	};
	
	this.stroke = function() {
		c.save();
		var x = this.x;
		var y = this.y;
		
		
		c.translate(x ,y); 
		c.beginPath();
		   c.arc(0, 0, this.range, 0, 2 * Math.PI, false);
		  c.fillStyle = 'white';
		  c.globalAlpha = 0.05;
		  c.fill();
		  c.globalAlpha = 1;
		  c.lineWidth = 1;
		  c.strokeStyle = 'green';
		  c.stroke();
		  
		  c.beginPath();
		  c.lineWidth = 10;
		  c.globalAlpha = 1;
		  c.arc(0,0 ,(this.melee-5)*(this.areload/100)+10, 0,  ((this.areload-70)*13)*(Math.PI/180), false);//reloading
		  c.strokeStyle = '#03adfc';
		  c.stroke();
		  
		  c.beginPath();
		  c.globalAlpha = 1;
		  c.arc(0, 0, this.melee, 0, 2 * Math.PI, false);
		  c.fillStyle = '#009c00';
		  c.fill();
		  c.globalAlpha = 1;
		  c.lineWidth = 2;
		  c.strokeStyle = 'black';
		  c.stroke();
		  c.beginPath();
		  c.lineWidth = 2;
		  c.strokeStyle = 'green';
		  c.arc(0,0 ,this.melee+10, 0,  2*Math.PI, false);//black lning
		  c.stroke();
		  
		  c.strokeStyle = 'black';
		  c.beginPath();
		  c.arc(0, 0, 30, 0, 2 * Math.PI, false);
		  c.fillStyle = 'green';
		  c.fill();
		  
		  
		  
		  c.strokeStyle = 'black';
		  c.fillStyle = 'white';
		  c.globalAlpha = 1;
		  c.textAlign = 'center';
		  c.font = 'italic bold 30px Calibri';
		  c.fillText( hero.life, 0, 10);
		  c.lineWidth = 1;
		  c.strokeText( hero.life, 0, 10);
		  c.strokeStyle = 'black'
		  c.restore();
		  
		};
	
	this.move = function() {
		
							var diffX = this.x - xonclick;
							var diffY = this.y - yonclick;
							var z = Math.sqrt(diffX * diffX +
											   diffY * diffY);
						 var a = -Math.atan2(diffY, diffX);
					   
							var vx = Math.cos(a) * speed ;
							var vy = Math.sin(a) * speed ;
							
					if (xonclick - this.x >= vx || this.x - xonclick >= vx ){
							this.x -= vx;
							}
						else { this.x == this.x}
						
					
					if (yonclick - this.y >= vy || this.y - yonclick >= vy) {
						this.y += vy;
						}
						else { this.y == this.y}
							
	}
	
	
	this.launch = function() {
		
		this.stroke();
			
			if (isMouseDown  && this.enemykDet() === false  && this.enemiesDet() === false    ) {
				if (this.reload == 100){
					xonclick = mouse.x ;
					yonclick = mouse.y ;
					this.reload = 90;
					}
				this.move();
			}
			else 
				this.move();
				
		if (this.reload < 100) {this.reload = (this.reload+1);} //reloading
		if (this.areload < 100) {this.areload = (this.areload+1);} //reloading	
	};
	
	
	
	this.gameover= function(){
	if (this.life === 0 || timer < 0.1 ) {
	 c.strokeStyle = '#8B1A89';
	 c.fillStyle = 'white';
	 c.textAlign = 'center';
	 c.font = 'italic bold 100px Calibri';
	 c.fillText( 'GAME OVER ', w/2, h/2);
	 c.lineWidth = 5;
	 c.strokeText('GAME OVER ', w/2, h/2);
	 this.dx = 0; 
	 this.dy = 0;
	}
	
	};
	
};


// ENEMY            ////////////////////////////////////////////////////////////////////////////
function Enemy(x, y, speed, life,r, ID) {
this.ID = 1;
this.rTi = 50;
this.x = x;
this.y = y;
this.r = r;
this.speed = speed;
this.life = life;
this.lifeLeft = life;
this.objDet = false;  
this.reload = 0.5;
this.rTimer = 0;
var bumpTimer = 0;
this.btimer = 0;
this.bx = 0;
this.by = 0;

 this.stroke= function(){
		c.save();
		var x = this.x;
		var y = this.y;
		
		c.beginPath();
		c.translate(x ,y); 
		
		  c.arc(0, 0, r, 0, 2 * Math.PI, false);
		  c.lineWidth = 1;
		  c.fillStyle = '#002395';
		  c.globalAlpha = 1;
		  c.fill();
		  
		  c.lineWidth = 1;
		  c.fillStyle = '#03adfc';
		  c.strokeStyle = 'black'
		  c.font = 'italic 60px Calibri';
		  c.textAlign = 'center'; 
		  c.fillText( this.lifeLeft, 0, 15	); 
		  c.strokeText( this.lifeLeft, 0, 15	);
		  c.restore(); 
		  
			if (this.objDet) {
		    c.save();
			var x = this.x;
			var y = this.y;
			c.beginPath();
			c.translate(x ,y);
			c.arc(0, 0, r, 0, 2 * Math.PI, false);
			c.lineWidth = 6;
			c.strokeStyle = '#14f500';
			c.stroke();
			c.closePath();
			c.beginPath();
			c.arc(0, 0, r+3, 0, 2 * Math.PI, false);
			c.lineWidth = 1;
			c.strokeStyle = 'black';
			c.stroke();
			c.beginPath();
			c.arc(0, 0, r-3, 0, 2 * Math.PI, false);
			c.lineWidth = 1;
			c.strokeStyle = 'black';
			c.stroke();
			c.restore();
			}
			else {
			c.strokeStyle = '#03adfc'
			c.lineWidth = 3;
			c.stroke();
			}
	}; 

this.move = function(){
		
		var diffX = this.x - hero.x;
		var diffY = this.y - hero.y;
		var a = -Math.atan2(diffY, diffX);  
		var vx = Math.cos(a) * this.speed ;
		var vy = Math.sin(a) * this.speed ;
		var z =Math.sqrt(diffX * diffX +
						diffY * diffY);
		
		
		if (this.r + hero.melee > z ) { //check if melee range
				this.x += vx;
				this.y -= vy;

					if (bumpTimer == 0) {bumpTimer = 10;}
					}	
		else  if (bumpTimer == 0) { //if not in melee range jsut go towards
			this.x -= vx;
			this.y += vy;
			}
		else if (bumpTimer > 0) { //reversing direction as bumpin
			this.x += vx*0.5;
			this.y -= vy*0.7;
			}
		 if (this.enemyCol() === true){
			this.x += vx*0.5;
			this.y -= vy*0.5;
			if (bumpTimer == 0) {bumpTimer = 10;}
			}
			
		
			if (bumpTimer > 0) {bumpTimer = bumpTimer - 1;}
			
			
			
			/////////////////ENEMY COLLISION MIGHT BREAK SHITT
	 	 
		/*  for ( i = 0; i < enemiesNum; i++) {
				var enDiffX = this.x - enemies[i].x;
				var enDiffY = this.y - enemies[i].y;
				var enz =  Math.sqrt(enDiffX * enDiffX +
								enDiffY * enDiffY);
				
						if (this.r + enemies[i].r > enz && this.ID !== i){
									this.x += vx;
									this.y -= vy;
										if (bumpTimer == 0) {bumpTimer = 10;}
						}
						
				
		}		  */
			
		
		///////////////////////////////
		
		
		}; 
		
this.enemyCol = function () {
				//this.col = false;
				for ( j = 0 ; j < enemies.length; j++){
				var enDiffX = this.x - enemies[j].x;
				var enDiffY = this.y - enemies[j].y;
				var enz =  Math.sqrt(enDiffX * enDiffX +
								enDiffY * enDiffY);
				
							if (this.r + enemies[j].r > enz && this.ID !== j){
												  this.col = true;	
												  break;
									}
							else this.col = false;
												
				}
										
				
			
				return this.col;


} ;
	
 this.detect = function(){
				var diffX = this.x - mouse.x;
				var diffY = this.y - mouse.y;
				var z = Math.sqrt(diffX * diffX +
								 diffY * diffY);
				if (z < this.r) { 
				 return this.objDet = true;
				}
				else { return this.objDet = false;}
				
				
				
			};
	
this.inrange = function () {
				var diffX = this.x - hero.x;
				var diffY = this.y - hero.y;
				var z = Math.sqrt(diffX * diffX +
								 diffY * diffY);
				if  (z < hero.range + this.r) { 
					return true; }
					else {return false;}

	};	

this.damage = function () {
				var diffX = this.x - hero.x;
				var diffY = this.y - hero.y;
				var z = Math.sqrt(diffX * diffX +
								 diffY * diffY);
				if  (z < hero.melee + this.r) { 
					return true; }
					else {return false;}

	};	
this.boom = function (){
	if (this.btimer > 1) {

						c.save();
						var x = this.x;
						var y = this.y;
						var r = 30/this.btimer;
						c.beginPath();
						c.globalAlpha = 0.033* this.btimer;
						//c.translate(x ,y);
						c.fillStyle = '03adfc';
						c.arc(this.bx, this.by, r*2, 0, 2 * Math.PI, false);
						c.fill();
						c.fillStyle = '03adfc';
						c.arc(this.bx, this.by, r*6+5, 0, 2 * Math.PI, false);
						c.fill();
						c.fillStyle = '03adfc';
						c.arc(this.bx, this.by, r*10 +20, 0, 2 * Math.PI, false);
						c.fill();
						
						c.restore();
					this.btimer -= 1;

			}


};


	this.launch = function () {
		this.ID = enemies.indexOf(this);
		 
					this.enemyCol();
					if (this.lifeLeft > 0){
						this.stroke();}
					else if (this.lifeLeft === 0 && this.btimer === 0){hero.life +=5;this.btimer = 30;}

					this.move();
					this.detect();
					this.boom();
						if (this.objDet && isMouseDown && this.inrange() && hero.areload == 100 && this.lifeLeft > 0) { //shootin
						xonclick = hero.x; //stop moving while shootin
						yonclick = hero.y;
						this.lifeLeft -= 1;
						hero.areload = 65;
						hero.reload = 85;
						this.rTimer = this.rTi;
						this.bx = this.x;
						this.by = this.y;
						
						
						}

				 
						
					
					if (this.damage() === true && hero.life > 0) { //if in range reduce hero health
					hero.life -= 1;
					}	
				

					if (this.lifeLeft === 0 && this.btimer === 1) {
						//hero.life +=1;
						enemies.splice(this.ID, 1);}	

				if (this.x > w + 500 || this.x < -500 || this.y > h+500 || this.y < -500) {
				enemies.splice(this.ID,1);}
	};	
	
	
};

////////////////////////ENEMY K
function enemyK (x, y, r, l, rti){
	this.herokill = false;
	this.rTi = rti;
	this.lifeTime = l;
	this.objDet = false;
	this.rTimer = 0;
	this.life = 0;
	this.x = x;
	this.y = y;
	this.r = r;
	this.btimer = 0;
	this.bx = 0;
    this.by = 0;
	this.keyType = function () { return };
	this.keyTypeName = '';
	this.stroke = function () {
		c.save();
		var x = this.x;
		var	y = this.y;
		c.beginPath();
		c.translate(x ,y); 
		  c.arc(0, 0, r, 0, 2 * Math.PI, false);
		  c.fillStyle = '#9dacdf';
		  c.globalAlpha = 0.75;
		  c.fill();

			c.arc(0, 0, r, 0, 2 * Math.PI, false);
		this.strokeWidth = 4;
		  c.strokeStyle = '#6f00ff';
		  c.lineWidth = 4;
		  c.globalAlpha = 1;
		  c.stroke();

			c.lineWidth = 1;
		  c.font = 'italic bold 60px Calibri';
		  c.textAlign = 'center'; 
		  c.fillStyle = '#9820bc';
		  c.fillText( this.keyTypeName, 0, 15);

		  c.strokeStyle = 'black'
		  c.strokeText( this.keyTypeName, 0, 15);

		  c.restore();
		
		if (this.objDet) {
						c.save();
						var x = this.x;
						var y = this.y;
						c.beginPath();
						c.translate(x ,y);
						c.arc(0, 0, r, 0, 2 * Math.PI, false);
						c.lineWidth = 6;
						c.strokeStyle = '#14f500';
						c.stroke();
						c.closePath();
						c.beginPath();
						c.arc(0, 0, r+3, 0, 2 * Math.PI, false);
						c.lineWidth = 1;
						c.strokeStyle = 'black';
						c.stroke();
						c.beginPath();
						c.arc(0, 0, r-3, 0, 2 * Math.PI, false);
						c.lineWidth = 1;
						c.strokeStyle = 'black';
						c.stroke();
						c.restore();
						}
						//else {
						//c.strokeStyle = 'black'
						///c.lineWidth = 3;
						//c.stroke();
						//}

		
	};
	this.randomEnemy = function () {
			switch (Math.round(Math.random()*7)){
			case 1:
			this.keyType  = function () { return keyA};
			this.keyTypeName = 'A';
			break;
			case 2:
			this.keyType  = function () { return keyD};
			this.keyTypeName = 'D';
			break;
			case 3:
			this.keyType  = function () { return keyQ};
			this.keyTypeName = 'Q';
			break;
			case 4:
			this.keyType  = function () { return keyW};
			this.keyTypeName = 'W';
			break;
			case 5:
			this.keyType  = function () { return keyE};
			this.keyTypeName = 'E';
			break;
			case 6:
			this.keyType  = function () { return keyR};
			this.keyTypeName = 'R';
			break;
			case 7:
			this.keyType  = function () { return key1};
			this.keyTypeName = '1';
			break;
			case 0:
			this.keyType = function () { return keyF};
			this.keyTypeName = 'F';
			break;
			}
	
	};
	

	this.detect = function(){
				var diffX = this.x - mouse.x;
				var diffY = this.y - mouse.y;
				var z = Math.sqrt(diffX * diffX +
								 diffY * diffY);
				if (z < this.r) { 
				 return this.objDet = true;
				}
				else { return this.objDet = false;}
				
	};			
	
this.boom = function (){
	if (this.btimer > 1) {

						c.save();
						var x = this.x;
						var y = this.y;
						var r = 30/this.btimer;
						c.beginPath();
						c.globalAlpha = 0.033* this.btimer;
						//c.translate(x ,y);
						c.fillStyle = '#ab24d4';
						c.arc(this.bx, this.by, r*10, 0, 2 * Math.PI, false);
						c.fill();
						c.fillStyle = '#9820bc';
						c.arc(this.bx, this.by, r*6+5, 0, 2 * Math.PI, false);
						c.fill();
						c.fillStyle = '#390c46';
						c.arc(this.bx, this.by, r*10 +20, 0, 2 * Math.PI, false);
						c.fill();
						
						c.restore();
					this.btimer -= 1;

			}


};



	//_____________________________________________
	
	this.launch = function() {
	  	
	   if (this.life == 0 && this.rTimer == 0 ) {
	   
		   this.randomEnemy();
		  //RANDOM LOCATION ///////////////////////////////////////////////////////////////////////////
		  var angle = Math.random()*Math.PI*2;            
		   var radius =  Math.random()* 200+ 130;
				   this.x =hero.x + Math.cos(angle)*radius;
				   this.y =hero.y + Math.sin(angle)*radius;
						   if (this.x < this.r) {this.x = this.r;}
								else if (this.x > w - this.r) { this.x = w - this.r;}
							if (this.y < this.r) {this.y = this.r;}
								else if (this.y > h - this.r) { this.y = h - this.r;}
		
		   //RANDOM LOCATION/////////////////////////////////////////////////////////////////////////
		   this.stroke();
		   this.life = this.lifeTime;
			this.rTimer = Math.round(this.rTi* Math.random());
			this.herokill = false;
	  }
	   else if(this.life == 0) 
			  {
			  	this.x = null; 
			  this.y = null;
			  } 
	  
	  //________________________________________________
	  
	  if (this.life > 0) {
	  this.life = (this.life-0.01).toFixed(2);
	  this.stroke();
	  }
	  
	  if (this.life == 0 && this.rTimer > 0) {this.rTimer = (this.rTimer-1);}
		
		
		if (this.objDet === true && this.keyType() === true) {
			this.bx = this.x;
			this.by = this.y;
			 this.btimer = 30;
			this.life = 0;
			this.x = null;
			this.y = null;
			sckeyboard += 1;
			hero.life += 5;
			this.herokill = true;
			
		}
	   if (this.herokill === false && this.life == 0 && hero.life > 0){
	   	hero.life -= 5;
	   	this.herokill = true;
	   }
	this.boom();
	 this.detect();
	};

};

function projectile(x,y,s,speed) {
var randomCol = getRndColor(0,100,0,255,155,0);
	this.x = x;
	this.y = y;
	this.destX = 0;
	this.destY = 0;
	this.vx = 0; 	
	this.vy = 0;
	this.s = s;
	this.speed = speed;
	this.angle = 0;
	this.randomAngleRad = 0;
	this.randomDestSel = false;
	this.btimer = 0;
	this.bx = 0;
	this.by = 0;
	this.randomDest = function () {
			var z = Math.sqrt (diffX * diffX
						+ diffY * diffY);
			this.rangle =Math.random()*Math.PI*2;            //random dest around hero
		    this.radius =  Math.random()* 300 ;
			this.destX =hero.x + Math.cos(this.rangle)*this.radius;
			this.destY =hero.y + Math.sin(this.rangle)*this.radius;
															//angle
			var diffX = this.destX - this.x;
			var diffY = this.destY - this.y;
			
			var a = -Math.atan2(diffY, diffX);  
			this.angle =  Math.PI/2-a  ;
															//velocities
			
			this.vx = Math.cos(a) * speed;
			this.vy = Math.sin(a) * speed; 
			
			this.randomDestSel = true; 
		
	
};

this.stroke = function () {
		var x = this.x;
		var y = this.y;
		c.save();
		c.translate(x ,y); 
		c.rotate(this.angle);
		c.beginPath();
		c.lineWidth = 1;
		c.moveTo(0*this.s, 40*this.s);
		c.lineTo(-8*this.s, 10*this.s);
		c.quadraticCurveTo(-15*this.s,20*this.s,-20*this.s,20*this.s);
		c.quadraticCurveTo(0*this.s,-100*this.s,20*this.s,20*this.s);
		c.quadraticCurveTo(15*this.s,20*this.s,8*this.s,10*this.s);
		c.lineTo(0*this.s, 40*this.s);
		c.fillStyle = randomCol;
		c.lineWidth = 6;
		c.strokeStyle = 'red';
		c.stroke();
		c.fill();
		c.restore();
		};

this.move = function () {
						this.x += this.vx;
						this.y -= this.vy;
		
		};
this.launch = function () {
		this.boom();
		if (this.randomDestSel === false) {
			randomEdge();
			this.x = randomEdgeX;
			this.y = randomEdgeY;
			this.randomDest(); }
			
			
		if (this.btimer === 0){
	
			this.move();
			this.stroke();

		}

		if (this.hitHero() === true){
		this.bx = this.x;
		this.by = this.y;
		this.x = null;
		this.y = null;
		this.vx = 0;
		this.vy = 0;
		hero.life -= 3;
		this.btimer = 30;
		}



		if (this.btimer === 1){
				this.btimer = 0;
				this.randomDestSel = false
		}

		if (this.x > w + 500 || this.x < -500 || this.y > h+500 || this.y < -500) {
				this.randomDestSel = false;
				this.btimer = 0;
		
		}
		
		

};
this.hitHero = function () {

				var diffX = this.x - hero.x;
				var diffY = this.y - hero.y;
				var z = Math.sqrt(diffX * diffX +
								 diffY * diffY);
				if  (z < hero.melee + 25) { 
					return true; }
					else {return false;}



		};
	this.boom = function () {
			
			 

			if (this.btimer > 1) {

						c.save();
						var r = 30/this.btimer;
						c.beginPath();
						c.globalAlpha = 0.02*this.btimer;
						c.fillStyle = 'red';
						c.arc(this.bx, this.by, r*10 + 15, 0, 2 * Math.PI, false);
						c.fill();
						
						
						c.beginPath();
						
						c.fillStyle = 'yellow';
						c.arc(this.bx, this.by, r*20-15, 0, 2 * Math.PI, false);
						
						c.fill();
						c.restore();
					this.btimer -= 1;

			}
			


	};
};

////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
function box (x,y,s,speed){
this.x = x;
this.y = y;
this.s = s;
this.speed = speed;
this.angle =0;
this.a = Math.random()*0.03;
var randomColor = getRndColor(70,0,70,0,0,0);

	this.stroke = function () {
		var x = this.x;
		var y = this.y;
		c.save();
		c.translate(x ,y); 
		c.rotate(this.angle);		
		c.fillStyle = randomColor;
		c.fillRect(-this.s/2, -this.s/2,this.s,this.s);
		c.restore();
		};	

	this.move = function () {
					if (this.x > w + this.s || this.y < 0 - this.s) {
												if (Math.random() > 0.5) {
												this.x = Math.random()*w;
												this.y = h + this.s;
												}
												else {
												this.x = 0 -this.s;
												this.y = Math.random() * h
												}
												
						this.a = Math.random()*0.01;
						randomColor = getRndColor(70,0,70,0,0,0);
					}
						this.angle += this.a;
						this.x += this.speed;
						this.y -= this.speed;
					
};
	this.launch = function () {
			this.move();
			this.stroke();

		};
};





var hero = new Hero(w/2,h/2, 5);





var enemies = [];
var enemiesNum = 5;
var enemiesLife = 3;
var enemiesSize = 50;
var enemiesSpeed = 4.2;
var enemiesRespawn = 250;
var enResp = enemiesRespawn;

var Projectiles = [];
var ProjectilesNum = 10;
var ProjectilesSpeed = 10;
var ProjectilesSize = 1;

var boxes = [];
var boxesNum = 0;//4
var boxesSpeed = 0.8;
var boxesSize = 80;

var boxes2 = [];
var boxesNum2 = 0;//14
var boxesSpeed2 = 0.4;
var boxesSize2 = 45;

var boxes3 = [];
var boxesNum3 = 0 ;//30
var boxesSpeed3 = 0.2;
var boxesSize3 = 15;

var enemyk = [];
var enemykNum = 1;
var enemykR = 50;
var enemykL = 0.9;
var enemykRTI = 500;




 /////////OBJECT CREATORS


for (i = 0; i < boxesNum; i++) {
var b = new box (w*Math.random(),h*Math.random(),boxesSize,boxesSpeed);
	boxes.push(b);

}   
for (i = 0; i < boxesNum2; i++) {
var b = new box (w*Math.random(),h*Math.random(),boxesSize2,boxesSpeed2);
	boxes2.push(b);

}   
for (i = 0; i < boxesNum3; i++) {
var b = new box (w*Math.random(),h*Math.random(),boxesSize3,boxesSpeed3);
	boxes3.push(b);

}   
 
 



var difficulty = function(){
	/////////////////////WORKS WELL YO
	enemiesLife = 2 + Math.round(timer/90);
	if (enResp > 0) {enResp -= 1;}
	else if (enResp === 0 && enemies.length < enemiesNum) {  //ENEMY GENERATOR
  		randomEdge();
		var e = new Enemy ( randomEdgeX, randomEdgeY, enemiesSpeed, enemiesLife, enemiesSize, enemies.length );
		enemies.push(e);
		enResp = enemiesRespawn;
	}
	

	/////////////////  PROJECTILES
	ProjectilesNum = 2+ Math.round(timer/3000);

	for (i = 0;Projectiles.length < ProjectilesNum; i++) {
  randomEdge();
	var b = new projectile (randomEdgeX,randomEdgeY,ProjectilesSize,ProjectilesSpeed);
	Projectiles.push(b);


	}

//////////////////////////////////
	enemykL = 1- 0.05 * Math.round(timer/10);
	for (i = 0;enemyk.length < enemykNum; i++) {
  	var b = new enemyK (50,50,enemykR,enemykL,enemykRTI);
	enemyk.push(b);


	}


	
};

/////////////////////////////////////////////////////UPDATE SHIT
 function Update(){
						if (hero.life > 0 ) {	
difficulty();	
	
background();
//c.fillStyle = 'white';
//c.fillText(Projectiles[0].btimer, 200, 200);
	


	//  ITEM LAUNCHERSZ
	for ( i = 0; i < boxesNum3; i++) { 
  boxes3[i].launch();
	}  
	for ( i = 0; i < boxesNum2; i++) { 
  boxes2[i].launch();
	}  
	for ( i = 0; i < boxesNum; i++) { 
  boxes[i].launch();
	}  
hero.launch();
  for ( i = 0; i < enemies.length; i++) { 
  enemies[i].launch();  
}
  for ( i = 0; i < Projectiles.length; i++) { 
  Projectiles[i].launch();
	}  

for ( i = 0; i < enemyk.length; i++) { 
  enemyk[i].launch();
	}  


 score();





		
			}
					else hero.gameover();

};













 function init() {
  return setInterval(Update, 10);
}

init();