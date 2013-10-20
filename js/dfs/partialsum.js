
var testcase1 = document.getElementById("testcase1");
var testcase2 = document.getElementById("testcase2");

var partialSum = function(testcase) {

	var resultDom = document.getElementById("result");
	var numCntDom = document.getElementById("numCnt");
	var sumDom = document.getElementById("sum");
	var numsDom = document.getElementById("nums");

	var nowCnt = 0;
	var sum = 0;
	var usagesElements = [];
	var dfs = function (nowCnt, sum) {
		if (nowCnt === testcase.nums.length) {
			var result = sum === testcase.sum;
			console.log(usagesElements.join(",") + ":exists[" + result + "]");

			return result;
		}

		usagesElements[nowCnt] = testcase.nums[nowCnt];
		if (dfs(nowCnt + 1, sum + testcase.nums[nowCnt])) {
			return true;
		}

		usagesElements[nowCnt] = "";
		if (dfs(nowCnt + 1, sum)) {
			return true;
		}

		return false;
	};

	numCntDom.innerHTML = "要素数:" + testcase.nums.length;
	numsDom.innerHTML = "要素:" + testcase.nums;
	sumDom.innerHTML = "合計:" + testcase.sum;
	resultDom.innerHTML = "存在" + (dfs(0, 0) ? "する" : "しない");
};

testcase1.onclick = function () {
	partialSum({
		nums: [1, 2, 4, 7],
		sum: 13
	});
};

testcase2.onclick = function () {
	partialSum({
		nums: [1, 2, 4, 7],
		sum: 15
	});
};

