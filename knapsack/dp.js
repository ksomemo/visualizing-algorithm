var goods = [
    {'w':3,'v':4},
    {'w':4,'v':5},
    {'w':2,'v':3}
];
var num = goods.length;
var limit = 7;
var dp = [];
var i,j,k;
var defaultVal = 0;
var valIdName = function (i, j) {
    return 'v-' + i + '-' + j;
};
var goodsIdName = function (i) {
    return 'goods-' + i;
};

var explain = '入れる品物の<br>種類数＼重さ';
var dpTableHtml = '<table id="dp-table" border="1"><tr><td>' + explain + '</td>';
for (i = 0; i <= limit; i++){
    dpTableHtml += '<td>' + i + '</td>';
}
dpTableHtml += '</tr>';
for (i = 0; i <= num; i++){
    for(j = 0; j <= limit; j++){
        if (j === 0) dpTableHtml += '<tr><td>' + i + '</td>';
        dpTableHtml += '<td id="' + valIdName(i, j) + '">' + defaultVal + '</td>';
        if (j === limit) dpTableHtml += '</tr>';
    }
}
dpTableHtml += '</table>';
document.getElementById('dp').innerHTML = dpTableHtml;

var goodsTableBody = '';
for (i = 0; i < num; i++){
    goodsTableBody += '<tr id="' + goodsIdName(i) + '">';
    goodsTableBody += '<td>' + (i + 1) + '</td>';
    goodsTableBody += '<td>' + goods[i].v + '</td>';
    goodsTableBody += '<td>' + goods[i].w + '</td>';
    goodsTableBody += '</tr>';
}
document.querySelector('#goods tbody').innerHTML = goodsTableBody;


for (i = 0; i <= num; i++){
    dp[i] = [];
    for(j = 0; j <= limit; j++){
        dp[i][j] = defaultVal;
    }
}

var befValDom    = document.getElementById('bef-val');
var newValDom    = document.getElementById('new-val');
var addTotalWDom = document.getElementById('add-total-w');
var defaultColor = 'white';
var posDom       = null;
var reusePosDom  = null;
var befGoodsId   = -1;
var loopNum      = 1;
var interval     = 1000;

var startBtn = document.getElementById('start');
startBtn.onclick = function () {
    if (startBtn.disabled) return;
    startBtn.disabled = true;

    var radios = document.getElementsByName('knapsack');
    var type = "1";
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) type = radios[i].value;
    }
    var func = (type === "1") ? knapsack : optimizedKnapsack;

    for (i = 0; i < num; i++) {
        for (j = 0; j <= limit; j++) {
            func();
        }
    }
};

function knapsack() {
    for (k = 0; k * goods[i].w <= j; k++) {
        setTimeout((function (i, j, k, loop) {
            return function () {
                console.log('Loop[' + loop + ']i,j,k:' + i +',' + j + ',' + k);

                if (befGoodsId !== i) {
                    var befGood = document.getElementById(goodsIdName(befGoodsId));
                    if (befGood) befGood.style.backgroundColor = defaultColor;
                    befGoodsId = i;
                    document.getElementById(goodsIdName(i)).style.backgroundColor = 'yellow';
                }

                if (posDom)     posDom.style.backgroundColor      = defaultColor;
                if (reusePosDom)reusePosDom.style.backgroundColor = defaultColor;

                var befPos    = i + 1;
                var reusePos  = j - k * goods[i].w;
                var reuseV    = dp[i][reusePos];
                var befV      = dp[befPos][j];
                var newV      = reuseV + k * goods[i].v;

                posDom      = document.getElementById(valIdName(befPos, j));
                reusePosDom = document.getElementById(valIdName(i, reusePos));
                posDom.style.backgroundColor      = 'pink';
                reusePosDom.style.backgroundColor = 'skyblue';

                befValDom.innerHTML    = befV;
                newValDom.innerHTML    = newV + '(' + reuseV + ' + '+ k + ' * ' + goods[i].v + ')';
                addTotalWDom.innerHTML = k * goods[i].w + '(' + k + ' * ' + goods[i].w + ')';

                dp[befPos][j] = Math.max(befV, newV);

                document.getElementById(valIdName(befPos, j)).innerHTML = dp[i + 1][j];
            };
        })(i, j, k, loopNum), (loopNum++) * interval);
    }
}

function optimizedKnapsack() {
    setTimeout((function (i, j, loop) {
        return function () {
            console.log('Loop[' + loop + ']i,j:' + i +',' + j);

            if (befGoodsId !== i) {
                var befGood = document.getElementById(goodsIdName(befGoodsId));
                if (befGood) befGood.style.backgroundColor = defaultColor;
                befGoodsId = i;
                document.getElementById(goodsIdName(i)).style.backgroundColor = 'yellow';
            }

            if (posDom)     posDom.style.backgroundColor      = defaultColor;
            if (reusePosDom)reusePosDom.style.backgroundColor = defaultColor;

            var nowPos    = i + 1;
            var reusePos  = j - goods[i].w;
            var reusable  = reusePos >= 0;
            var befV      = dp[i][j];
            var reuseV    = reusable ? dp[i + 1][reusePos] : befV;
            var newV      = reusable ? reuseV + goods[i].v : befV;

            posDom = document.getElementById(valIdName(nowPos, j));
            posDom.style.backgroundColor      = 'pink';
            if (reusable) {
                reusePosDom = document.getElementById(valIdName(i + 1, reusePos));
                reusePosDom.style.backgroundColor = 'skyblue';
            } else {
                reusePosDom = document.getElementById(valIdName(i, j));
                reusePosDom.style.backgroundColor = 'gray';
            }

            befValDom.innerHTML    = befV;
            newValDom.innerHTML    = !reusable ? '入れ替えられない' : newV + '(' + reuseV + ' + '+ goods[i].v + ')';
            addTotalWDom.innerHTML = !reusable ? '入れ替えられない' : goods[i].w;

            if (reusable) {
                dp[nowPos][j] = Math.max(befV, newV);
            } else {
                dp[nowPos][j] = dp[i][j];
            }

            document.getElementById(valIdName(nowPos, j)).innerHTML = dp[nowPos][j];
        };
    })(i, j, loopNum), (loopNum++) * interval);
}
