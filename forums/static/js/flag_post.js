$(document).ready(function(){
    $(".flag-button").click(function(){

        var csrftoken=Cookies.get('csrftoken');

        parent=$(this).parent();

        var post_id=$(this).attr('data-id');
        var post_kind=$(this).attr('data-kind');

        console.log(post_id);
        console.log(post_kind);

        var request=$.ajax({

            url: '/forum/likes/',
            method: 'POST',
            data: {post_id: post_id,
                post_kind: post_kind,
                csrftoken:csrftoken
            },
            datatype: 'html',

            beforeSend: function(xhr, settings) {
                 if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                     // Only send the token to relative URLs i.e. locally.
                     xhr.setRequestHeader("X-CSRFToken", csrftoken);
                 }
             }
        });

        request.done(function(msg){
            parent.find("#flag-div").html(msg);
            var color=parent.find("#flags").attr('class');
            parent.find("#flag-circle").css('color', color);
        });

        request.fail(function(jqXHR, textStatus){
           alert("Request failed: "+ textStatus);
        });
    });
});