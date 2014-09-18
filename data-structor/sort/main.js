
require(['bubbleSort', 'selectSort', 'insertSort', 'quickSort', 'shellSort', 'mergeSort'], 
	function(BubbleSort, SelectSort, InsertSort, QuickSort, ShellSort, MergeSort) {
    var arr = [9, 1, 5, 8, 3, 7, 4, 6, 2]
        , bubbleSort = new BubbleSort(arr)
        , selectSort = new SelectSort(arr)
        , insertSort = new InsertSort(arr)
        , quickSort = new QuickSort(arr)
        , shellSort = new ShellSort(arr)
        , mergeSort = new MergeSort(arr)
        ;

    // selectSort.exec();
    // insertSort.handle();
    shellSort.exec();
    // console.log(mergeSort.exec());
    // quickSort.qSortRecursion();
    // quickSort.qSortNoRecursion();
    // console.log(quickSort.returnNewArr());
    // bubbleSort.fake();
    console.log(arr);
});