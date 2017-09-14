defmodule Backend.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :userid, :string
      add :username, :string
      add :password, :string
      add :icon, :binary
      add :level, :integer
      add :bio, :string

      timestamps()
    end

  end
end
