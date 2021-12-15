// 播放视频
(function () {
  var playBtn = document.querySelector('#section1 .play');
  var dialog = document.querySelector('.dialog');
  var shadow = document.querySelector('.shadow');
  var closeBtn = document.querySelector('.closeBtn');
  var movie = document.querySelector('.movie');

  var movieInner = movie.innerHTML; //存放一下视频

  playBtn.onclick = function () {
    dialog.style.display = shadow.style.display = 'block';
    movie.innerHTML = movieInner;
  }

  closeBtn.onclick = function () {
    dialog.style.display = shadow.style.display = 'none';
    movie.innerHTML = '';
  }
})();


// section2选项卡
(function () {
  // 找到页面中所有类名为tabBtn的元素
  var tabBtns = document.querySelectorAll('.tabBtn');
  var tabContents = document.querySelectorAll('.tabContent');
  // 遍历对应类名的元素以及内容
  for (var i = 0; i < tabBtns.length; i++) {
    // console.log(tabBtns[i]);
    // console.log(tabContents[i]);
    tab(tabBtns[i], tabContents[i]);
  }

  // 封装一个选项卡的方法
  function tab(btn, con) {
    var btns = btn.children;
    var cons = con.children;

    // 遍历找到的按钮选项和对应内容
    for (var i = 0; i < btns.length; i++) {
      // console.log(btns[i]);
      // console.log(cons[i]);
      // 给每个btn身上添加一条索引属性
      btns[i].index = i;
      // 给按钮绑定事件
      btns[i].onclick = function () {
        // alert('aaa');
        for (var i = 0; i < btns.length; i++) {
          btns[i].classList.remove('active');
          cons[i].classList.remove('active');
        }
        this.classList.add('active');
        cons[this.index].classList.add('active');
      }
    }
  }
})();


// 轮播图
// (function () {
//   function carousel(id) {
//     var btns = document.querySelectorAll(id + ' .btn'),
//       wrap = document.querySelector(id + ' .wrap'),
//       circles = document.querySelectorAll(id + ' .circle span'),
//       ul = document.querySelector(id + ' ul'),
//       boxWidth = wrap.offsetWidth,
//       timer = null;

//     // 将轮播图复制一份
//     ul.innerHTML += ul.innerHTML;
//     // ul子元素的数量
//     var len = ul.children.length;
//     // 设置ul的宽度
//     ul.style.width = len * boxWidth + 'px';
//     // 初始化一个位置
//     ul.style.transform = 'translateX(0px)';

//     var cn = 0; // 当前li的索引
//     var ln = 0; // 上一个li的索引

//     function move() {
//       ul.style.transition = '.3s';
//       // 需要给负值
//       ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

//       // 设置一个变量存放当前导航点的索引
//       var hn = cn % (len / 2);
//       circles[ln].classList = '';
//       circles[hn].classList = 'active';

//       // hn是当前点击的索引，此次索引相对于下一次就是上一次，所以将值赋给ln
//       ln = hn;
//     }

//     // 当运动走到位置后就触发
//     ul.addEventListener('transitionend', function () {
//       if (cn == len / 2) {
//         // 让li的索引也回到1
//         cn = 0;
//         // 让过渡的时间变成0
//         ul.style.transition = '';
//         // 让图片回到第一张
//         ul.style.transform = 'translateX(0px)';
//       }
//     });

//     // 轮播图的下一张按钮
//     btns[1].onclick = function () {

//       cn++;
//       move();
//       // console.log(len);
//       // console.log(cn);
//     }
//     // 轮播图的上一张按钮
//     btns[0].onclick = function () {
//       if (cn == 0) {
//         cn = len / 2;
//         // 让过渡的时间变成0
//         ul.style.transition = '';
//         // 让图片到最后一张
//         ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
//       }

//       // 此处给一个定时函数
//       // 如果直接调用move的话，move里的transition会把if里的transition覆盖掉，所以就会有过渡的效果。用定时器是把代码变成了异步，代码就不会同时执行
//       setTimeout(function () {
//         cn--;
//         move();
//       });
//     };

//     for (var i = 0; i < circles.length; i++) {
//       // 给每个circle一个索引
//       circles[i].index = 1;
//       circles[i].onclick = function () {
//         // 将circle索引的值赋给cn;
//         cn = this.index;
//         move();
//       }
//     }
//   }

//   carousel('#section3');
//   carousel('#section5');
// })();

