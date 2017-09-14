defmodule BackendWeb.DetailController do
  use BackendWeb, :controller

  def index(conn, _params) do
    render conn, "detail.html"
  end
end
