var chunkBan = document.querySelector(".chunk")
var over = document.querySelector(".over")
var fract = document.querySelector(".fract")
var fenshu = 0;
function Chunk(y) {
    this.x = Math.floor(Math.random() * 4);
    this.y = y;
    this.chunk = document.createElement("i")
    chunkBan.appendChild(this.chunk)
    this.Update()
    var _this = this
  


    this.chunk.onclick = function () {
        var firstChunk = ChunkNum.filter(function (Chun) {
            return !Chun.played
        })[0]
        if (firstChunk&&this.isSameNode(firstChunk.chunk)) {
            fenshu += 1
            fract.innerHTML = ""
            String(fenshu).split("").forEach(function (n) {
                var fractNum = document.createElement("div")
                fractNum.classList.add("num");
                console.log(n)
                fractNum.classList.add("num" + n)
                fract.appendChild(fractNum)
                
            });
            this.classList.add("playing")
            _this.played = true
            console.log(_this)
            if (fenshu == 5) {
                MoveFunc()
            }
        }
        event.stopPropagation()
    }
}
Chunk.prototype.Update = function () {
    // console.log(this.);
    this.chunk.style.left = this.x * 90 + "px";
    this.chunk.style.top = this.y * 90 + "px";
}
Chunk.prototype.Move = function () {
    this.y += 0.01
    this.Update()
}
var ChunkNum = []
for (var i = 3; i > 0; i--) {
    var d = new Chunk(i - 2)
    ChunkNum.push(d)
}
function MoveFunc() {
    var MoveInter = setInterval(function () {
        if (ChunkNum[ChunkNum.length - 1].y >= 0) {
            var CkNum = new Chunk(-1)
            ChunkNum.push(CkNum)
            // console.log("进入空间")
        }
        var firstChunk = ChunkNum.filter(function (Chun) {
            return !Chun.played
        })[0]
        if (firstChunk && (firstChunk.y + 1) * 90 > 640) {
            clearInterval(MoveInter)
            console.log("触底");
            over.style.display = "flex"

        }
        var lastChunk = ChunkNum.filter(function (Chun) {
            return Chun.played
        })[0]
        if (lastChunk && lastChunk.y * 90 > 640) {
            console.log("退出空间", lastChunk);
            ChunkNum.splice(ChunkNum.indexOf(lastChunk), 1)
            chunkBan.removeChild(lastChunk.chunk)
        }

        ChunkNum.forEach(ele => {
            ele.Move()
        });
        chunkBan.onclick = function () {
            console.log("游戏结束");
            over.style.display = "flex";
            clearInterval(MoveInter);
        }
        over.querySelector("button").onclick = function () {
            location.reload(true);
        }
    }, 1000 / 60)
}
