import React from "react";
import { Parallax } from "react-parallax";
import { Spring } from "react-spring/renderprops";
import Map from "../Images/homepage-banner-static-map.svg";
import img1 from "../Images/img1.png";
import img3 from "../Images/footer.png";
import img4 from "../Images/freelancer.png";
import MeetUp from "../Images/MeetUp.png";
import Postjobs from "../Images/careers.jpg";
import { Link } from "react-router-dom";
import Linkedin from "../Images/linkedin.svg";
import youtube from "../Images/youtube.svg";
import twitter from "../Images/twitter.svg";
import facebook from "../Images/facebook.svg";
import Github from "../Images/github.png";
import free from "../Images/free.png";
import Slider from "react-animated-slider";
import "./slider-animations.css";
import "./styless.css";
import "react-animated-slider/build/horizontal.css";
import "../App.css";
import portfolio from "../Images/portfolio.png";
import { Card } from "react-bootstrap";

const styles = { fontFamily: "sans-serif", textAlign: "center" };
const brandStyles = {
  fontFamily: "sans-serif",
  color: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "35%",
  transform: "translate(-50%,-50%)"
};
const DwwStyles = {
  fontFamily: "sans-serif",
  color: "white",
  padding: 20,
  position: "absolute",
  size: "20%",
  top: "10%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};

const content = [
  {
    title: "All in one account No more duct tape!",
    description:
      " Your online business requires a bunch of different solutions that must be duct-taped together, often leading to frustrating results. You know the pain: your checkout page won't add your customers into your mailing list, or your helpdesk portal won't connect with your contacts database, or your membership site won't revoke access when a user refunds payment, etc. Utterly frustrating, and a huge waste of time... until now!."
  },
  {
    title: "Awesome for the pro... Great for every Joe!",
    description:
      "DDW's incredible flexible and robust engine will empower you to create the most advanced, customized and complex sales funnels and automated marketing campaigns you can dream of. Whatever your genius comes up with, Kartra will materialize it into reality!."
  },
  {
    title: "Phasellus volutpat metus",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula."
  }
];

export const Landingpage = () => {
  return (
    <div style={styles}>
      <Parallax bgImage={img1} strength={500}>
        <div style={{ height: 850 }}>
          <div style={brandStyles}>
            <h2 className="fontstyle">
              Our all-in-one platform gives you everything you need to run your
              Job
            </h2>
            <br />
            {localStorage.usertoken ? null : (
              <div className="hov">
                <Link className="link" to="/Signup-emp">
                  I want to Hire{" "}
                </Link>
                <Link className="link1" to="/RegisterDev">
                  I want to Work{" "}
                </Link>
              </div>
            )}
          </div>
          <img className="map" src={Map} alt="boy" />
          <div className="num">
            <Spring from={{ number: 0 }} to={{ number: 3000000 }}>
              {props => <div>{props.number}</div>}
            </Spring>

            <h1 className="fontstylesaudi">saudi Programmers</h1>
          </div>
        </div>
      </Parallax>

      <Parallax blur={{ min: -1, max: 3 }}>
        <div style={{ height: 720 }}>
          <div className="free">
            <Card style={{ width: "18rem", height: "21rem" }}>
              <Card.Img variant="top" className="imgLandpage" src={Postjobs} />
              <Card.Body>
                <Card.Title className="fontstyle">Post a job</Card.Title>
                <Card.Text className="fontstyleInsideCard">
                  It's easy. Simply post a job you need completed and receive
                  competitive bids from freelancers within minutes.
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem", height: "21rem" }}>
              <Card.Img variant="top" className="imgLandpage" src={free} alt = " " />
              <Card.Body>
                <Card.Title className="fontstyle">
                  Choose freelancers
                </Card.Title>
                <Card.Text className="fontstyleInsideCard">
                  Whatever your needs, there will be a freelancer to get it
                  done: from web design, mobile app development, virtual
                  assistants, product manufacturing, and graphic design (and a
                  whole lot more).
                </Card.Text>
              </Card.Body>
            </Card>

            <Card style={{ width: "18rem", height: "21rem" }}>
              <Card.Img variant="top" className="imgLandpage" src={portfolio} />
              <Card.Body>
                <Card.Title className="fontstyle">Portfolio</Card.Title>
                <Card.Text className="fontstyleInsideCard">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: "18rem", height: "21rem" }}>
              <Card.Img variant="top" className="imgLandpage" src={MeetUp} />
              <Card.Body>
                <Card.Title className="fontstyle">MeetUp</Card.Title>
                <Card.Text className="fontstyleInsideCard">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </div>
        </div>
      </Parallax>
      <h1 className="divider">| | |</h1>
      <Parallax bgImage={img4} strength={200}>
        <div style={{ height: 740 }}>
          <div style={DwwStyles}>
            <h2 className="DDw">So... What makes DDW so different?</h2> <br />
          </div>

          <Slider className="slider-wrapper">
            {content.map((item, index) => (
              <div key={index} className="slider-content">
                <div className="inner">
                  <h1>{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Parallax>
      <h1 className="divider">| | |</h1>
      <h1 className="divider">| | |</h1>

      <Parallax
        bgImage={img3}
        strength={200}
        renderLayer={percentage => (
          <div>
            <div className="footerStyle">
              <Link to="/">
                {" "}
                <img src={Github} alt="boy" />{" "}
              </Link>
              <Link to="/">
                {" "}
                <img src={Linkedin} alt="boy" />{" "}
              </Link>
              <Link to="/">
                {" "}
                <img src={youtube} alt="boy" />{" "}
              </Link>
              <Link to="/">
                {" "}
                <img src={twitter} alt="boy" />{" "}
              </Link>
              <Link to="/">
                {" "}
                <img src={facebook} alt="boy" />{" "}
              </Link>
            </div>
          </div>
        )}
      >
        <div style={{ height: 500 }}>
          <h1 className="logoDDW">DDW</h1>
          <p className="copy ">© 2020, The DDW Company. All rights reserved.</p>
        </div>
        <div className="footer">
          <p>Terms & Conditions | Privacy policy</p>
          <p> Jeddah 12382 – 6726, Saudi Arabia </p>
          <p>Careers | Newsroom</p>
        </div>
      </Parallax>
      <div />
    </div>
  );
};
export default Landingpage;
