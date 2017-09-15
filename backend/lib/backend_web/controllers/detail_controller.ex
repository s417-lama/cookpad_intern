defmodule BackendWeb.DetailController do
  use BackendWeb, :controller

  def index(conn, %{"id" => post_id}) do
    render conn, "detail.html", post_id: post_id
  end
end
