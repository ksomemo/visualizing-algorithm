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

var dpTableHtml = '<table id="dp-table" border="1"><tr><td>I＼J</td>';
for (i = 0; i <= limit; i++){
    dpTableHtml += '<td>' + i + '</td>';
}
dpTableHtml += '</tr>';
for (i = 0; i <= num; i++){
    for(j = 0; j <= limit; j++){
        if (j === 0) dpTableHtml += '<tr><td>' + i + '</td>';
        dpTableHtml += '<td>' + defaultVal + '</td>';
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
for (i = 0; i < num; i++){
    for(j = 0; j<= limit; j++){
        for(k = 0; k * goods[i].w <= j; k++){
            dp[i + 1][j] = Math.max(dp[i + 1][j], dp[i][j - k * goods[i].w] + k * goods[i].v);
        }
    }
}

console.log(dp[num][limit]);
