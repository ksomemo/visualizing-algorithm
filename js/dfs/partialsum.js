
var numCntDom = document.getElementById("numCnt");
var sumDom = document.getElementById("sum");
var numsDom = document.getElementById("nums");
var testcase1 = document.getElementById("testcase1");
var testcase2 = document.getElementById("testcase2");

var partialSum = function(testcase) {

	numCntDom.innerHTML = "要素数:" + testcase.nums.length;
	numsDom.innerHTML = "要素:" + testcase.nums;
	sumDom.innerHTML = "合計:" + testcase.sum;

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

