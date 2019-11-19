(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width, HEIGHT = cnv.height;

    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    var mvLeft = mvUp = mvRight = mvDown = false;

    var tileSize = 32;
    
    var maxpulo = 3; 

    var player = {
        x: tileSize + 2,
        y: tileSize + 2,
        width: 28,
        height: 28,
        speed: 10,
        gravidade: 1.5,
        forcaDoPulo: 15,
        qntpulo: 0,
    
    update: function(){
        this.speed += this.gravidade;
        this.y += this.speed;
        
        if(this.y > wall){
            this.y = wall
            this.qntpulo = 0;
        }
        
    },

    pula: function(){
        if(this.qntpulo < maxpulo){
        this.speed = -this.forcaDoPulo;
        this.qntpulo++;
            }
        }
    


    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    function keydownHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = true;
                break;
            case UP:
                mvUp = player.pula();
                break;
            case RIGHT:
                mvRight = true;
                break;
            case DOWN:
                mvDown = true;
                break;
        }
    }

    function keyupHandler(e){
        var key = e.keyCode;
        switch(key){
            case LEFT:
                mvLeft = false;
                break;
            case UP:
                mvUp = false;
                break;
            case RIGHT:
                mvRight = false;
                break;
            case DOWN:
                mvDown = false;
                break;
        }
    }

    function update(){
        if(mvLeft && !mvRight){
            player.x -= player.speed;
        } else if(mvRight && !mvLeft){
                player.x += player.speed;
        }
        if(mvUp && !mvDown){
            player.y -= player.speed;
        } else if (mvDown && !mvUp){
            player.y += player.speed;
            }
    }

    function render(){
        ctx.clearRect(0,0, WIDTH, HEIGHT);
        ctx.save();ctx.fillStyle = "#00f";
        ctx.fillRect(player.x,player.y,player.width,player.height);
        ctx.restore();
    }
    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }
    requestAnimationFrame(loop, cnv);

}());