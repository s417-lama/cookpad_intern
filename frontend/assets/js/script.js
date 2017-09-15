$(function() {
    $.get("/api/posts", function(data) {
        var posts = data.data;
        posts.forEach(function(post) {
            var datetime = new Date(post.registered_at);
            var weekdays = ["日","月","火","水","木","金","土"];
            $.get("/api/users/"+post.user_id, function(data2) {
                var user = data2.data;
                $(".timeline").append('\
                    <li class="timeline__element postCard">\
                        <div class="postCard__head">\
                            <div class="postCard__head__icon">\
                                <img style="background-image: url(\'data:image/png;base64,'+user.icon+'\');" alt="">\
                            </div>\
                            <div class="postCard__head__info">\
                                <p class="postCard__head__info__name user'+user.id+'">'+user.username+'</p>\
                                <p class="postCard__head__info__date">'+datetime.getMonth()+'月'+datetime.getDate()+'日('+weekdays[datetime.getDay()]+') '+datetime.getHours()+':'+datetime.getMinutes()+'</p>\
                            </div>\
                            <button class="postCard__head__follow"></button>\
                            <button class="postCard__head__menu"></button>\
                        </div>\
                        <div class="postCard__image">\
                            <p class="postCard__image__title">'+post.title+'</p>\
                            <div class="postCard__image__cont" style="background-image: url(\'data:image/jpeg;base64,'+post.image+'\');" alt=""></div>\
                        </div>\
                        <div class="postCard__cont">\
                            <p class="postCard__cont__text">\
                            <span class="bold user'+user.id+'">'+user.userid+'</span> '+post.description+'</p>\
                            <div class="postCard__cont__status">\
                                <p class="cheernum post'+post.id+'">'+post.cheer+'人が応援中</p>\
                                <button class="post'+post.id+'">コメント'+post.comment_ids.length+'件</button>\
                            </div>\
                        </div>\
                        <div class="postCard__button">\
                            <button class="postCard__button__item heart post'+post.id+'"></button>\
                            <button class="postCard__button__item comment post'+post.id+'">コメントする</button>\
                            <button class="postCard__button__item share">シェアする</button>\
                        </div>\
                    </li><!-- timeline__element -->\
                ');
                $(".user"+user.id).click(function() {
                    location.href = '/user_profile/'+user.id;
                });
                $(".post"+post.id).click(function() {
                    location.href = '/detail/'+post.id;
                });
                $(".heart.post"+post.id).click(function() {
                    if($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $(".cheernum.post"+post.id).text(post.cheer+"人が応援中");
                        $.ajax({
                            url: "/api/posts/"+post.id,
                            type: "PUT",
                            data: {"post": {"cheer": post.cheer}}
                        });
                    } else {
                        $(this).addClass("active");
                        $(".cheernum.post"+post.id).text(post.cheer+1+"人が応援中");
                        $.ajax({
                            url: "/api/posts/"+post.id,
                            type: "PUT",
                            data: {"post": {"cheer": post.cheer+1}}
                        });
                    }
                });
            });
        });
    });
    $(".footer__item.user").click(function() {
        window.location.href = "/user_profile/1";
    });
});
