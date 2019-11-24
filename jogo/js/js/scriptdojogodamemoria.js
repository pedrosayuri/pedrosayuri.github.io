(function(){

    var matches = 0;

    var images = [];

    var flippedCards = [];
    
    var imgMatchSign = document.querySelector("#imgMatchSign");

    for(var i = 0; i<8; i++){
        var img = {
            src: "img/"+ i +".png",
            id: i%4
        };
        images.push(img);
    }
    
    startGame();

    function startGame(){
        flippedCards = [];
        images = randomSort(images);

        var frontFaces = document.getElementsByClassName("front");

        for(var i= 0; i<8; i++){
            var card = document.querySelector("#card" + i);
            card.style.left = i % 4 === 0 ? 140 + "px" : i%4 * 95 + 140 + "px";
            card.style.top = i < 4 ?  140 + "px" : 300 + "px";

            card.addEventListener("click", flipcard, false);

            frontFaces[i].style.background = "url('"+ images[i].src +"')";
            frontFaces[i].setAttribute("id", images[i].id);
        }

        var Passar = document.querySelector("#Passar");    
        Passar.addEventListener("click", Mudar);

        var Voltar = document.querySelector("#Voltar");    
        Voltar.addEventListener("click", Mudar1);

    }

    function randomSort(oldArray){
        var newArray = [];

        while(newArray.length !== oldArray.length){
            var i = Math.floor(Math.random()*oldArray.length);

            if(newArray.indexOf(oldArray[i]) < 0){
                newArray.push(oldArray[i]);
            }
        }

        return newArray;
    }

    function flipcard(){
        if(flippedCards.length < 2){
            var faces = this.getElementsByClassName("face");
            
            if(faces[0].classList.length > 2){
                return;
            };
            
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            
            flippedCards.push(this);

            if(flippedCards.length === 2){
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    matchCardSing();

                    matches++;

                    flippedCards = [];

                }
            }

        } else {
           flippedCards[0].childNodes[1].classList.toggle("flipped");
           flippedCards[0].childNodes[3].classList.toggle("flipped");
           flippedCards[1].childNodes[1].classList.toggle("flipped");
           flippedCards[1].childNodes[3].classList.toggle("flipped");

           flippedCards = [];
        }
        
    }
    
    function matchCardSing(){
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 250 + "px";
            imgMatchSign.style.opacity = 1;
        },3500)
    }

    function Mudar(){
        window.location.href = "Parte18.html"
}

    function Mudar1(){
        window.location.href = "Parte16.html"
}

}());