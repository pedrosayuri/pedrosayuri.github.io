window.onload = function(){
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    var spriteSheet = new Image();
    spriteSheet.src = "Personagem/personagem-movimentos.png"
    var lune = new Sprite(spriteSheet);

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                lune.mvLeft = true;
                break;
            case UP:
                lune.mvUp = true;
                break;
            case RIGHT:
                lune.mvRight = true;
                break;
            case DOWN:
                lune.mvDown = true;
                break;
        }
    }

    function keyupHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                lune.mvLeft = false;
                break;
            case UP:
                lune.mvUp = false;
                break;
            case RIGHT:
                lune.mvRight = false;
                break;
            case DOWN:
                lune.mvDown = false;
                break;
        }
    }

    spriteSheet.onload = function(){
        init();
    }

    function init(){
        loop();
    }
    
    function update(){
        lune.move();
        
	}

    function draw(){
        ctx.clearRect(0,0,cnv.width,cnv.width);
        lune.draw(ctx);
        }

    function loop(){
        window.requestAnimationFrame(loop,cnv);
        draw();
        update()
    }