var test = require('tape');
var nsort = require('../index.js');

test('initial', function(t) {
    t.is(nsort('a', 'b'), -1);
    t.is(nsort('b', 'a'), 1);
    t.is(nsort('a', 'a'), 0);

    t.is(nsort('a', 'aa'), -1);
    t.is(nsort('aa', 'a'), 1);
    t.is(nsort('aa', 'aa'), 0);

    t.end();
});

var helper = function(t, a, s, sortFn) {
    if(!sortFn) sortFn = nsort;
    a.sort(sortFn);
    for(var i = 0; i < a.length; i++) {
        t.is(a[i], s[i], a[i]);
    }
};

test('array', function(t) {
    helper(t, ['1', '10', '3'], ['1', '3', '10']);
    t.end();
});

test('array 2', function(t) {
    helper(t, ['a1b1.c', 'a10b4.c', 'a3b10.c', 'a10b10.c'], ['a1b1.c', 'a3b10.c', 'a10b4.c', 'a10b10.c']);
    t.end();
});


test('zeros', function(t) {
    helper(t, ['1', '01', '001', '2', '02', '002'], ['001', '01', '1', '002', '02', '2']);
    t.end();
});

test('zeros first', function(t) {
    helper(t, ['1', '01', '001', '2', '02', '002'], ['001', '002', '01', '02', '1', '2'], function(a,b){ return nsort(a, b, true); });
    t.end();
});

test('special', function(t) {
    t.is(nsort(undefined, undefined), 0);
    t.is(nsort(undefined, 'a'), -1);
    t.is(nsort('a', undefined), 1);

    t.is(nsort(undefined, null), -1);
    t.is(nsort(null, undefined), 1);
    t.is(nsort(null, null), 0);
    t.is(nsort(null, 'a'), -1);
    t.is(nsort('a', null), 1);

    t.is(nsort(1, '2'), -1);
    t.is(nsort('2', 1), 1);
    t.is(nsort('2', 2), 0);

    t.is(nsort('', 'a'), -1);
    t.is(nsort('a', ''), 1);
    t.is(nsort('', ''), 0);

    t.end();
});