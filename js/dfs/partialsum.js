
var numCntDom = document.getElementById("numCnt");
var sumDom = document.getElementById("sum");
var numsDom = document.getElementById("nums");
var testcase1 = document.getElementById("testcase1");
var testcase2 = document.getElementById("testcase2");

testcase1.onclick = function () {
	var nums = [1, 2, 4, 7];
	var sum = 13;

	numCntDom.innerHTML = "要素数:" + nums.length;
	numsDom.innerHTML = "要素:" + nums;
	sumDom.innerHTML = "合計:" + sum;
};

testcase2.onclick = function () {
	var nums = [1, 2, 4, 7];
	var sum = 15;

	numCntDom.innerHTML = "要素数:" + nums.length;
	numsDom.innerHTML = "要素:" + nums;
	sumDom.innerHTML = "合計:" + sum;
};

