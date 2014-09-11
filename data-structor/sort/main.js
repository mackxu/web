
require(['bubbleSort', 'selectSort', 'insertSort'], function(BubbleSort, SelectSort, InsertSort) {
    var arr = [9, 1, 5, 8, 3, 7, 4, 6, 2]
        , bubbleSort = new BubbleSort(arr)
        , selectSort = new SelectSort(arr)
        , insertSort = new InsertSort(arr)
        ;

    // selectSort.handle();
    insertSort.handle();
    // bubbleSort.fake();
    console.log(arr);
});