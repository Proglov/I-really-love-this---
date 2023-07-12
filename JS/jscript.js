window.onload = function () {
    var myCanvas = document.getElementById("myCanvas");
    var cx = myCanvas.getContext("2d");

    var myCanvas2 = document.getElementById("myCanvas2");
    var cx2 = myCanvas2.getContext("2d");

    let P1 = new P(100, 100);
    let P2 = new P(200, 500);
    let x0 = 300;
    let y0 = 750;
    let v1 = 10;
    let v2 = 1;
    let r1 = 100;
    let r2 = 300;
    let frameSpeed = 50;
    let freq = 1000 / frameSpeed;



    // DRAW A LINE FUNCTION
    function drawLine(P1, P2, colorIndex) {
        cx.beginPath();
        let n = 4;
        if (colorIndex % n == 0)
            cx.strokeStyle = "blue";
        else if (colorIndex % n == 1)
            cx.strokeStyle = "red";
        else if (colorIndex % n == 2)
            cx.strokeStyle = "green";
        else if (colorIndex % n == 3)
            cx.strokeStyle = "black";
        cx.moveTo(P1.x, P1.y);
        cx.lineTo(P2.x, P2.y);
        cx.stroke();
    }

    function drawCircles(P1, P2) {
        cx2.beginPath();
        cx2.clearRect(0, 0, 900, 900);
        cx2.fillStyle = "black";
        cx2.arc(P1.x, P1.y, 10, 0, 2 * Math.PI);
        cx2.moveTo(P2.x, P2.y);
        cx2.arc(P2.x, P2.y, 20, 0, 2 * Math.PI);
        cx2.fill();
        cx2.stroke();
    }

    function linesFrame(constTime) {
        let time = 0;
        const myInterval = setInterval(function () {
            drawLine(P1, P2, colorIndex);
            if (time >= constTime) clearInterval(myInterval);
            time += freq/1000;
        }, freq)
    }

    function circlesFrame(constTime) {
        let x1, y1, x2, y2, time = 0;
        const my2interval = setInterval(() => {
            x1 = r1 * Math.cos(teta1) + x0;
            y1 = r1 * Math.sin(teta1) + y0;
            x2 = r2 * Math.cos(teta2) + 450;
            y2 = r2 * Math.sin(teta2) + 450;
            P1.x = x1;
            P1.y = y1;
            P2.x = x2;
            P2.y = y2;
            drawCircles(P1, P2);
            teta1 += v1 * .1;
            teta2 += v2 * .1;
            colorIndex++;
            if (time >= constTime) {
                clearInterval(my2interval);
                cx2.beginPath();
                cx2.clearRect(0, 0, 900, 900);
            }
            time += freq / 1000;
        }, freq);

    }

    let teta1 = 0;
    let teta2 = 0;
    let colorIndex = 0;

    function doGuy(constTime) {
        circlesFrame(constTime);
        linesFrame(constTime);
    }


    const constTime = 10;
    doGuy(constTime);


}

class P {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

