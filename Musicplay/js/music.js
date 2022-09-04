$(".bars").click(function () {
    $(".header").toggleClass("active")
    $(".play").toggleClass("active")
})
function upOrDown() {
    $(".header").toggleClass("active")
    $(".play").toggleClass("active")
}
$(".cont").click(function () {
    upOrDown()
})
var music = [{
    id: 1,
    name: "Oops",
    time: "03:52",
    author: "Martin Garrix",
    love: false
},
{
    id: 2,
    name: "Home(feat.Bonn)",
    time: "03:59",
    author: "Martin Garrix",
    love: false
},
{
    id: 3,
    name: "Home(Silque Remix)",
    time: "03:06",
    author: "Martin Garrix",
    love: false
},
{
    id: 4,
    name: "Glitch",
    time: "03:05",
    author: "Martin Garrix",
    love: false
},
{
    id: 5,
    name: "WIEE",
    time: "03:23",
    author: "Martin Garrix",
    love: false
},
{
    id: 6,
    name: "水花",
    time: "02:30",
    author: "塞壬唱片-MSR",
    love: false
}
];
var audio = document.createElement("audio")
var numId
var move = 1;
var open = false
var audioValue = 0;
var times
var Upnum = 1
var Dnnum = 1
music.forEach(function (el) {
    $(".list").append(' <li class="list-li" data-id=' + el.id + '> <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">' + el.id + '</div>'
        + '<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">' + el.name + '</div><div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' + el.time + '</div>'
        + '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 love" data-love="' + el.love + '"><i class="fa fa-heart-o" aria-hidden="true"></i></div></li>')
});
$(".list").on("dblclick", "li", function () {
    numId = $(this).data("id") - 1
    liner(numId)
    upOrDown()
    offlove(numId)
    audio.onended = function () {
        Dn(1)
    };
    $(".play .botton").find("i").click(function () {
        // console.log($(this)[0].title === '');
        $(this).toggleClass("cor")
        // console.log($(this))
        var thatName = $(this)[0].className
        if (thatName.includes("random")) {
            if ($(this)[0].title == '' || $(this)[0].title == "stop") {
                $(this)[0].title = "open"
                $(".play .left")
                    .find(".Up")
                    .click(function () { Up(Math.floor(Math.random() * music.length)) })
                    .end()
                    .find(".Down")
                    .click(function () { Dn(Math.floor(Math.random() * music.length)) })
                audio.onended = function () {
                    Dn(Math.floor(Math.random() * music.length))
                };
                console.log("随机开始");
            } else {
                $(this)[0].title = "stop"
                $(".play .left")
                    .find(".Up")
                    .click(function () { Up(Upnum) })
                    .end()
                    .find(".Down")
                    .click(function () { Dn(Dnnum) })
                console.log("随机结束");
                audio.onended = function () {
                    Dn(Dnnum)
                };
            }
        }
        if (thatName.includes("refresh")) {
            if ($(this)[0].title == '' || $(this)[0].title == "stop") {
                $(this)[0].title = "open"
                audio.loop = true
                console.log("循环开启");
            } else {
                $(this)[0].title = "stop"
                audio.loop = false
                console.log("循环关闭");
            }
        }
    })
    function Dn(num) {
        numId = numId + num
        if (numId > (music.length - num)) {
            numId = 0
        }
        offlove(numId)
        liner(numId)
    }
    function Up(num) {
        numId = numId - num
        if (numId < 0) {
            numId = (music.length - num)
        }
        offlove(numId)
        liner(numId)
    }
    $(".play .left").find(".Up").click(function () { Up(Upnum) })
    $(".play .left").find(".Down").click(function () { Dn(Dnnum) })
    function offlove(nowId) {
        if (music[nowId].love) {
            $(".play .botton").find(".fa-heart-o").css("color", "#f00")
        } else {
            $(".play .botton").find(".fa-heart-o").css("color", "#fff")
        }
    }
    $(".jindutiao").css("opacity", "1").find("input")[0].oninput = function () {
        audio.currentTime = (this.value * audio.duration) / 100;
    }

    audio.ontimeupdate = function () {
        $(".dark").width((this.currentTime / this.duration) * 100 + "%");
        var curmin = Math.floor(audio.currentTime / 60)
        var cursed = parseInt(audio.currentTime % 60)
        var durmin = Math.floor(audio.duration / 60)
        var dursed = parseInt(audio.duration % 60)
        console.log(curmin,cursed,durmin,dursed);
        $(".play .jindutiao").find(".start").text((curmin <= 9 ? "0" + curmin + ":" : curmin + ":") + (cursed <= 9 ? "0" + cursed : cursed))
        $(".play .jindutiao").find(".end").text((durmin <= 9 ? "0" + durmin + ":" : durmin + ":") + (dursed <= 9 ? "0" + dursed : dursed))
    };
})

chushihua(0)
function chushihua(num) {
    $(".header .cont .Text").append("<h3>" + music[num].name + "</h3>")
    audio.src = "./music/music" + (num + 1) + ".mp3"
    $(".play .right").text(music[num].name)
    $(".header .cont .Text").html("").append("<h3>" + music[num].name + "</h3><h4>" + music[num].author + "</h4>")
    $(".play .right").html("").append("<span>" + music[num].name + " </span><span>" + music[num].author + "</span>")
}

function liner(num) {
    var nums = num + 1
    $(".header .cont .Text").append("<h3>" + music[num].name + "</h3>")
    audio.src = "./music/music" + nums + ".mp3"
    console.log(nums)
    $(".play .right").text(music[num].name)
    audio.play()
    $(".play .op").removeClass("fa-play fa-pause").addClass("fa-pause")
    //添加名字
    $(".header .cont .Text").html("").append("<h3>" + music[num].name + "</h3><h4>" + music[num].author + "</h4>")
    $(".play .right").html("").append("<span>" + music[num].name + " </span><span>" + music[num].author + "</span>")
}

$(".play .op").click(function () {
    //根据状态的不同是否停止方法里面的定时器
    if ($(".play .op")[0].className.includes("fa-play")) {
        clearInterval(times)
    } else if ($(".play .op")[0].className.includes("fa-pause")) {
        clearInterval(times)
    }
    if ($(this)[0].className.includes("fa-play")) {
        audio.play()
        $(this).removeClass("fa-play").addClass("fa-pause")

    } else if ($(this)[0].className.includes("fa-pause")) {
        $(this).removeClass("fa-pause").addClass("fa-play")
        audio.pause()
    }
})




$(".list .list-li .love").find("i").click(function () {
    $(this).toggleClass(["fa-heart-o", "fa-heart"]).css("color", "#f00")
    music[$(this).parents("li").data("id") - 1].love = true
})

//显示当前歌曲时间
//获取当前歌曲完全的时长
// audio.duration
// audio.ondurationchange=alert("更新词条");
// audio.currentTime

//设置时间位置 , 设置到5秒(完成)
//audio.currentTime=5;


//循环(完成)
// audio.loop=true;

//声音大小(未完成)
//audio.volume=0.2;



//随机播放(完成，但是有报错)
//Math.random()*music.length