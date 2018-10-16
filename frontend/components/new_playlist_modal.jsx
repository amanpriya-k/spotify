import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/modal_actions';
import NewPlaylistForm from './new_playlist_form';
import AddSongForm from './add_song_form';

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { modal, closeModal } = this.props;
    // debugger;
    if (!modal) {
      return null;
    }

    let component;
    switch (modal.modal) {
      case 'new_playlist':
        component = <NewPlaylistForm />;
        break;
      case 'add_to_playlist':
        component = <AddSongForm songId={modal.song_id}/>;
        break;
      default:
        return null;
    }


    return (
      <div className="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
