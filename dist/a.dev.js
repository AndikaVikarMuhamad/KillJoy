"use strict";

var findMedianSortedArrays = function findMedianSortedArrays(nums1, nums2) {
  var arr = nums1.concat(nums2);
  arr.sort(function (a, b) {
    return a - b;
  });
  var n = arr.length;
  var mean;
  var mid = Math.floor(n / 2);

  if (n % 2 == 0) {
    mean = (arr[mid - 1] + arr[mid]) / 2;
  } else {
    mean = arr[mid];
  }

  return mean;
};

var nums1 = [1, 4];
var nums2 = [3, 2];
console.log(findMedianSortedArrays(nums1, nums2)); // [1, 2, 3, 4, 4, 5, 6];