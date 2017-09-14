defmodule BackendWeb.PostView do
  use BackendWeb, :view
  alias BackendWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    case post.comments do
      %Ecto.Association.NotLoaded{} ->
        comment_ids = []
      _ ->
        comment_ids = for comment <- post.comments, do: comment.id
    end
    %{id: post.id,
      image: post.image,
      description: post.description,
      cheer: post.cheer,
      title: post.title,
      comment_ids: comment_ids,
      user_id: post.user_id,
      registered_at: post.inserted_at,
      tags: post.tags}
  end
end
