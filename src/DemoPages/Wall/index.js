import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions/";

import Profile from "components/wall/Profile/index";
import PostList from "components/wall/PostList/index";
import Interests from "components/wall/Interests/index";
import Photos from "components/wall/Photos/index";
import Friends from "components/wall/Friends/index";
import CustomScrollbars from "util/CustomScrollbars";
import {
  communitiesList,
  friendList,
  interestList,
  photoList,
  postList,
  recentActivity,
  user,
  userInfo
} from "./data";
import Communities from "components/wall/Communities/index";
import { PostProvider, usePostContext } from "./context/PostContext";
import {
  useMutationQuestion,
  useQueryOrganisation,
  useQueryProfile,
  useQueryQuestions
} from "./post.hooks";
import OrganisationList from "./components/OrganisationList";
import Rating from "react-rating";
import {
  Button,
  CardBody,
  CardTitle,
  Card,
  Modal,
  ModalBody,
  Input,
  ModalFooter
} from "reactstrap";
import WidgetHeader from "components/WidgetHeader";
import { IoIosStar } from "react-icons/io";

const QuestionItem = ({ item }) => {
  const { replayQuestion } = useMutationQuestion();
  const [rating, setRating] = React.useState(0);
  const { selectedProject, myRole } = usePostContext();
  function handleClick() {
    replayQuestion({
      fiveId: item?.id,
      rating
    });
  }
  return (
    <Card className="main-card mb-3">
      <CardBody>
        <CardTitle>{item?.question}</CardTitle>

        <Rating
          initialRating={rating}
          stop={5}
          onChange={value => setRating(value)}
          emptySymbol={
            <span className="opacity-5">
              <IoIosStar color="#4eaf07" fontSize="2rem" />
            </span>
          }
          fullSymbol={
            <span>
              <IoIosStar color="#4eaf07" fontSize="2rem" />
            </span>
          }
        />
        {myRole =="MANAGER" && <div className="p-2">
          {item?.reviews?.map(rev => (
            <div className="d-flex flex-column">
              <span>
                {`${rev?.userWall?.lastName} ${rev?.userWall.firstName}`}
              </span>
              <Rating
                initialRating={rev?.rating}
                stop={5}
                onChange={value => setRating(value)}
                emptySymbol={
                  <span className="opacity-5">
                    <IoIosStar color="#4eaf07" fontSize="14px" />
                  </span>
                }
                fullSymbol={
                  <span>
                    <IoIosStar color="#4eaf07" fontSize="14px" />
                  </span>
                }
              />
            </div>
          ))}
        </div>}

        <div className="divider" />
        <div className="text-center">
          <Button color="primary" onClick={handleClick}>
            Save
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const WallQuestion = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const { addQuestion } = useMutationQuestion();
  const { selectedProject, myRole } = usePostContext();
  const { data } = useQueryQuestions(selectedProject);

  function handleOpenModal() {
    setModalOpen(!modalOpen);
  }
  function handleChangeText({ target: { name, value } }) {
    setQuestion(value);
  }
  function handleSubmit() {
    addQuestion({
      input: {
        question,
        project: selectedProject
      }
    });
    setModalOpen(!modalOpen);
  }
  return (
    <div className="jr-entry-sec">
      <Modal isOpen={modalOpen}>
        <ModalBody>
          <Input type="textarea" name="question" onChange={handleChangeText} />
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={handleOpenModal}>
            Cancel
          </Button>
          <Button color="success" onClick={handleSubmit}>
            save
          </Button>
        </ModalFooter>
      </Modal>
      {myRole == "MANAGER" && (
        <div className="mb-1 cursor-pointer" onClick={handleOpenModal}>
          <span>Add Five point</span>
        </div>
      )}

      <div>
        <WidgetHeader title="Five Point Question" />
      </div>

      {data?.map(item => (
        <QuestionItem item={item} />
      ))}
    </div>
  );
};

const WallContainer = ({ match }) => {
  const { data } = usePostContext();
  const { data: organisations } = useQueryOrganisation();
  const { data: profile } = useQueryProfile();
  console.log({ profile });
  return (
    <Fragment>
      <ThemeOptions />
      <AppHeader />
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="jr-main-content">
              <div className="row">
                <div className="d-none d-sm-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <Profile user={profile} userInfo={profile} />
                    <OrganisationList data={organisations} />
                  </CustomScrollbars>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <div className="jr-wall-postlist">
                      <PostList postList={data} user={user} />
                    </div>
                  </CustomScrollbars>
                </div>
                <div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                  <CustomScrollbars className="jr-wall-scroll scrollbar">
                    <WallQuestion />
                  </CustomScrollbars>
                </div>
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
      </div>
    </Fragment>
  );
};
const Wall = () => {
  return (
    <PostProvider>
      <WallContainer />
    </PostProvider>
  );
};
export default Wall;
