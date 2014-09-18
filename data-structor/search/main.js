require(['staticSearch'], function(StaticSearch) {
    var arr = [1, 4, 7, 13, 24, 56, 100]
        , staticSearch = new StaticSearch(arr)
        , index1 = staticSearch.sequential()
        , index2 = staticSearch.binary(24)
        ;
    console.log(index2);
});