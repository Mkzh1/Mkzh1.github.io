var chunk = document.querySelector('.chunk')
var sorce = document.querySelector('.chunk .sorce')
var shade = document.querySelector('.shade')
var again = document.querySelector('.shade .btn')
var open = document.querySelector('.open')
var zsBtn = document.querySelector('.stage .zhushi')
var openBtn = document.querySelector('.open .btn')
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
//初始化
//生成方块器
//移动
//更新视图
//检测点击与点击后的删除事件
//判断是否结束游戏

//随分数渐行，愈来愈快
//分数采用精灵图素材
//结束界面优化
//创建初始开始界面
//仅通过点击方块时才开始

//在两个谱子中随机取一个谱子阅读
var puzi = music[Math.floor(Math.random() * music.length)]
var Chunk = function (y) {
    //定义每个盒子的位置（这里为固定x与y）
    //随机数x使每一次拿到的单个盒子位置随机
    
    this.x = Math.floor(Math.random() * 4),
    this.y = y,
    // this.speed = speed,
    
        this.chunks = document.createElement("i"),
        chunk.appendChild(this.chunks),
        this.update()
    // 假设当我只有
    // console.log(this)
    //这里将chunks.this封装成一个实例化的对象，实例化对象后好像能直接获取这个实例化对象里面的值 "【_this.active = true】"
    var _this = this
    //给当前空间里面的所有子元素添加点击事件

    this.chunks.onclick = function () {
        //这里的this指向当前使用函数的对象，也可以在外部使用变量将this赋值，然后在方法中再次调用
        var firstChunk = ChunkArr.filter(function (ChArr) {
            // console.log(ChArr);
            return !ChArr.active
        })[0]
        //节点判断，那当前节点判断上面算出来的第一个未点击的节点，如果是true则执行点击事件本该执行的内容
        //拿节点与节点进行判断，这里的this得到节点，在拿当前得到的第一个参数里面的i对象参数对比，得到结果，这里的_this是实例对象
        if (this.isSameNode(firstChunk.chunks)) {
            var audioNode = document.createElement("audio")
            audioNode.play()
            _this.chunks.classList.add("active")
            // this.classList.add("active")
            //在点击添加css之后顺带把这个true也给传出去
            _this.active = true
            // this.active = true
            console.log(this, _this)
            // console.log(Num)
            fenshu = Num++
            // var firstChunk = ChunkArr.filter(function (ChArr) {
            //     // console.log(ChArr);
            //     return !ChArr.active
            // })[0]
            sorce.innerHTML = ""
            String(fenshu).split("").forEach(function (n) {
                var node = document.createElement('div')
                node.classList.add('num')
                node.classList.add('num' + n)
                sorce.appendChild(node)
            })
            // ChunkNum.innerText = fenshu
            if (fenshu % 10 === 0) {
                speed += 0.001
            } else if (fenshu === 1) {
                yunxing()
            }
            //定义每一个点击的方块都具备单一一个音乐
            //遍历谱子，将每一次得到的第一个未点击的块添加音乐
            // console.log(_this.music)
            var musicPuzi = document.createElement("audio")
                musicPuzi.src = "./music/sound_"+_this.music+".mp3"
                musicPuzi.play()
            // console.log(speed)
            //取消冒泡
            // event.stopPropagation()

        }
        event.stopPropagation()
    }

    // console.log(speed)
    // shade.style.display = "none"
}
// Chunk.prototype.Drew = function () {
//     //生成
// }
Chunk.prototype.update = function () {
    //更新位置
    this.chunks.style.top = this.y * 90 + "px"
    this.chunks.style.left = this.x * 90 + "px"
}
Chunk.prototype.move = function () {
    //移动速度

    // console.log(fenshu)
    // if (fenshu >= 1000) {
    //     speed += 10 * 0.008
    // } else if (fenshu >= 100) {
    //     speed += 10 * 0.006
    // } else if (fenshu >= 50) {
    //     speed += 10 * 0.004
    // }
    // else if (fenshu >= 10) {
    //     speed += 10 * 0.002
    // }

    // console.log(speed)
    this.y += speed
}
//定义每一次应该出现多少个
var ChunkArr = []
//这里定义3个,如果从顺时针执行则会在下面生成会导致开局失败，所以反向执行for
for (var i = 5; i >= 0; i--) {
    // console.log(i-2)
    var chunksNode = new Chunk(i - 1)
    //将谱子的第一个删除，也就是每次点击后删除当前点击到的音乐
    var puziN = puzi.shift();
    //将谱子的第一个被删除的音乐插去最后
    puzi.push(puziN);
    //再次读取谱子
    chunksNode.music = puziN;

    ChunkArr.push(chunksNode)

}

// 遍历每一个方块并且运行方块，使其移动
function yunxing() {
    var setMove = setInterval(function () {
        ChunkArr.forEach(function (ele) {
            ele.move()
            ele.update()
            // console.log(ChunkArr[ChunkArr.length-1].y)
        })
        //查找数组中带有active.played = true 的值

        //使用上面封装好的实例对象来进行调用，判断对象是否有被点击，如果点击则不会触发触底，未点击则会触发触底
        var firstChunk = ChunkArr.filter(function (ChArr) {
            // console.log(ChArr);
            return !ChArr.active
        })[0]
        // console.log(firstChunk)
        //判断是否有内容（undefined）以及对象超出空间，如果超出则执行删除超出部分
        // if(firstChunk&&(firstChunk.y+1)*90>640){
        //     console.log("离开空间")
        // }
        //判断第一个值是否触底
        if (firstChunk && (firstChunk.y + 1) * 90 >= 640) {
            console.log("离开空间1")
            shade.style.display = "flex"
            clearInterval(setMove)

        }
        //判断数组中最后值是否进入空间，添加一个
        if (ChunkArr[ChunkArr.length - 1].y >= 0) {
            // console.log(123)
            //判断当前最后一个是否已经进入空间，如果进入则前面生成一个数组最后的值（顶替当前已经进入空间的值），使其每次都能在出现在最后一个
            //这里取-1是因为每一次往后最追加的的位置是-1*90px，所以是-1也就是追加的位置位当前空间的最上外层
            var lastChunk = new Chunk(-1)
            var puziN = puzi.shift();
            puzi.push(puziN);
            lastChunk.music = puziN;
            // console.log(puzi)
            ChunkArr.push(lastChunk)
        }
        //掉落删除，判断当前对象中是否含有played:true，如果包含则不做时停判断，并且使其在退出空间时删除其数组与对象
        var SecChunk = ChunkArr.filter(function (ChArrs) {
            // console.log(ChArr);
            return ChArrs.active
        })[0]
        // console.log(SecChunk);
        if (SecChunk && SecChunk.y * 90 > 640) {
            // console.log("离开空间2")
            chunk.removeChild(SecChunk.chunks)
            //删除节点与数组对应的内容
            ChunkArr.splice(ChunkArr.indexOf(
                SecChunk
            ), 1)
            // clearInterval(setMove)
        }
        chunk.onclick = function () {
            if (fenshu > 0) {
                shade.style.display = 'flex'
                clearInterval(setMove)
            }
        }
    }, 1000 / 60)
}
//初始与结束控制按钮
again.onclick = function () {
    location.reload(true);
}

// open.style.display = "none"
// zsBtn.style.display = "none"
openBtn.onclick = function () {
    setTimeout(function () {
        open.style.display = "none"
    },100)
    open.style.opacity = 0
}
zsBtn.onclick = function(){
    setTimeout(function () {
        zsBtn.style.display = "none"
    },100)
    zsBtn.style.opacity = 0
}