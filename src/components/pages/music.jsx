import React, { Component} from "react";

import {SongMedia, Loader, Title, Description, FeaturedPhoto, FeatureYoutubeVideo} from "../../partials";
import {getPage} from "../../dataService";

class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentWillMount() {
        getPage("music").then(data => this.setState({data}))
    }

    render(){
        const { data } = this.state;
        let {title, featuredPhoto, description, featuredYoutubeVideo, songs } = data;

        const formattedSongs = songs && songs.map((song, i) => {
            const { title, description, youtubeUrl, soundcloudUrl } = song;
            return <div className="song card col sm-5" key={`song-${ i }`} >
                <SongMedia youtubeUrl={youtubeUrl} soundcloudUrl={soundcloudUrl}/>
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: description}}/>
                </div>
            </div>
        })

        return(
            <>
                {!data && <Loader/>}
                {data && <div className="page page-music">
                    <Title title={title}/>
                    <FeatureYoutubeVideo featureYoutubeVideo={featuredYoutubeVideo}/>
                    <FeaturedPhoto featuredPhoto={featuredPhoto}/>
                    <Description description={description}/>
                    <div className="row flex-spaces">
                        {formattedSongs}
                    </div>
                </div>}
            </>
        );
    }
}

export default Music;
