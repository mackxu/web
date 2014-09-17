
require(['bubbleSort', 'selectSort', 'insertSort', 'quickSort', 'shellSort'], 
	function(BubbleSort, SelectSort, InsertSort, QuickSort, ShellSort) {
    var arr = [9, 1, 5, 8, 3, 7, 4, 6, 2]
        , bubbleSort = new BubbleSort(arr)
        , selectSort = new SelectSort(arr)
        , insertSort = new InsertSort(arr)
        , quickSort = new QuickSort(arr)
        , shellSort = new ShellSort(arr)
        ;

    // selectSort.handle();
    // insertSort.handle();
    shellSort.exec();
    // quickSort.qSortRecursion();
    // quickSort.qSortNoRecursion();
    // console.log(quickSort.returnNewArr());
    // bubbleSort.fake();
    console.log(arr);
});