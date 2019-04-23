import React, { Component} from "react";
import { FacebookProvider, Page } from 'react-facebook';

import {getPage} from "../../dataService";
import {Loader, Title, Description, FeaturedPhoto, FeatureYoutubeVideo, FacebookPage} from "../../partials";

class Shows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,
            fb: false
        }
    }

    componentWillMount() {
        getPage("shows").then(data => this.setState({data}))
        this.setState({ fb: FacebookPage("events") })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!this.state.fb) {
            this.setState({ fb: FacebookPage("events") })
        }
    }


    render(){
        const { data, fb } = this.state;
        let {title, featuredPhoto, description, featuredYoutubeVideo } = data;

        return (
                <>
                    {!data && <Loader/>}
                    {data && <div className="page page-shows">
                        <Title title={title}/>
                        <div className="row flex-center">
                            <div className="col sm-6">
                                <FacebookProvider appId="280744509532493">
                                    <Page href="https://www.facebook.com/wellmanneredwolf" tabs="events" />
                                </FacebookProvider>
                            </div>
                            <div className="col sm-6">
                                <Description description={description}/>
                            </div>
                        </div>
                        <FeatureYoutubeVideo featureYoutubeVideo={featuredYoutubeVideo}/>
                        <FeaturedPhoto featuredPhoto={featuredPhoto}/>
                    </div>}
                </>
        );
    }
}

export default Shows;
