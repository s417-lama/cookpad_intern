$(function() {
    $.get("/api/users/"+user_id, function(data) {
        var user = data.data;
        $(".titlename").text(user.username+"の投稿");
        $(".user__header__icon").css('background-image', 'url(\'data:image/png;base64,'+user.icon+'\')');
        $(".user__name").text(user.username);
        $(".user__text").text(user.bio);
        $(".postnum").text(user.post_ids.length);
        $(".commentnum").text(user.comment_ids.length);
        user.post_ids.forEach(function(post_id) {
            $.get("/api/posts/"+post_id, function(data2) {
                var post = data2.data;
                $(".user__images").append('\
                    <a href="/detail/'+post.id+'" style="text-decoration: none;"><button class="user__images__item" style="background-image: url(\'data:image/jpeg;base64,'+post.image+'\');"></button></a>\
                ');
            });
        });
        user.comment_ids.forEach(function(comment_id) {
            $.get("/api/comments/"+comment_id, function(data2) {
                var comment = data2.data;
                $.get("/api/posts/"+comment.post_id, function(data3) {
                    var comment_post = data3.data;
                    $.get("/api/users/"+comment_post.user_id, function(data4) {
                        var comment_user = data4.data;
                        $(".user__comment").append('\
                            <div class="user__comment__item">\
                              <div class="user__comment__item__image" style="background-image: url(\'data:image/jpeg;base64,'+comment_post.image+'\');"></div>\
                              <div class="user__comment__item__right">\
                                <p class="user__comment__item__right__title"><a href="/user_profile/'+comment_user.id+'" style="text-decoration: none;"><button class="bold">'+comment_user.username+'</button></a>さんが作った<a href="/detail/'+comment_post.id+'" style="text-decoration: none;"><button class="bold">'+comment_post.title+'</button></a>へのコメント</p>\
                                <p class="user__comment__item__right__text">'+comment.text+'</p>\
                                <div class="user__comment__item__right__foot">\
                                  <button class="date">1週間前</button>\
                                  <button class="thank">3人が参考になった</button>\
                                </div>\
                              </div>\
                            </div>\
                        ');
                    });
                });
            });
        });
    });
    $(".user__menu__item.dish").click(function() {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".user__menu__item.comment").removeClass("active");
            $(".user__images").show();
            $(".user__comment").hide();
        }
    });
    $(".user__menu__item.comment").click(function() {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(".user__menu__item.dish").removeClass("active");
            $(".user__images").hide();
            $(".user__comment").show();
        }
    });
    $(".user__comment").hide();
    $(".footer__item.home").click(function() {
        window.location.href = "/";
    });
});
