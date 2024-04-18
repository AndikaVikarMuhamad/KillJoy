var findMedianSortedArrays = function (nums1, nums2) {
  let arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b);
  let n = arr.length;
  let mean;
  let mid = Math.floor(n / 2);
  if (n % 2 == 0) {
    mean = (arr[mid - 1] + arr[mid]) / 2;
  } else {
    mean = arr[mid];
  }
  return mean;
};
let nums1 = [1, 4];
let nums2 = [3, 2];
console.log(findMedianSortedArrays(nums1, nums2));
// [1, 2, 3, 4, 4, 5, 6];
