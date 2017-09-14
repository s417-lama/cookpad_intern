defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Accounts.User
  alias Backend.Posts.{Post, Comment}

  schema "users" do
    field :bio, :string
    field :icon, :binary
    field :level, :integer
    field :password, :string
    field :userid, :string
    field :username, :string
    has_many :posts, Post
    has_many :comments, Comment

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:userid, :username, :password, :icon, :level, :bio])
    |> validate_required([:userid, :username, :password, :icon, :level, :bio])
  end
end
