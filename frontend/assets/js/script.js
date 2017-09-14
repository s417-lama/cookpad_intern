$(function() {
    $.get("/api/posts", function(data) {
        var posts = data.data.reverse();
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
                                <a href="/user_profile/'+user.id+'" style="text-decoration: none;"><p class="postCard__head__info__name">'+user.username+'</p></a>\
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
                            <a href="/user_profile/'+user.id+'" style="text-decoration: none;"><span class="bold">'+user.userid+'</span></a> '+post.description+'</p>\
                            <div class="postCard__cont__status">\
                                <p class="cheernum post'+post.id+'">'+post.cheer+'人が応援中</p>\
                                <a href="/detail/'+post.id+'"><button>コメント'+post.comment_ids.length+'件</button></a>\
                            </div>\
                        </div>\
                        <div class="postCard__button">\
                            <button class="postCard__button__item heart post'+post.id+'"></button>\
                            <button class="postCard__button__item comment"><a href="/detail/'+post.id+'" style="text-decoration: none;">コメントする</a></button>\
                            <button class="postCard__button__item share">シェアする</button>\
                        </div>\
                    </li><!-- timeline__element -->\
                ');
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
});
