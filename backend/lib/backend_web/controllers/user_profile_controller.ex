defmodule BackendWeb.UserProfileController do
  use BackendWeb, :controller

  def index(conn, %{"id" => user_id}) do
    render conn, "user_profile.html", user_id: user_id
  end
end
