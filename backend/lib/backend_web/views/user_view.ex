defmodule BackendWeb.UserView do
  use BackendWeb, :view
  alias BackendWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    case user.posts do
      %Ecto.Association.NotLoaded{} ->
        post_ids = []
      _ ->
        post_ids = for post <- user.posts, do: post.id
    end
    case user.comments do
      %Ecto.Association.NotLoaded{} ->
        comment_ids = []
      _ ->
        comment_ids = for comment <- user.comments, do: comment.id
    end
    %{id: user.id,
      userid: user.userid,
      username: user.username,
      password: user.password,
      icon: user.icon,
      level: user.level,
      post_ids: post_ids,
      comment_ids: comment_ids,
      registerd_at: user.inserted_at,
      bio: user.bio}
  end
end
