(function(){
    startGame()

    function startGame(){
    var Seta = document.querySelector("#seta");    
        Seta.addEventListener("click", Mudar);
    }
        function Mudar(){
            window.location.href = "JogoPrincipal.html"
    };
}());
