import React, { Component } from "react";
import JCards from "./JobsCards";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Autosuggest from "react-autosuggest";
import Fade from "react-reveal/Fade";
import "bootstrap/dist/css/bootstrap.min.css";
import "./jobs.css";
import Slide from "react-reveal/Slide";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./SliderComponent";
import Jobs from "../Images/jobs.png";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { localhost } from "../GlobalVars";

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: localStorage.usertoken
        ? jwt_decode(localStorage.usertoken).user._id
        : null,
      userRole: localStorage.usertoken
        ? jwt_decode(localStorage.usertoken).user.role
        : null,
      showColContent: null,
      showCol: false,
      currentJob: null,
      jobBudgets: [],
      jobSkill: [],
      domain: [],
      jobs: [],
      jobFilter: [],
      sliderHandlesVal: [],
      tech: [],
      value: "",
      suggestions: [],
      todo: "",
      todos: [].map((text, id) => ({ id, text }))
    };
    this.state.id = this.state.todos.length;
  }

  componentDidMount = () => {
    Axios.get(`${localhost}/job`)
      .then(j => {
        if (j.data.length > 0) {
          var technologies = [];

          j.data.forEach(item => {
            item.technologies.map(tech => {
              if (!technologies.includes(tech)) {
                technologies.push(tech);
              }
            });
          });

          var max_val = Math.max.apply(
            Math,
            j.data.map(item => {
              return item.budget;
            })
          );
          var maxNum = this.maxDigit(max_val);
          var domain = [0, maxNum];

          const defaultValues = [0, maxNum];

          this.setState({
            tech: technologies,
            sliderHandlesVal: defaultValues,
            domain: domain,
            jobs: j.data,
            jobFilter: j.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  //auto suggestion + filtering functions
  onChangeInput = (event, { newValue }) => {
    this.setState({ value: newValue, todo: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: this.getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.tech.filter(
          tech => tech.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => <div>{suggestion}</div>;

  add = async event => {
    event.preventDefault();
    await this.setState({
      id: this.state.id + 1,
      todos: [
        ...this.state.todos,
        { id: this.state.id, text: this.state.todo || "-" }
      ],
      todo: ""
    });

    var filteredJobs = [];
    this.state.jobs.forEach(item => {
      this.state.todos.some(val => {
        if (item.technologies.indexOf(val.text) !== -1) {
          if (!filteredJobs.includes(item)) {
            filteredJobs.push(item);
          }
        }
      });
    });

    if (this.state.jobBudgets.length > 0) {
      if (this.state.jobBudgets !== this.state.jobs)
        filteredJobs = filteredJobs.filter(value =>
          this.state.jobBudgets.includes(value)
        );
    }
    this.setState({ jobFilter: filteredJobs, jobSkill: filteredJobs });
  };

  remove = async event => {
    await this.setState({
      todos: this.state.todos.filter(
        item => item.id !== +event.currentTarget.getAttribute("data-id")
      )
    });

    if (this.state.todos.length > 0) {
      var filteredJobs = [];
      this.state.jobs.forEach(item => {
        this.state.todos.some(val => {
          if (item.technologies.indexOf(val.text) !== -1) {
            if (!filteredJobs.includes(item)) {
              filteredJobs.push(item);
            }
          }
        });
      });
      this.setState({ jobFilter: filteredJobs });
    } else {
      this.setState({ jobFilter: this.state.jobs });
    }
  };

  //slider range functions
  pad = (n, width, z) => {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
  };

  maxDigit = maxNum => {
    var digits = maxNum.toString().length;
    var divideBy = this.pad(1, digits);

    if (maxNum % divideBy != 0) {
      var roundedNum = Math.floor(maxNum / divideBy + 1) * divideBy;
      return roundedNum;
    } else {
      return maxNum;
    }
  };

  onChange = val => {
    this.setState({ sliderHandlesVal: val });
    var temp = this.state.jobs.filter(item => {
      if (val[0] <= item.budget && item.budget <= val[1]) {
        return item;
      }
    });

    if (this.state.jobSkill.length > 0) {
      temp = temp.filter(value => this.state.jobSkill.includes(value));
    }

    this.setState({ jobFilter: temp, jobBudgets: temp });
  };

  ///show the details column
  showDetails = item => {
    var showColContent = <p>{item.title}</p>;
    this.setState({ showColContent, showCol: true, currentJob: item });
  };

  //apply for the job
  applyForJob = () => {
    Axios.put(`${localhost}/job/addreq/${this.state.currentJob._id}`, {
      requests: this.state.userID
    })
      .then(result => {
        alert(result.data);

        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChangeInput
    };

    return (
      <Container>
        <div>
          <Slide top>
            <h1 className="textBackground">Careers</h1>
            <div className="textCareer">
              <p>
                Toptal is a marketplace for top developers, engineers,
                programmers, coders, architects, and consultants. Top companies
                and start-ups hire freelance developers from Toptal for their
                most mission-critical projects. When you join The DDW Company,
                you are choosing to be a part of something far bigger than you
                can even imagine. TRSDC is pioneering the future of sustainable
                tourism, creating a new standard of sustainable luxury tourism
                and immersive experiences.
              </p>
            </div>
          </Slide>
        </div>

        <div className="arroww">
          <div className="arrow">
            <span></span>
            <span></span>
          </div>
        </div>

        <img
          className="imgBackground"
          style={{ height: "100%", width: "100%" }}
          src={Jobs}
          alt="Portfolio"
        />

        {this.state.jobs.length > 0 && (
          <Row>
            <Col md={3} className="filterStyle">
              <br />
              <h4>Budget</h4>

              {this.state.sliderHandlesVal.length !== 0 &&
                this.state.domain !== 0 && (
                  <Slider
                    mode={2}
                    step={1}
                    domain={this.state.domain}
                    rootStyle={{
                      position: "relative",
                      width: "100%"
                    }}
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    values={this.state.sliderHandlesVal}
                  >
                    <Rail>
                      {({ getRailProps }) => (
                        <SliderRail getRailProps={getRailProps} />
                      )}
                    </Rail>
                    <Handles>
                      {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                          {handles.map(handle => (
                            <Handle
                              key={handle.id}
                              handle={handle}
                              domain={this.state.domain}
                              getHandleProps={getHandleProps}
                            />
                          ))}
                        </div>
                      )}
                    </Handles>
                    <Tracks left={false} right={false}>
                      {({ tracks, getTrackProps }) => (
                        <div className="slider-tracks">
                          {tracks.map(({ id, source, target }) => (
                            <Track
                              key={id}
                              source={source}
                              target={target}
                              getTrackProps={getTrackProps}
                            />
                          ))}
                        </div>
                      )}
                    </Tracks>
                    <Ticks count={5}>
                      {({ ticks }) => (
                        <div className="slider-ticks">
                          {ticks.map(tick => (
                            <Tick
                              key={tick.id}
                              tick={tick}
                              count={ticks.length}
                            />
                          ))}
                        </div>
                      )}
                    </Ticks>
                  </Slider>
                )}
              <br />
              <br />

              <h4>Skills</h4>
              {this.state.tech.length > 0 && (
                <form onSubmit={this.add} autoComplete="off">
                  <div className="col-12 mb-2">
                    <TransitionGroup>
                      {this.state.todos.map(item => (
                        <Fade key={item.id} collapse bottom>
                          <div className="card">
                            <div className="card-body justify-content-between">
                              {item.text}
                              <button
                                data-id={item.id}
                                onClick={this.remove}
                                type="button"
                                className="close"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          </div>
                        </Fade>
                      ))}
                    </TransitionGroup>
                  </div>
                  <Row>
                    <Autosuggest
                      style={{ background: "red" }}
                      type="text"
                      id="todoField"
                      name="todo"
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                    />

                    <div className="input-group-append buttonThing ">
                      <button
                        onClick={this.add}
                        className="btn btn-light"
                        type="button"
                      >
                        {" "}
                        Add Item
                      </button>
                    </div>
                  </Row>
                </form>
              )}
            </Col>

            <Col className="cardJob" md={this.state.showCol ? 5 : 7}>
              {this.state.jobFilter.map(item => {
                return <JCards data={item} showDetails={this.showDetails} />;
              })}
            </Col>

            {this.state.showCol !== false && this.state.currentJob != null && (
              <Col md={3} className="applyCard" style={{ height: "30%" }}>
                <Fade left>
                  <div>
                    <p>{this.state.currentJob.title}</p>
                    <p>{this.state.currentJob.descreption}</p>
                    {this.state.currentJob.budget}
                    {this.state.currentJob.technologies.forEach(item => (
                      <p>{item}</p>
                    ))}

                    {this.state.userRole == 1 &&
                      this.state.currentJob.dev_id != this.state.userID &&
                      !this.state.currentJob.requests.includes(
                        this.state.userID
                      ) && (
                        <Button variant="primary" onClick={this.applyForJob}>
                          Apply
                        </Button>
                      )}

                    {this.state.userRole == 1 &&
                      this.state.currentJob.requests &&
                      this.state.currentJob.requests.includes(
                        this.state.userID
                      ) && (
                        <Button variant="primary" disabled>
                          Already applied
                        </Button>
                      )}

                    {this.state.currentJob.dev_id == this.state.userID && (
                      <Button variant="primary" disabled>
                        Already applied
                      </Button>
                    )}
                  </div>
                </Fade>
              </Col>
            )}
          </Row>
        )}
      </Container>
    );
  }
}
