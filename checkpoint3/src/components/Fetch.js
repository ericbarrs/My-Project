import React from 'react';
import Lightbox from 'react-image-lightbox';
import MediaQuery from 'react-responsive'
import 'react-image-lightbox/style.css';

const KEY = '8e2cabd0e3abb33aa46fab3f56643e36d3df0f024c60021c12cc8b7025de4b3b'
class Fetch extends React.Component {


  state = {
    pictures: [],
    photoIndex: 0,
    isOpen: false,
  }

  componentDidMount() {
    fetch('https://api.unsplash.com/users/yellastar42/likes/?client_id=' + KEY)
      .then(results => results.json())
      .then(data => {
        const pictures = data.map(function(pics, index) {
          return pics.urls.regular
        })
        this.setState({
          pictures: [...pictures]
        })
      })
  }


handleClickPic(e){
  this.setState({
    isOpen: true,
    photoIndex: e.target.id
  })
}

picture(){
  return this.state.pictures.map(function(pics, index){
    return <div key={index}><img id={index} src={pics} alt="" width='600px' height='400px'/></div>
  })
}

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
    <div>
      <div className="Fetch" onClick={(e)=>this.handleClickPic(e)}>
        {this.picture()}
      </div>
        <MediaQuery query="(min-width: 768px)">
          {isOpen && (
          <Lightbox
            mainSrc={this.state.pictures[photoIndex]}
            nextSrc={this.state.pictures[(photoIndex + 1) % this.state.pictures.length]}
            prevSrc={this.state.pictures[(photoIndex + this.state.pictures.length - 1) % this.state.pictures.length]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
          photoIndex: (photoIndex + this.state.pictures.length - 1) % this.state.pictures.length,
        })
      }
      onMoveNextRequest={() =>
        this.setState({
          photoIndex: (photoIndex + 1) % this.state.pictures.length,
        })
      }
    />
      )}
    </MediaQuery>
      </div>

      )
    }
  }
export default Fetch;
