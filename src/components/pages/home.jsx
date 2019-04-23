import React, { Component} from "react";
import { getPage } from "../../dataService";
import {Loader, Title, Description, FeaturedPhoto, FeatureYoutubeVideo} from "../../partials";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        }
    }

    componentWillMount() {
        getPage("home").then(data => this.setState({data}))
    }

    render(){
        const { data } = this.state;
        let {title, featuredPhoto, description, featuredYoutubeVideo } = data;

        return (
                <>
                    {!data && <Loader/>}
                    {data && <div className="page page-home">
                        <Title title={title}/>
                        <FeatureYoutubeVideo featureYoutubeVideo={featuredYoutubeVideo}/>
                        <FeaturedPhoto featuredPhoto={featuredPhoto}/>
                        <Description description={description}/>
                    </div>}
                </>
        );
    }
}

export default Home;
