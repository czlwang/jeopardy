$( "#reset_button" ).click(function() {
    //var sentence = $("#sentence").val();
    //console.log(example);
    $.ajax({
        url: '/points',
        type: 'POST',
        data: {"sentence": "sentence",
               "example": "example",
               "user": "user"},
        success: function(data) {
           console.log('saved');
        }
    });
    return false;
});
