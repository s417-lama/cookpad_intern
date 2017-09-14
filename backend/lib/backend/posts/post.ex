defmodule Backend.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Posts.{Post, Comment}
  alias Backend.Accounts.User

  schema "posts" do
    field :cheer, :integer, default: 0
    field :description, :string
    field :image, :binary
    field :title, :string
    field :tags, {:array, :string}
    belongs_to :user, User
    has_many :comments, Comment

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:image, :description, :cheer, :tags, :title, :user_id])
    |> validate_required([:image, :description, :cheer, :tags, :title, :user_id])
  end
end
