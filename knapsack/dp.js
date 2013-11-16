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

var dpTableHtml = '<table id="dp-table" border="1"><tr><td>I＼J</td>';
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
    
for (i = 0; i <= num; i++){
    dp[i] = [];
    for(j = 0; j <= limit; j++){
        dp[i][j] = defaultVal;
    }
}

var befValDom    = document.getElementById('bef-val');
var newValDom    = document.getElementById('new-val');
var addTotalVDom = document.getElementById('add-total-v');
var addTotalWDom = document.getElementById('add-total-w');
var addVDom      = document.getElementById('add-v');
var addWDom      = document.getElementById('add-w');
var addNumDom    = document.getElementById('add-num');

var loopNum = 1;
var interval = 1500;
for (i = 0; i < num; i++) {
    for(j = 0; j <= limit; j++) {
        for(k = 0; k * goods[i].w <= j; k++) {
            setTimeout((function (i, j, k, loop) {
                return function () {
                    console.log('Loop[' + loop + ']i,j,k:' + i +',' + j + ',' + k);
                    var befV = dp[i + 1][j];
                    var newV = dp[i][j - k * goods[i].w] + k * goods[i].v;

                    befValDom.innerHTML    = befV;
                    newValDom.innerHTML    = newV;
                    addTotalVDom.innerHTML = k * goods[i].v;
                    addTotalWDom.innerHTML = k * goods[i].w;
                    addVDom.innerHTML      = goods[i].v;
                    addWDom.innerHTML      = goods[i].w;
                    addNumDom.innerHTML    = k;

                    dp[i + 1][j] = Math.max(befV, newV);

                    document.getElementById(valIdName(i + 1, j)).innerHTML = dp[i + 1][j];
                };
            })(i, j, k, loopNum), (loopNum++) * interval);
        }
    }
}

console.log(dp[num][limit]);
