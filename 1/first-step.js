
var velocity=40;
var fps = 12;
var game = new Phaser.Game(800, 600,
    	       		   Phaser.AUTO, '', 
			   { preload: preload, 
			     create: create,
			     update: update
			   }
			  );


// función indispensable para phaser.
function preload() { //Cargando los recursos que necesitaremos.
    game.load.image('wall', 'assets/wall.png');
    game.load.image('acera', 'assets/acera.png');
    game.load.spritesheet('uno', 'assets/uno.png', 16, 16);
}

function create() {
    //inicializando el mundo XD
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0,0,
			game.world.width, 
			game.world.height, 			
			'acera',
			0
		       );

    // creando obstáculos
    walls = game.add.group(); //el nuevo grupo de obstáculos
    walls.enableBody = true; /* habilitar la física para el grupo "walls"
				murallas con "cuerpo" */    
    var center = walls.create(game.world.width/2,
			      game.world.height/2, 
			      'wall'); //el obstáculo del centro
    center.body.immovable = true; //murallas con posición permanente

    //creando al personaje
    uno = game.add.sprite(game.world.width/2-16, 
			  game.world.height/2-16, 
			  'uno');
    game.physics.arcade.enable(uno);
    // uno.collideWorldBounds = true;

    uno.animations.add('stand_front', [0], fps, true);
    uno.animations.add('stand_right', [5], fps, true);
    uno.animations.add('stand_back', [10], fps, true);
    uno.animations.add('front', [1,2,3,4], fps, true);
    uno.animations.add('right', [6,7,8,9], fps, true);
    uno.animations.add('back', [11,12,13,14], fps, true);
    lastDirection = 'front';
    uno.anchor.setTo(.5,.5);
}

function move_x(alguien, dir) {
    alguien.scale.x = dir;
    uno.body.velocity.x = dir*velocity;    
    lastDirection = 'right'; //right will be flipped if left
}

function move_y(alguien, dir) {
    uno.body.velocity.y = dir*velocity;
    
    if (dir > 0) 
	lastDirection = 'front';
    else
	lastDirection = 'back';
    
}

function move(alguien, dir, axis) {
    var wasmoving = ismoving;
    ismoving = true;

    if (axis == 'x') {
	move_x(alguien, dir);
    } else {
	move_y(alguien, dir);
    }

    if(!wasmoving)
	uno.animations.play(lastDirection);
}

function update() {
    ismoving=false;
    game.physics.arcade.collide(uno, walls);
    cursores = game.input.keyboard.createCursorKeys();
    uno.body.velocity.x=0;	
    uno.body.velocity.y=0;

    if (cursores.right.isDown) {
	move(uno, 1, 'x');
    }

    if(cursores.left.isDown) {
	move(uno, -1, 'x');
    }

    if(cursores.up.isDown) {
	move(uno, -1, 'y');
    }

    if(cursores.down.isDown) {
	move(uno, 1, 'y');
    } 

    if(!ismoving) {
	uno.animations.play('stand_' + lastDirection);	
    }
}
