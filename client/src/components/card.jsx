import React, { Component } from "react";
import { createShortUrl } from "../APIHelper";
import constants from "../config/constants";

class Landing extends Component {
    constructor() {
      super();
      this.state = {
        showShortenUrl: false,
        shortenUrl: "",
        originalUrl: "",
        baseUrl: "",
        clickSubmit: true,
        showError: false,
        apiError: "",
        showApiError: false,
        showLoading: false,
        exUrl:
          "",
        exShortUrl: constants.baseUrl
      };
      this.handleUserInput = this.handleUserInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserInput(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({ [name]: value });
    }
    handleSubmit() {
      this.setState({ clickSubmit: true, showApiError: false });
      if (this.state.clickSubmit && this.state.originalUrl) {
        this.setState({ showLoading: true, showShortenUrl: false });
        let reqObj = {
          originalUrl: this.state.originalUrl,
          shortBaseUrl: constants.baseUrl
        };
        createShortUrl(reqObj)
          .then(json => {
            setTimeout(() => {
              this.setState({
                showLoading: false,
                showShortenUrl: true,
                shortenUrl: json.data.shortUrl
              });
            }, 0);
          })
          .catch(error => {
            this.setState({
              showLoading: false,
              showApiError: true,
              apiError: "Server Error"
            });
          });
      } else {
        this.setState({ showError: true });
      }
    }
    renderButton() {
      if (!this.state.showLoading) {
        return (
          <button
            className="btn waves-effect waves-light submit-btn"
            name="action"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        );
      }
    }
    render() {
      return (
        <div className="cardContainer">
            <h1>Encurte seus links.</h1>
            <p>Links são longos. Encurte os links que você deseja compartilhar,<br></br> e acompanhe enquanto viajam através da internet.</p>
          <div>
            <a target="_blank" href={this.state.exUrl}>
              {this.state.exUrl}
            </a>
          </div>
          <input
            name="originalUrl"
            field="originalUrl"
            placeholder="Cole sua Url aqui."
            value={this.state.originalUrl}
            onChange={this.handleUserInput.bind(this)}
          />
          {this.renderButton()}
          {this.state.showApiError && (
            <div className="shorten-error">{this.state.apiError}</div>
          )}
  
          {this.state.showError && (
            <div className="formError">Preencha com a URL corretamente</div>
          )}
  
          <div>
            <h2>Url encurtada</h2>
          </div>
  
          <input
            field="baseUrl"
            name="baseUrl"
            placeholder={this.state.exShortUrl}
            value={this.state.baseUrl}
            onChange={this.handleUserInput.bind(this)}
            disabled
          />
          
          {this.state.showShortenUrl && (
            <div className="shorten-title">
              Shortened Url is {` `}
              <a target="_blank" href={this.state.shortenUrl}>
                {this.state.shortenUrl}
              </a>
            </div>
          )}
        </div>
      );
    }
  }
  
  export default Landing;