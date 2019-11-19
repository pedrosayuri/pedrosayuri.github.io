function Sprite(img){
this.mvLeft = this.mvUp = this.mvRight = this.mvDown = false;

this.srcX = this.srcY = 0;

this.width = 104;
this.height = 104;
this.posX = this.posY = 100;
this.img = img;
this.speed = 2;
this.countAnim = 0,


this.draw = function(ctx){
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.width, this.height);
        this.animation();
    }

this.move = function(){
        if(this.mvRight){
            this.posX += this.speed;
            this.srcY = this.height*3;
        }else
        if(this.mvLeft){
            this.posX -= this.speed;
            this.srcY = this.height*2;
        }else
        if(this.mvUp){
            this.posY -= this.speed;
            this.srcY = this.height*1;
        }else
        if(this.mvDown){
            this.posY += this.speed;
            this.srcY = this.height*0;
        }
    }
this.animation = function(){
        if(this.mvLeft || this.mvDown || this.mvUp || this.mvRight){
            this.countAnim++;
            if(this.countAnim >= 24){
                this.countAnim = 0
            }
            this.srcX = Math.floor(this.countAnim/6) * this.width;
        } else {
			this.srcX = 0;
			this.countAnim = 0;
		    }
        }
    
    }