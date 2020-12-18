import { ListItem } from "@material-ui/core";
import React from "react";
import { ChevronDown, Divide } from "react-feather";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { ChevronRight } from "react-feather";
import { usePostContext } from "../context/PostContext";
const UserAvatar = ({ fullName }) => {
  const [first, last] = fullName.split(" ");
  return (
    <div
      className="bg-white d-flex justify-content-center align-items-center"
      style={{
        borderRadius: "20px",
        height: "40px",
        width: "40px",
        border: "1px solid #000",
        backgroundColor: "#737373 !important"
      }}
    >
      <div>
        <span className="h6">{first[0]}</span>{" "}
        <span className="h6">{last[0]}</span>
      </div>
    </div>
  );
};
const UsersWallItem = ({ fullName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <ListItem
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex align-items-center mt-1"
        style={{
          backgroundColor:"#f1f1f1",
          borderRadius:"7px"
        }}
      >
        <UserAvatar fullName={fullName} />{" "}
        <span className="ml-1 font-bold" style={{ fontSize: "13px" }}>
          {fullName}
        </span>
      </ListItem>
    </>
  );
};
const ProjectItem = ({ id, name, usersWall, myRole }) => {
  const { handleSelectedProject } = usePostContext();
  const [isOpen, setIsOpen] = React.useState(false);
  function handleClickProject() {
    handleSelectedProject({ id, myRole });
    setIsOpen(!isOpen);
  }
  return (
    <>
      <ListItem
        onClick={handleClickProject}
        className="d-flex align-items-center justify-content-between"
      >
        <span>{name}</span>

        {!isOpen ? (
          <ChevronRight color="black" size={15} />
        ) : (
          <ChevronDown color="black" size={15} />
        )}
      </ListItem>
      <Collapse isOpen={isOpen}>
        <div className="pl-1">
          {usersWall?.map(user => (
            <UsersWallItem {...user} />
          ))}
        </div>
      </Collapse>
    </>
  );
};

const LevelItem = ({ name, projects }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <ListItem
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex align-items-center justify-content-between"
      >
        <span>{name}</span>

        <div>
          <div className="badge badge-success">{projects?.length}</div>
          {!isOpen ? (
            <ChevronRight color="black" size={15} />
          ) : (
            <ChevronDown color="black" size={15} />
          )}
        </div>
      </ListItem>
      <Collapse isOpen={isOpen}>
        <div className="pl-1">
          <div className="no-border p-1">
            {projects?.map(level => (
              <ProjectItem {...level} />
            ))}
          </div>
        </div>
      </Collapse>
    </>
  );
};

const OrganisationItem = ({ name, levels }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <>
      <ListItem
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex align-items-center justify-content-between"
      >
        <span>{name}</span>
        <div>
          {!isOpen ? (
            <ChevronRight color="black" size={15} />
          ) : (
            <ChevronDown color="black" size={15} />
          )}
        </div>
      </ListItem>
      <Collapse isOpen={isOpen}>
        <div className="pl-1">
          <div className="no-border p-1">
            {levels?.map(level => (
              <LevelItem {...level} />
            ))}
          </div>
        </div>
      </Collapse>
    </>
  );
};
export default function OrganisationList({ data }) {
  return (
    <div className="bg-white rounded jr-card">
      {data?.map(org => (
        <OrganisationItem {...org} />
      ))}
    </div>
  );
}
