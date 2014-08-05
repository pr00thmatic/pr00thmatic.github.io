
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
    game.physics.arcade.enable(center);

    //creando al personaje
    uno = game.add.sprite(game.world.width/2-16, 
			  game.world.height/2-16, 
			  'uno');

    uno.animations.add('stand_front', [0], fps, true);
    uno.animations.add('stand_right', [5], fps, true);
    uno.animations.add('stand_back', [10], fps, true);
    uno.animations.add('front', [1,2,3,4], fps, true);
    uno.animations.add('right', [6,7,8,9], fps, true);
    uno.animations.add('back', [11,12,13,14], fps, true);

    uno.animations.play('stand_front');
    lastDirection = 'front';

    // Física
    game.physics.arcade.enable(uno);
    uno.collideWorldBounds = true;


    uno.anchor.setTo(.5,.5);
}

function update() {

    game.physics.arcade.collide(uno, walls);
    cursores = game.input.keyboard.createCursorKeys();
    uno.animations.play('stand_front'); // importante!! "uno" se queda quieto.

    if(cursores.left.isDown) {
	lastDirection = 'left';
	uno.scale.x = -1;
	uno.body.velocity.x = -1*velocity;
	uno.animations.play('right'); // importante!! reproducir animación de caminar hacia la izquierda
    } else if (cursores.right.isDown) {
	lastDirection = 'right';
	uno.scale.x = 1;
	uno.body.velocity.x = 1*velocity;
	uno.animations.play('right'); // importante!! reproducir animación de caminar hacia la derecha
    } else if (cursores.up.isDown) {
	lastDirection = 'up';
	uno.body.velocity.y = -1*velocity;
	uno.animations.play('back') // importante!! reproducir animación de caminar hacia abajo
    } else if (cursores.down.isDown) {
	lastDirection = 'down';
	uno.body.velocity.y = 1*velocity;
	uno.animations.play('front'); // importante!! reproducir animación de caminar hacia arriba
    } else {
	uno.body.velocity.x = 0;
	uno.body.velocity.y = 0;
    }

}