(function () { //轮播图
  function carousel(id) {
    var wrap = document.querySelector(id + ' .wrap'),
      ul = document.querySelector(id + ' ul'),
      btns = document.querySelectorAll(id + ' .btn'),
      circles = document.querySelectorAll(id + ' .circle span'),
      boxWidth = wrap.offsetWidth, //一个li的宽度
      timer = null,
      canClick = true; //这个变量决定用户是否可以进行下一次的点击true:可以;false:不可以

    //复制一份
    ul.innerHTML += ul.innerHTML;
    var len = ul.children.length; //子元素的数量
    ul.style.width = len * boxWidth + 'px';
    ul.style.transform = 'translateX(0)'; //初始化一个位置

    var cn = 0; //当前li的索引
    var ln = 0; //上一个li的索引

    function move() {
      canClick = false; //运动的时候不能点击
      ul.style.transition = '.3s';
      ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';

      // 	cn:0 1 2 3 4 5 6 
      // 	hn:0 1 2 3 0 1 2 3

      var hn = cn % (len / 2);
      circles[ln].className = '';
      circles[hn].className = 'active';

      ln = hn; //当前次的点击相对于下一次的点击就是上一个
    }

    ul.addEventListener('transitionend', function () { //当运动走到位置的时候就会触发
      // console.log(1);
      if (cn == len / 2) {
        cn = 0;
        ul.style.transition = '';
        ul.style.transform = 'translateX(0)';
      }

      canClick = true; //走到位置后可以进行下次点击
    });

    //下一张
    btns[1].onclick = function () {
      if (!canClick) {
        return; //这个条件成立说明不能点击
      }

      cn++;
      move();
    };

    //上一张
    btns[0].onclick = function () {
      if (!canClick) {
        return; //这个条件成立说明不能点击
      }

      if (cn == 0) {
        cn = len / 2;
        ul.style.transition = '';
        ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)';
      }
      //move();
      setTimeout(function () {
        //如果直接调用move的话，move里的transition会把if里的transition覆盖掉，所以就会有过渡的效果。用定时器是把代码变成了异步，代码就不会同时执行
        cn--;
        move();
      });
    };

    timer = setInterval(btns[1].onclick, 3000);


    //圆点点击
    for (var i = 0; i < circles.length; i++) {
      circles[i].index = i;
      circles[i].onclick = function () {
        // 关闭定时器
        // clearInterval(timer);
        if (!canClick) {
          return; //这个条件成立说明不能点击
        }

        cn = this.index; //把cn的值变成自己对应的索引
        move();
      }
    }
  }

  carousel('#section3');
  carousel('#section5');
})();

// 新增场景
(function () {
  var lis = document.querySelectorAll('#section4 li');
  var section4 = document.querySelector('#section4');
  var bottom = document.getElementsByClassName('bottom-bgi')[0];
  // console.log(bottom);
  for (var i = 0; i < lis.length; i++) {
    // console.log(li);
    lis[i].index = i;
    lis[i].onclick = function () {
      for (var i = 0; i < lis.length; i++) {
        lis[i].classList.remove('active');
      }
      this.classList.add('active');

      section4.style.background = 'url(img/section4_big_0' + (this.index + 1) + '.png) no-repeat center top'
      bottom.style.background = 'url(img/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top'
    }
  }
})();

// // 手风琴
// (function () {
//   var lis = document.querySelectorAll('#section7 li');
//   for (var i = 0; i < lis.length; i++) {
//     // console.log(li);
//     lis[i].index = i;
//     lis[i].onclick = function () {
//       for (var i = 0; i < lis.length; i++) {
//         lis[i].classList.remove('active');
//       }
//       this.classList.add('active');
//     }
//   }
// })();

(function () { //手风琴
  var lis = document.querySelectorAll('#section7 li');

  for (var i = 0; i < lis.length; i++) {
    lis[i].index = i; //给每个btn身上添加一条索引属性
    lis[i].onclick = function () {
      for (var i = 0; i < lis.length; i++) {
        lis[i].classList.remove('active');

      }
      this.classList.add('active');
    }
  }
})();



// 游戏特色 轮播图
(function () {
  var ul = document.querySelector('#section8 ul'),
    lis = ul.children,
    btns = document.querySelectorAll('#section8 .btn'),
    spans = document.querySelectorAll('#section8 .circle span'),
    ln = 0,
    cn = 0;

  btns[1].onclick = function () {
    cn++;
    cn %= lis.length;

    ul.appendChild(lis[0]);

    spans[ln].className = '';
    spans[cn].className = 'active';

    ln = cn;
  }

  btns[0].onclick = function () {
    cn--;
    if (cn < 0) {
      cn = lis.length - 1;
    }

    //insertBefore方法会阻止transition
    ul.insertBefore(lis[lis.length - 1], lis[0]);

    spans[ln].className = '';
    spans[cn].className = 'active';

    ln = cn;
  }
})();