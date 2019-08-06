import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

import styles from './layouts/BasicSongInfo.module.css';
import inputStyles from '../../layouts/Input.module.css';

const { REACT_APP_API_URL = '' } = process.env;

class BasicSongInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      title: '',
      imageUrl: '',
    };

    this.uuids = {
      author: uuidv4(),
      title: uuidv4(),
      image: uuidv4(),
    };
  }

  async updateSongInfo() {
    const { author, title, imageUrl } = this.state;
    const { uuid, token } = this.props;

    try {
      const res = await axios(`${REACT_APP_API_URL}/api/songs/${uuid}`, {
        method: 'PATCH',
        headers: {
          accept: 'application/vnd.moosikapp.v1+json',
          'content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({ author, title, image: imageUrl }),
      }).then(r => r.data);

      console.log(res);
    } catch (e) {
      // error message
      console.error(e);
    }
  }

  render() {
    const { imageUrl } = this.state;
    const { author, title, image } = this.uuids;

    return (
      <div className={styles.basicInfo}>
        <div
          className={styles.image}
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : '' }}
        >
          <div className={styles.hover} />
          <label htmlFor={image} className={styles.picker}>
            <span>Choose image</span>
            <input id={image} className={styles.input} type="file" accept="image/*" />
          </label>
        </div>
        <div className={styles.titleAndAuthor}>
          <label htmlFor={author} className={styles.label}>
            <span>Author:</span>
            <input
              id={author}
              className={inputStyles.input}
              type="text"
              onChange={e => this.setState({ author: e.target.value })}
            />
          </label>
          <label htmlFor={title} className={styles.label}>
            <span>Title:</span>
            <input
              id={title}
              className={inputStyles.input}
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </label>
          <div className={styles.save}>
            <button
              className={inputStyles.button}
              type="button"
              onClick={() => this.updateSongInfo()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BasicSongInfo.propTypes = {
  uuid: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

export default connect(mapStateToProps)(BasicSongInfo);
