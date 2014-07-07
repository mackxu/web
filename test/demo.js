	$(function() {
        // button/delegate/div
        $('div').on('click', function() { console.log('div') });
        $('div').on('click', 'button', function() { console.log('delegate') });
        $('button').on('click', function() { console.log('button') });

        console.log(G.ok());

    })


    var G = {};
    G.ok = function() { return 'ok' }
