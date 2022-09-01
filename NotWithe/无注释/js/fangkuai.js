var chunk = document.querySelector('.chunk')
var sorce = document.querySelector('.chunk .sorce')
var shade = document.querySelector('.shade')
var again = document.querySelector('.shade .btn')
var open = document.querySelector('.open')
var zsBtn = document.querySelector('.stage .zhushi')
var openBtn = document.querySelector('.open .btn')
var passOS = document.querySelectorAll(".pass i")
var fenshu = 0;
var speed = 0.01;
var Num = 1;
var music = [
    [
        25, 21, 22, 23, 24, 25, 21, 21, 26, 24, 25, 26, 27, 31, 21, 21, 24, 25, 24, 23, 22, 23, 24, 23, 22, 21, 17,
        21, 22, 23, 21, 22, 25, 21, 22, 23, 24, 25, 21, 21, 26, 24, 25, 26, 27, 31, 21, 21, 24, 25, 24, 23, 22, 23,
        24, 23, 22, 21, 22, 23, 22, 21, 17, 21,
    ],
    [
        23, 22, 21, 17, 16, 15, 16, 17, 21, 17, 16, 15, 14, 13, 14, 12, 21, 17, 21, 11, 7, 15, 12, 13, 11, 21, 17, 16,
        17, 23, 25, 26, 24, 23, 22, 24, 24, 23, 21, 17, 16, 15, 14, 13, 12, 14, 13, 12, 11, 12, 13, 14, 15, 12, 15,
        14, 13, 16, 15, 14, 15, 14, 13, 12, 11, 6, 16, 17, 21, 17, 16, 15, 14, 13, 12, 16, 15, 16, 15, 14, 13, 23, 22,
        21, 22, 21, 23, 22, 24, 25, 23, 24, 25, 23, 24, 25, 15, 16, 17, 21, 22, 23, 24, 23, 21, 22, 23, 13, 14, 15,
        16, 15, 14, 15, 13, 14, 15, 14, 16, 15, 14, 13, 12, 13, 12, 11, 12, 13, 14, 15, 16, 14, 16, 15, 16, 17, 21,
        15, 16, 17, 21, 22, 23, 24, 25, 23, 21, 22, 23, 22, 21, 22, 17, 21, 22, 23, 22, 21, 17, 21, 16, 17, 21, 11,
        12, 13, 14, 13, 12, 13, 21, 17, 21, 16, 21, 17, 16, 15, 14, 15, 14, 13, 14, 15, 16, 17, 11, 16, 21, 17, 21,
        17, 16, 17, 21, 22, 21, 17, 21, 16, 17, 23, 13, 14, 13, 12, 22, 23, 22, 21, 13, 11, 16, 15, 5, 4, 5, 6, 16,
        17, 16, 17, 5, 4, 5, 6, 16, 15, 16, 17, 17, 16, 17, 11, 21, 22, 21, 17, 7, 11, 7, 6, 16, 15, 16, 17, 7, 13,
        12, 11, 21, 22, 24, 23, 13, 15, 23, 21, 24, 23, 24, 22, 15, 14, 15, 13, 21, 17, 21, 13, 15, 15, 16, 17, 15,
        13, 21, 22, 23, 21, 23, 23, 22, 21, 17, 16, 16, 15, 16, 17, 21, 23, 22, 21, 23,
    ],
];
sorce.style.display = "none"
var puzi = music[Math.floor(Math.random() * music.length)]
var Chunk = function (y) {
    this.x = Math.floor(Math.random() * 4),
        this.y = y,
        this.chunks = document.createElement("i"),
        chunk.appendChild(this.chunks),
        this.update()
    var _this = this
    this.chunks.onclick = function () {
        var firstChunk = ChunkArr.filter(function (ChArr) {
            return !ChArr.active
        })[0]
        if (this.isSameNode(firstChunk.chunks)) {
            var audioNode = document.createElement("audio")
            audioNode.play()
            _this.chunks.classList.add("active")
            _this.active = true
            console.log(this, _this)
            fenshu = Num++
            sorce.innerHTML = ""
            String(fenshu).split("").forEach(function (n) {
                var node = document.createElement('div')
                node.classList.add('num')
                node.classList.add('num' + n)
                sorce.appendChild(node)
            })
            if (fenshu % 10 === 0) {
                speed += 0.001
            }
            else if (fenshu === 1) {
                yunxing()
            }
            var musicPuzi = document.createElement("audio")
            musicPuzi.src = "./music/sound_" + _this.music + ".mp3"
            musicPuzi.play()
            passOS[0].style.display = "none"
            passOS[1].style.display = "block"

        }
        event.stopPropagation()
    }
}
Chunk.prototype.update = function () {
    this.chunks.style.top = this.y * 90 + "px"
    this.chunks.style.left = this.x * 90 + "px"
}
Chunk.prototype.move = function () {
    this.y += speed
}
var ChunkArr = []
for (var i = 5; i >= 0; i--) {
    var chunksNode = new Chunk(i - 1)
    var puziN = puzi.shift();
    puzi.push(puziN);
    chunksNode.music = puziN;
    ChunkArr.push(chunksNode)
}

function yunxing() {
    var setMove = setInterval(function () {
        ChunkArr.forEach(function (ele) {
            ele.move()
            ele.update()
        })
        var firstChunk = ChunkArr.filter(function (ChArr) {
            return !ChArr.active
        })[0]
        if (firstChunk && (firstChunk.y + 1) * 90 >= 640) {
            console.log("离开空间1")
            shade.style.display = "flex"
            clearInterval(setMove)
        }
        if (ChunkArr[ChunkArr.length - 1].y >= 0) {
            var lastChunk = new Chunk(-1)
            var puziN = puzi.shift();
            puzi.push(puziN);
            lastChunk.music = puziN;
            ChunkArr.push(lastChunk)
        }
        var SecChunk = ChunkArr.filter(function (ChArrs) {
            return ChArrs.active
        })[0]
        if (SecChunk && SecChunk.y * 90 > 640) {
            chunk.removeChild(SecChunk.chunks)
            ChunkArr.splice(ChunkArr.indexOf(
                SecChunk
            ), 1)
        }
        chunk.onclick = function () {
            if (fenshu > 0) {
                shade.style.display = 'flex'
                clearInterval(setMove)
            }
        }
        passOS[0].onclick = function () {
            passOS[1].style.display = "block";
            passOS[0].style.display = "none";
            clearInterval(setMove)
            yunxing()
        }
        passOS[1].onclick = function () {
            passOS[1].style.display = "none";
            passOS[0].style.display = "block";
            clearInterval(setMove)
    
        }
    }, 1000 / 60)
}
again.onclick = function () {
    //重新载入页面
    location.reload(true);
}
openBtn.onclick = function () {
    setTimeout(function () {
        open.style.display = "none"

    }, 100)
    open.style.opacity = 0
}
zsBtn.onclick = function () {
    setTimeout(function () {
        zsBtn.style.display = "none"
        sorce.style.display = "flex"
    }, 100)
    // yunxing()
    zsBtn.style.opacity = 0

}