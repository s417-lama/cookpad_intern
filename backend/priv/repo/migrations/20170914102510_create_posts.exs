defmodule Backend.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :image, :binary
      add :description, :string
      add :cheer, :integer
      add :tags, {:array, :string}
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:posts, [:user_id])
  end
end
