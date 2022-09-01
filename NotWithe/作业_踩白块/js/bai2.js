var stage = document.querySelector(".stage")
var chunk = document.querySelector(".chunk")
var fenshu = document.querySelector(".fenshu")
var passOS = document.querySelectorAll(".pass i")
var open = document.querySelector(".open")

//使用数组使其中一个带有，否则其他都为黑色，并且每一个块都基本
// var arr = [block,block,white,block]

var fs = 0
var speed = 0.01
function Chunk(y) {
    this.x = Math.floor(Math.random() * 4),
        this.y = y,
        this.newChunk = document.createElement("i");
    chunk.appendChild(this.newChunk);
    this.Update();
    var _this = this;
    //求出第一个无点击并且触底的块,并为其赋予点击事件
    this.newChunk.onclick = function () {
        var first = chunkArr.filter(function (el) {
            return !el.played
        })[0]
        if (first && this.isSameNode(first.newChunk)) {
            fs++
            fenshu.innerText = fs
            if (fs % 5 === 0) {
                speed += 0.004
            }
            this.style.background = "rgba(250, 235, 215, 0.660)"
            _this.played = true
            // this.style.background = "linear-gradient(335deg, #ffffff, transparent)"
        }
        passOS[0].style.display = "none"
        passOS[1].style.display = "block"
        event.stopPropagation()
        // if (fs == 1) {
        //     onMove()
        // }
    }
}
Chunk.prototype.Update = function () {
    this.newChunk.style.top = this.y * 90 + "px";
    this.newChunk.style.left = this.x * 90 + "px";
}
Chunk.prototype.move = function () {
    this.y += speed
    this.Update()
}
open.style.display = "flex";
fenshu.style.display = "none";
open.querySelector("button").onclick = function () {
    open.style.display = "none"
    fenshu.style.display = "flex"
    onMove()
}
var chunkArr = []
for (var i = 3; i > 0; i--) {
    var ChunkEl = new Chunk(i - 2)
    chunkArr.push(ChunkEl)
}
function onMove() {
    var MoveSet = setInterval(function () {
        chunkArr.forEach(function (ele) {
            ele.move()
        })
        if ((chunkArr[chunkArr.length - 1].y) * 90 > 0) {
            // console.log("进入空间")
            var Chun = new Chunk(-1)
            chunkArr.push(Chun)
        }
        //求出第一个无点击并且触底的块
        var first = chunkArr.filter(function (el) {
            return !el.played
        })[0]
        if (first && (first.y + 1) * 90 > chunk.offsetHeight) {
            // console.log("触底")
            clearInterval(MoveSet)
            stage.querySelector(".over").style.display = "flex";
        }
        //求出第一个点击并且离开空间的块
        var scond = chunkArr.filter(function (el) {
            return el.played
        })[0]
        if (scond && scond.y * 90 > chunk.offsetHeight) {
            // console.log("离开空间")
            chunkArr.splice(chunkArr.indexOf(scond), 1)
            chunk.removeChild(scond.newChunk)
        }
        chunk.onclick = function () {
            clearInterval(MoveSet)
            stage.querySelector(".over").style.display = "flex";
            stage.querySelector(".over").querySelector("button").onclick = function () {
                location.reload(true);
            };
        }
        passOS[0].onclick = function () {
            passOS[1].style.display = "block";
            passOS[0].style.display = "none";
            clearInterval(MoveSet)
            onMove()
        }
        passOS[1].onclick = function () {
            passOS[1].style.display = "none";
            passOS[0].style.display = "block";
            clearInterval(MoveSet)
    
        }
    }, 1000 / 60)
}


