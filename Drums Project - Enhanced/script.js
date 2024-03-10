var drums = document.querySelectorAll(".button").length;

for (var i = 0; i<drums; i++) {
    document.querySelectorAll(".button")[i].addEventListener("click", function() {
        var inner = this.innerHTML;
        makeSound(inner);
    });
};

document.addEventListener("keydown", function (event) {
    makeSound(event.key);
}
);

document.addEventListener("touchstart", function (event) {
    var key = event.target.innerHTML;
    makeSound(key);
}
);

function makeSound(key) {
    switch (key) {
        case "b":
            var kick = new Audio("./audio/kick.mp3");
            audio.preload = 'auto';
            kick.play();
            break;
        
        case "c":
            var hihat = new Audio("./audio/hihat.mp3");
            audio.preload = 'auto';
            hihat.play();
            break;                
    
        case "f":
            var crash = new Audio("./audio/crash.mp3");
            audio.preload = 'auto';
            crash.play();
            break;
            
        case "g":
            var stom = new Audio("./audio/stom.mp3");
            audio.preload = 'auto';
            stom.play();
            break;        
    
        case "h":
            var mtom = new Audio("./audio/mtom.mp3");
            audio.preload = 'auto';
            mtom.play();
            break;
                
        case "j":
            var ride = new Audio("./audio/ride.mp3");
            audio.preload = 'auto';
            ride.play();
            break;        
    
        case "n":
            var floor = new Audio("./audio/floor.mp3");
            audio.preload = 'auto';
            floor.play();
            break;
                    
        case "v":
            var snare = new Audio("./audio/snare.mp3");
            audio.preload = 'auto';
            snare.play();
            break;        
    
        default:
            break;
    }
}