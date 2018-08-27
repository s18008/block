const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = 700;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 30;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks0 = [];
var color = 0;
var score = 0;

for (var y = 15; y < 240; y = y+30) {
    for (var x = 50; x < 700; x = x + 100) {
        if (color % 2 === 0) {
            blocks0.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "lime"));
        }else{
            blocks0.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "red"));
        }
        color += 1;
    }
}

ctx.beginPath();
ctx.rect(700,0,100,600);
ctx.fillStyle = "white";
ctx.fill();


window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }


    // ボールの移動
    ball.move();

    // ボールとブロックの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks0.forEach((block) => block.draw(ctx));
}

function blocks_collide() {
    for (var v = 0; v <  blocks0.length ; v++) {
        // 動作確認用のサンプルコード
        if (blocks0[v] && blocks0[v].collide(ball)) {
            blocks0.splice(v, 1);
        }
    }
}