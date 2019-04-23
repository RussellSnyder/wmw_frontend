import React, { Component} from "react";
import {getPage} from "../../dataService";
import {Description, FeaturedPhoto, FeatureYoutubeVideo, Loader, Title} from "../../partials";

class Epk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentWillMount() {
        getPage("epk").then(data => this.setState({data}))
    }

    render(){
        const { data } = this.state;
        const { headline, subHeadline, logo, summary, facebookUrl, soundcloudUrl, instagramUrl, youtubUrl, shortBio, information } = data.epk
        return(
            <>
                {!data && <Loader/>}
                {data && <div className="page page-music">
                    <Title title={title}/>
                    <FeatureYoutubeVideo featureYoutubeVideo={featuredYoutubeVideo}/>
                    <FeaturedPhoto featuredPhoto={featuredPhoto}/>
                    <Description description={description}/>
                    <div className="row flex-spaces">

                    </div>
                </div>}
            </>
        );
    }
}

export default Epk;
