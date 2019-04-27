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
        let {title, featuredPhoto, description, featuredYoutubeVideo, epk } = data;

        console.log(epk)
        return(
            <>
                {!data && <Loader/>}
                {data && <div className="page page-epk">
                    {/*<Title title={title}/>*/}
                    {/*<FeatureYoutubeVideo featureYoutubeVideo={featuredYoutubeVideo}/>*/}
                    {/*<FeaturedPhoto featuredPhoto={featuredPhoto}/>*/}
                    {/*<Description description={description}/>*/}
                    <div className="epk-container">
                        <div className="row flex-spaces">
                            <div className="col sm-7">
                                <h2>{epk.headline}</h2>
                                <h4>{epk.subHeadline}</h4>
                                <div className="row">
                                    <div className={"border col col-8"}>
                                        <div dangerouslySetInnerHTML={{__html: epk.summary}} />
                                        <div className="social-media-container row flex-spaces">
                                            <div className="social-media-entry">
                                                <a target={"_blank"} href={epk.facebookUrl}><i className="fab fa-facebook"/></a>
                                            </div>
                                            <div className="social-media-entry">
                                                <a target={"_blank"} href={epk.soundcloudUrl}><i className="fab fa-soundcloud"/></a>
                                            </div>
                                            <div className="social-media-entry">
                                                <a target={"_blank"} href={epk.instagramUrl}><i className="fab fa-instagram"/></a>
                                            </div>
                                            <div className="social-media-entry">
                                                <a target={"_blank"} href={epk.youtubeUrl}><i className="fab fa-youtube"/></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col sm-5">
                                <img className={"no-border"} src={epk.logo.url} alt={epk.logo.title}/>
                            </div>
                        </div>
                        <div className="row flex-center">
                            <div className="col sm-11">
                                <h3>Short Bio</h3>
                                <div className="short-bio" dangerouslySetInnerHTML={{__html: epk.shortBio}}/>
                            </div>
                        </div>
                        <div className="row flex-center">
                            <div className="col sm-12">
                                <div className="long-bio" dangerouslySetInnerHTML={{__html: epk.information}}/>
                            </div>
                        </div>
                    </div>
                </div>}
            </>
        );
    }
}

export default Epk;
