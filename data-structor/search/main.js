require(['staticSearch'], function(StaticSearch) {
    var arr = [1, 4, 7, 13, 24, 56, 100]
        , staticSearch = new StaticSearch(arr)
        // , index = staticSearch.sequential()
        // , index = staticSearch.binary(24)
        // , index = staticSearch.binaryRecur(7)
        // , index = staticSearch.sequential(20)
        // , index = staticSearch.sequential2(7)
        , index = staticSearch.interpolation(4)
        ;
    console.log(index);
});