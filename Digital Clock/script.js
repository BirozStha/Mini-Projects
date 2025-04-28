let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let ampm = document.getElementById("ampm");

setInterval(()=>{
    let currentTime = new Date();
    
    let h = currentTime.getHours();
    let m = currentTime.getMinutes();
    let s = currentTime.getSeconds();
    let session = "AM";

    if(h >= 12){
        session = "PM";
    }

    h = h % 12;
    if(h == 0){
        h = 12;
    }

    hrs.innerHTML = (h < 10 ? "0" : "") + h;
    min.innerHTML = (m < 10 ? "0" : "") + m;
    sec.innerHTML = (s < 10 ? "0" : "") + s;
    ampm.innerHTML = session;

},1000)

