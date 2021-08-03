/*eslint-disable*/
import React, { Component } from 'react'
import $ from 'jquery'
import showdown from 'showdown'
import { Calendar } from 'react-date-range';

export default class BannerMaker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: "",
            character_length: 0,
            expanded: false,
            show_expand: false,
            height: 0
        }
        
        this.messageHandler = this.messageHandler.bind(this)
        this.expandPreview = this.expandPreview.bind(this)
        this.closePreview = this.closePreview.bind(this)
    }
    
    messageHandler = (e) => {
        const converter = new showdown.Converter({underline: true, emoji: true})
        const preview = $("#MessageBodyPreview")
        preview.empty()
        const div = $("<div>")
        const html = converter.makeHtml(e.target.value)
        div.append(html)
        preview.append(div)
        const extracted_text = 
            this.setState({
                message: e.target.value,
                character_length: html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().split("").filter(c=> c!==" ").length
            })
        
        if (div.height() > 200 && !this.state.expanded) {
            this.setState({show_expand: true, height: div.height()})
            preview.css({"height": 200})
        } else if (div.height() > 200) {
            this.setState({height: div.height()})
            preview.css({"height": div.height()+5})
        } else if (div.height() <= 200) {
            this.setState({ show_expand: false, expanded: false, height: div.height() })
            preview.css({"height": 200})
        } 
    }
    
    expandPreview = (e) => {
        e.preventDefault()
        const preview = $("#MessageBodyPreview")
        preview.css({ "height": this.state.height })
        this.setState({expanded: true})
    }
    
    closePreview = (e) => {
        e.preventDefault()
        const preview = $("#MessageBodyPreview")
        preview.css({ "height": 200 })
        this.setState({ expanded: false })
    }

    send = (e) => {
        this.props.broadcastBanner(this.state.message)
    }
    
    render() {
        return (
            <div id="BannerMakerComponent">
                <form>
                    <div className="row">
                    <label htmlFor="MessageBody">Banner Body
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="Type Message Content Here">
                                </i>
                            </small>
                        </label>
                        
                        <br />
                        <textarea id="MessageBody" placeholder="Type Message Content" className="form-input col-7" rows="15" value={this.state.message} onChange={ this.messageHandler }/>
    
                        <div className="d-flex flex-reverse-row">
                            <p id="character-counter">{this.state.character_length} characters</p>
                        </div>
                        <div className="col-4">
                            <h4 className="">Formatting Guidelines</h4>
                            <b>Click <a target="_blank" href="https://www.markdownguide.org/basic-syntax/">here</a> for a more extensive guide</b>
                            <div className="row guideline">
                                <div className="col-sm-12 col-md-6">
                                    <h6>Embedding Links: </h6>
                                    [text](link)
                                </div>
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Headers: </h6> 
                                    ####text <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="The more #s the smaller the text. At most 6 #s."> </i> 
                                </div> 
                            </div>
                            <div className="row guideline">
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Italics: </h6> 
                                    *text* 
                                </div> 
                                <div className="col-sm-12 col-md-6"> 
                                    <h6>Emojis: </h6> 
                                    Go <a target="_blank" href="https://github.com/showdownjs/showdown/wiki/Emojis">here</a>
                                </div> 
                            </div>
                        </div>
                        <label htmlFor="ExpirationDate"> Banner Expiration Date
                            <small className="light-grey-text">
                                <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="The Banner Will Disappear on this Date">
                                </i>
                            </small>
                        </label>
                        <Calendar className="col-3" id="ExpirationDate"
                            date={new Date()}
                            minDate={new Date()}
                         />
                    </div>
                </form>
                <label htmlFor="MessageBodyPreview">Banner Preview
                    <small className="light-grey-text">
                        <i className="far fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="right" title="See A Preview of Email Content">
                        </i>
                    </small>
                </label><br />
                <div disabled id="MessageBodyPreview"></div>
                {
                    this.state.show_expand
                        ?
                        <p id="ExpandNoExpand" className="d-flex flex-row-reverse">
                            <a onClick={this.state.expanded ? this.closePreview : this.expandPreview}>{this.state.expanded ? "See Less" :"See More"}</a>
                        </p>
                        :
                        null
                }
                <div id="SendMessageBtnHolder" className="d-flex flex-row-reverse">
                    <button id="SendMessageBtn" className="btn btn-success" onClick={this.send}>Send Message</button>
                </div> 
            </div>
        )
    }
}