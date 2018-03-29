$(function (){
    //获取stage
    angle = 0;
    var canvas = document.getElementById("myCanvas");
    canvas.width = 1000;
    canvas.height = 800
    stage = new createjs.Stage(canvas);
    stage.autoClear = true;
    angle = 0
    x = 0;
    y = 150
    lastx = stage.x;
    lasty = stage.y
    function drawpolystar(){
        polystar = new createjs.Shape();
        // polystar.graphics.setStrokeStyle(5).beginStroke("orange").drawPolyStar(10, 150, 5, 15, 15, angle);
        polystar.graphics.setStrokeStyle(1);
        polystar.graphics.beginFill('#ff7f74');
        polystar.graphics.drawPolyStar(x, y, 50, 12, 0.5, angle)
        // stage.addChild(polystar);
        stage.enableMouseOver();
        stage.update();
        circle = new createjs.Shape()
        circle.graphics.setStrokeStyle(1);
        circle.graphics.beginStroke("#ff7f74");
        circle.graphics.drawCircle(x, y, 50)
        // stage.addChild(circle);
        stage.update();
        //生成线条
        line = new createjs.Shape();
        line.graphics.setStrokeStyle(1).beginStroke("#000000");
        line.graphics.moveTo(lastx, lasty + 150);
        line.graphics.lineTo(stage.x, stage.y + 152);
        line.graphics.endStroke();
        //将生成图形添加到stage中，并且调用update方法更新
        stage.addChild(line);
        stage.update();
    }
    drawpolystar()
    //添加一个Ticker类帮助避免多次调用update方法
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTicker);
    var flag = true;
    function handleTicker(){
        // stage.removeAllChildren()
        stage.removeChild(polystar, circle)
        // polystar.rotation = Math.floor(Math.random() * 60);
        if (flag) {
            stage.x += 0.5
            angle++
            if (stage.x == 400) {
                stage.removeChild(polystar, circle, line)
                flag = false
            }
        } else {
            stage.x -= 0.5
            angle--
            if (stage.x == 50) {
                stage.removeChild(polystar, circle, line)
                flag = true
            }
        }
        stage.y = Math.cos(stage.x * 0.1) *  50
        lastx = stage.x;
        lasty = stage.y
        drawpolystar()
        stage.update();
    }
    // polystar.addEventListener("click", handleClick);
    function handleClick(event){
        // Click happened.
        console.log('You Clicked Me')
    }
    polystar.addEventListener("mouseover", handlemouseover);
    function handlemouseover(event){
        console.log('mouseover')
    }
})
