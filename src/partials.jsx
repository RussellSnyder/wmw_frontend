import React from "react";

export function Title(props) {
    let {title} = props;
    return <>
        {title && title.length > 0 && <h1>{title}</h1>}
    </>
}

export function Description(props) {
    let {description} = props;
    return <>
        {description.length > 0 && <div className="description" dangerouslySetInnerHTML={{__html: description}}/>}
    </>
}

export function FacebookPage(tab) {
    return <div className="fb-page" data-href="https://www.facebook.com/wellmanneredwolf" data-tabs={tab}
                data-width="500" data-height="1000" data-small-header="false" data-adapt-container-width="true"
                data-hide-cover="false" data-show-facepile="true">
        <blockquote cite="https://www.facebook.com/wellmanneredwolf" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/wellmanneredwolf">Well Mannered Wolf</a></blockquote>
    </div>
}

export function FeaturedPhoto (props) {
    let {featuredPhoto} = props;
    return <>
        {featuredPhoto && featuredPhoto.url && <div className="row flex-center">
            <div className="col col-sm-6">
                <img className={"img-fluid"} src={featuredPhoto.url} alt={featuredPhoto.title}/>
            </div>
        </div>}
    </>
}

export class FeatureYoutubeVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoLoaded: false
        }
    }

    render() {
        let { featureYoutubeVideo } = this.props;
        let { videoLoaded } = this.state;

        return <>
            {featureYoutubeVideo && !videoLoaded && <h2>Awesome Video Loading....</h2>}
            {featureYoutubeVideo && <div className="row flex-center">
                <div className="col col-12 sm-10 md-8 border border-primary">
                    <div className="videoWrapper">
                        <iframe width="560" height="315" src={featureYoutubeVideo}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen onLoad={() => this.setState({videoLoaded: true})}/>
                    </div>
                </div>
            </div>}
        </>
    }
}

export function Loader() {
    return <div className="loader">
        <h3>Loading....</h3>
        <div className="pacman">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    </div>
}

export class SongMedia extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoLoaded: true
        }
    }

    render() {
        let { youtubeUrl, soundcloudUrl } = this.props;
        let { videoLoaded } = this.state;

        // youTube trumps soundcloud
        let mediaUrl = youtubeUrl && youtubeUrl.length > 1 ? youtubeUrl : soundcloudUrl

        let Iframe;
        if (youtubeUrl) {
            Iframe = <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${youtubeUrl}`} frameBorder="0"
                             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                             onLoad={() => {
                                 this.setState({videoLoaded: true})
                             }}
                             allowFullScreen/>
        } else if (soundcloudUrl) {
            Iframe = <iframe width="100%" height="315" scrolling="no" frameBorder="no" allow="autoplay"
                             allowFullScreen
                             onLoad={() => {
                                this.setState({videoLoaded: true})
                            }}
                             src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudUrl}&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}/>
        }

        return <>
            {!videoLoaded && mediaUrl && <h2>Awesome Song Loading....</h2>}
            {videoLoaded && Iframe}
        </>
    }
}


