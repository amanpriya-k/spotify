class Api::PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.with_attached_image.all
  end

  def show
    @playlist = Playlist.find_by(id: params[:id])
  end

  def create
    @playlist = Playlist.new(params.require(:playlist).permit(:name))
    @playlist.user_id = current_user.id

    if @playlist.save
      current_user.followed_playlists << @playlist
      render :show
    else
      render json: ["Unable to create playlist"], status: 401
    end
  end

  def destroy
    @playlist = Playlist.find_by(id: params[:id])
    @playlist.destroy
    render :show
  end

  def followed_playlists
    @playlists = current_user.followed_playlists
    render :index
  end

  def follow
    @playlist = Playlist.find(params[:id])
    current_user.followed_playlists << @playlist
    render :show
  end

  def unfollow
    @playlist = Playlist.find(params[:id])
    @follow = Follow.find_by( followable_id: @playlist.id,
                          followable_type: 'Playlist',
                          user_id: current_user.id)
    @follow.destroy
    render :show
  end

end