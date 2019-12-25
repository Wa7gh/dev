import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Linkedin from "../Images/linkedin.svg";
import twitter from "../Images/twitter.svg";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Github from "../Images/github.png";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typical from "react-typical";
import { Figure } from "react-bootstrap";
import UserProject from "../Components/userProject";
import axios from "axios";
import { localhost } from "../GlobalVars";

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const drawerWidth = 480;
const useStyles = makeStyles(theme => ({
  drawerPaper: { width: drawerWidth }
}));

export default function Portfolio(props) {
  const [userInfo] = useState([]);
  const [userInfoExra, setUserInfoExra] = useState([]);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${localhost}/user/username/${props.match.params.username}`)
      .then(result => {
        axios
          .get(`${localhost}/project/developer/${result.data._id}`)
          .then(projects => {
            setUserProjects(projects.data);
          })
          .catch(err => console.log(err));

        axios
          .get(`${localhost}/UserInfoRoutes/${result.data._id}`)
          .then(rr => {
            setUserInfoExra(rr.data[0]);
          })
          .catch(err => console.log(err));
      });
  }, []);

  const myRef = useRef(null);

  const [showText, setShowText] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {userInfo && userInfoExra && (
        <div className="prot">
          <img className="prtimgUser" src={userInfoExra.img} alt="Portfolio" />
          <Typical
            className="textStyle"
            steps={["Hello", 1000, "Hello I'm", 5000]}
            loop={Infinity}
            wrapper="p"
          />
          <p className="textStyle1">
            {userInfo.firstname} {userInfo.lastname}
          </p>
          <p className="textStyle2">{userInfoExra.jobPosition}</p>

          <p className="textStyle3">{userInfoExra.brandstatment}</p>
          <div className="aStyle">
            <a href={userInfoExra.github} target="_blank">
              {" "}
              <img src={Github} alt="boy" />
            </a>
            <a href={userInfoExra.linkdin} target="_blank">
              {" "}
              <img src={Linkedin} alt="boy" />
            </a>
            <a href={userInfoExra.twitter} target="_blank">
              {" "}
              <img src={twitter} alt="boy" />
            </a>
          </div>

          <div className="profil">
            <Toolbar className="tStyle">
              <Link onClick={handleDrawerOpen} className={clsx("profileLink")}>
                About Me |{" "}
              </Link>

              <Link
                className="profileLink"
                onClick={() => {
                  setShowText(!showText);
                  setTimeout(() => {
                    if (!showText) {
                      scrollToRef(myRef);
                    }
                  }, 500);
                }}
              >
                {" "}
                My Projects{" "}
              </Link>
            </Toolbar>
          </div>

          <main
            className={clsx(classes.content, { [classes.contentShift]: open })}
          >
            <div />
          </main>
          <Drawer
            variant="persistent"
            anchor="right"
            open={open}
            classes={{ paper: classes.drawerPaper }}
          >
            <div>
              <h1 onClick={handleDrawerClose} className="goBack">
                {" "}
                {"<"}{" "}
              </h1>
            </div>

            <List>
              <Figure.Image
                className="imgProfile"
                width={171}
                height={180}
                alt="171x180"
                src={userInfoExra.img}
                roundedCircle
              />{" "}
              <br />
              <Divider />
              <p className="tSpacing">Education : </p>
              <br />
              <p className="tSpacing">{userInfoExra.brandstatment}</p>
              <Divider />
            </List>
          </Drawer>
        </div>
      )}

      {showText && (
        <div ref={myRef}>
          <div className="projectCards">
            {userProjects.length > 0 ? (
              userProjects.map(e => {
                return <UserProject ele={e} />;
              })
            ) : (
              <h1>No projects found</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
