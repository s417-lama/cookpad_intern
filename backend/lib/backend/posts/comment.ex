defmodule Backend.Posts.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Posts.{Comment, Post}
  alias Backend.Accounts.User

  schema "comments" do
    field :text, :string
    belongs_to :user, User
    belongs_to :post, Post

    timestamps()
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:text, :user_id, :post_id])
    |> validate_required([:text, :user_id, :post_id])
  end
end
