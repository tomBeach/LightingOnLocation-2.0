
function executeFunctionByName(functionName, context /*, args */) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}





function init() {
    console.log('init');

    $(".label_text_selected, .label_text_active").on('mouseenter', function(e) {
        // console.log("\n-- mouseenter");
        toggleHoverText(e.currentTarget);
        e.stopPropagation();
    });
    $(".label_text_selected, .label_text_active").on('mouseleave', function(e) {
        // console.log("\n-- mouseleave");
        toggleHoverText();
        e.stopPropagation();
    });
    $('#textLink').on('mouseenter', function() {
        console.log("\n-- mouseenter");
        $('#lesson_header').removeClass('hidden');
        $('#lesson_header').removeClass('hide');
        $('#lesson_header').addClass('show');
        $('#lesson_box').addClass('show');
    });
    $('#textLink').on('mouseleave', function() {
        console.log("\n-- mouseleave");
        $('#lesson_header').addClass('hide');
        if ($('#lesson_box').css('display') != 'none') {
            $("#lesson_box").slideToggle( "fast", function() {
                console.log('done');
            });
        }
    });
    $('#textLink').on('click', function() {
        console.log("\n-- click");
        $('#lesson_box').slideToggle( 'fast', function() {
            console.log('done');
        });
    });
}

function toggleHoverText(item) {
    console.log("toggleHoverText");
    console.log("item:", item);
    console.log("$(item).attr('id'):", $(item).attr('id'));
    if (item) {
        $('#hover_text').text($(item).attr('id'));
    } else {
        $('#hover_text').text('');
    }
}
