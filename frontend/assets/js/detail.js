$(function() {
    $.get("/api/posts/"+post_id, function(data) {
        var post = data.data;
        console.log(post);
        var datetime = new Date(post.registered_at);
        var weekdays = ["日","月","火","水","木","金","土"];
        $.get("/api/users/"+post.user_id, function(data2) {
            var user = data2.data;
            $(".postCard__head__info__name").text(user.username).click(function() {
                location.href = "/user_profile/"+user.id;
            });
            $(".postCard__head__info__date").text(datetime.getMonth()+'月'+datetime.getDate()+'日('+weekdays[datetime.getDay()]+') '+datetime.getHours()+':'+datetime.getMinutes());
            $(".postCard__image__title").text(post.title);
            $(".postCard__cont__text").html('<span class="bold">'+user.userid+'</span> '+post.description).click(function() {
                location.href = "/user_profile/"+user.id;
            });
            $(".cheernum").text(post.cheer+'人が応援中');
            $(".commentnum").text(post.comment_ids.length+'件のコメント');
            $(".postCard__head__icon img").css('background-image', 'url(\'data:image/png;base64,'+user.icon+'\')');
            $(".postCard__image__cont").css('background-image', 'url(\'data:image/jpeg;base64,'+post.image+'\')');
            $(".heart").click(function() {
                if($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(".cheernum").text(post.cheer+"人が応援中");
                    $.ajax({
                        url: "/api/posts/"+post.id,
                        type: "PUT",
                        data: {"post": {"cheer": post.cheer}}
                    });
                } else {
                    $(this).addClass("active");
                    $(".cheernum").text(post.cheer+1+"人が応援中");
                    $.ajax({
                        url: "/api/posts/"+post.id,
                        type: "PUT",
                        data: {"post": {"cheer": post.cheer+1}}
                    });
                }
            });
            $(".postCard__send__button").click(function() {
                var text = $(".postCard__send__input").val();
                if(text != "") {
                    $.post("/api/comments", {
                        "comment": {
                            "text": text,
                            "user_id": 1,
                            "post_id": post.id
                        }}, function() {
                            location.reload();
                        }
                    );
                }
            });
        });
        post.comment_ids.forEach(function(comment_id) {
            $.get("/api/comments/"+comment_id, function(data2) {
                var comment = data2.data;
                $.get("/api/users/"+comment.user_id, function(data3) {
                    var comment_user = data3.data;
                    $(".postCard__comment").append('\
                        <li class="postCard__comment__item">\
                            <div class="postCard__comment__item__icon" style="background-image: url(\'data:image/png;base64,'+comment_user.icon+'\');"></div>\
                            <div class="postCard__comment__item__cont">\
                                <span class="userId user'+comment_user.id+'">'+comment_user.username+'</span> '+comment.text+'\
                                <div class="postCard__comment__item__cont__menu">\
                                    <p class="normal">1週間前</p>\
                                    <p class="bold">3人が参考になった</p>\
                                    <button class="comment">返信する</button>\
                                </div>\
                            </div>\
                            <button class="postCard__comment__item__thank comment'+comment_id+'"></button>\
                        </li>\
                    ');
                    $(".user"+comment_user.id).click(function() {
                        location.href = "/user_profile/"+comment_user.id;
                    });
                    $(".postCard__comment__item__thank.comment"+comment_id).click(function() {
                        if($(this).hasClass("active")) {
                            $(this).removeClass("active");
                        } else {
                            $(this).addClass("active");
                        }
                    });
                });
            });
        });
    });
    $.get("/api/users/1", function(data) {
        var user = data.data;
        $(".postCard__send__icon").css('background-image', 'url(\'data:image/png;base64,'+user.icon+'\')');
    });
    $(".footer__item.home").click(function() {
        location.href = "/";
    });
    $(".footer__item.user").click(function() {
        location.href = "/user_profile/1";
    });
    $(".prevButton").click(function() {
        history.back();
    });
});
