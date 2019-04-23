import React, { Component} from "react";
import {getPage} from "../../dataService";
import {Loader, Title, Description, FeaturedPhoto, FeatureYoutubeVideo} from "../../partials";

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false,
            messageSent: false
        }
    }

    componentWillMount() {
        getPage("contact").then(data => this.setState({data}))
    }

    render(){
        const { data } = this.state;
        let {title, description, featuredPhoto} = data;

            return(<>
                {!data && <Loader/>}
                <div className="page page-contact">
                    {data && <Title title={title}/>}
                    {data && <Description description={description}/>}
                    <form action={`https://formspree.io/${process.env.CONTACT_EMAIL}`} method="POST">
                        <input type="hidden" name="_next" value={`${process.env.WEBSITE_ROOT}/thankyou`}/>
                        <div className="row flex-center">
                            <div className="col-8 sm-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input name="name" className="input-block" type="text" id="name" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-center">
                            <div className="col-8 sm-6">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="input-block" type="email" id="email" name="email" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-center">
                            <div className="col-8 sm-6">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name={"message"} id="message" style={{width: "100%"}} rows={6} placeholder="What's up?"/>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-center">
                            <div className="col-8 sm-6">
                                <button type="submit" value="Send" className="btn-block">Send</button>
                            </div>
                        </div>
                    </form>
                    {data && <FeaturedPhoto featuredPhoto={featuredPhoto}/>}

                </div>
            </>
        );
    }
}

export default Contact;
