
    # 从这里开始
    ###
        自古华山一条路 
    ### 
    fill = (container, liquid = 'coffee') ->
        # 此处只能用双引号
        "Filling the #{container} width #{liquid}"
    console.log(fill('div'))

    kids = 
        brother:
            name: 'Max'
            age: 11
        sister:
            name: 'Ida'
            age: 9
    changeNumbers = ->
        inner = -1
        outer = 10 + inner
    console.log(changeNumbers())

    exports = exports ? this

    # if/else
    mood = 3 if true

    if mood == 3 and true
        console.log(mood)
    else
        console.log('good work')

    date = if mood > 2 then 2 else 4
    console.log date

    plus = (a = 2, b = 3) -> a + b

    console.log plus()

    sum = (nums...) ->
        result = 0
        nums.forEach (num) -> result += num
        result
    console.log sum(1, 4, 8)

    trigger = (events...) ->
        events.splice(2, 0, 'a')
        events

    console.log trigger(1, 2, 3, 4)




