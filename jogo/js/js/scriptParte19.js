(function(){
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");

    var WIDTH = cnv.width, HEIGHT = cnv.height;
    
    var Bacteria01 = document.querySelector("#Bacteria");    
    Bacteria01.addEventListener("click", Entrar);

    function Entrar(){
        window.location.href = "Parte20.html"
    }

   var img = new Image();
        img.src = "Personagem/personagem-movimentos.png";
        img.addEventListener("load", function(){
            requestAnimationFrame(loop, cnv);
        },false);

    var imgB = new Image();
        imgB.src = "img/bacteria01.png";
        imgB.addEventListener("load", function(){
            requestAnimationFrame(loop, cnv);
        },false);

    var LEFT = 37, UP = 38, RIGHT = 39; DOWN = 40;
    var mvLeft = mvUp = mvRight = mvDown = false;

    var tileSize = 128;
    var tileSrcSize = 204;
    
    var img = new Image();
        img.src = "img/FundoG.png";
        img.addEventListener("load", function(){
            requestAnimationFrame(loop, cnv);
        },false);

    var walls = [];

    var player = {
        x: tileSize + 2,
        y: tileSize + 2,
        width: 104,
        height: 104,
        speed: 2,
        srcX: 0,
        srcY: tileSrcSize,
        countAnim: 0
    }

        var maze = [
        [1,1,1,1,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,1,1,0,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,0,1,1,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,1,1,0,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,0,1,1,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,1,1,0,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,0,1,1,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,1,1,1,1]
    ];

    var T_WIDTH = maze[0].length * tileSize,
        T_HEIGHT = maze.length * tileSize;

    for(var i in maze){
        for(var j in maze[i]){
            var tile = maze[i][j];
            if(tile === 1){
               var wall ={
                   x: tileSize*j,
                   y: tileSize*i,
                   width: tileSize,
                   height: tileSize
               };
               
               walls.push(wall); //.push serve para preencher os vetores//
            }
        }
    }

    var cam = {
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        innerLeftBoundary: function(){
            return this.x + (this.width*0.25);
        },
        innerTopBoundary: function(){
            return this.y + (this.height*0.25);
        },
        innerRightBoundary: function(){
            return this.x + (this.width*0.75);
        },
        innerBottomBoundary: function(){
            return this.y + (this.height*0.75);
        }
    };

    function blockRectangle(objA,objB){
        var distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
        var distY = (objA.y + objA.width/2) - (objB.y + objB.width/2);
    
        var sumWidth = (objA.width + objB.width)/2.7;
        var sumHeight = (objA.height + objB.height)/2.3;

        if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
            var overlapX = sumWidth - Math.abs(distX);
            var overlapY = sumHeight - Math.abs(distY);

            if(overlapX > overlapY){
                objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
            } else {
                objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
            }
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
                mvUp = true;
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
            player.srcY = tileSrcSize + player.height * 2;
        } else if(mvRight && !mvLeft){
                player.x += player.speed;
                player.srcY = tileSrcSize + player.height * 3;
        }
        if(mvUp && !mvDown){
            player.y -= player.speed;
            player.srcY = tileSrcSize + player.height * 1;
        } else if (mvDown && !mvUp){
            player.y += player.speed;
            player.srcY = tileSrcSize + player.height * 0;
        }

        if(mvLeft || mvRight || mvUp || mvDown){
            player.countAnim++;

            if(player.countAnim >= 40){
                player.countAnim = 0;
            }

            player.srcX = Math.floor(player.countAnim/10) * player.width;
        } else {
            player.srcX = 0;
            player.countAnim = 0;
        }

        for(var i in walls){
            var wall = walls[i];
            blockRectangle(player, wall);
        }    

    
        if(player.x < cam.innerLeftBoundary()){
            cam.x = player.x - (cam.width*0.25);
        }
        if(player.y < cam.innerTopBoundary()){
            cam.y = player.y - (cam.height*0.25);
        }
        if(player.x + player.width > cam.innerRightBoundary()){
            cam.x = player.x + player.width - (cam.width*0.75);
        }
        if(player.y + player.height > cam.innerBottomBoundary()){
            cam.y = player.y + player.height -(cam.height*0.75);
        }

        cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));
        cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));
    
    }

    function render(){
        ctx.clearRect(0,0, WIDTH, HEIGHT)
        ctx.save();
        ctx.translate(-cam.x, -cam.y);
        for(var i in maze){
            for(var j in maze[i]){
                var tile = maze[i][j];
                var x = j*tileSize;
                var y = i*tileSize;
                ctx.drawImage(
                    img,
                    tile * tileSrcSize, 0, tileSrcSize, tileSrcSize,
                    x,y,tileSize,tileSize

                );              
            }
        }

        for(var i in maze){
            for(var j in maze[i]){
               var Bacteria01 = maze[i][j];
               var xB= 4*tileSize;
               var yB = 20*tileSize;
                ctx.drawImage(
                    imgB,
                    Bacteria01 * tileSrcSize, 0, 90, 90,
                    xB,yB,tileSize,tileSize
                );              
            }
        } 


        
        ctx.drawImage(
            img,
            player.srcX, player.srcY, player.width, player.height,
            player.x, player.y, player.width, player.height
        );
        ctx.restore();
    }

    function loop(){
        update();
        render();
        requestAnimationFrame(loop, cnv);
    }
    requestAnimationFrame(loop, cnv);
}());