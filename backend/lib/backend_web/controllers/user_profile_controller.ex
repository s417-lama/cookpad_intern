defmodule BackendWeb.UserProfileController do
  use BackendWeb, :controller

  def index(conn, _params) do
    render conn, "user_profile.html"
  end
end
