import React, { useEffect, useState } from "react";
import "../index.css";
import { useRoundsContext } from "../context/RoundsContext";

function ViewEditRound({
  currentViewEditId,
  setCurrentViewEditId,
  setUpdatedRound,
}) {
  const { state, dispatch } = useRoundsContext();
  const [currentRoundData, setCurrentRoundData] = useState(null);
  const [errors, setErrors] = useState({});
  const [distanceUnitKms, setDistanceUnitKms] = useState(false);

  useEffect(() => {
    let currentRound = state?.rounds
      ?.filter((x) => x.roundNum == currentViewEditId)
      .map((round) => ({
        ...round,
        distance: round.distance / 5280,
      }));

    setCurrentRoundData(currentRound[0]);
  }, []);

  useEffect(() => {}, [currentRoundData, errors]);

  const setData = (key, value) => {
    let currentData = {
      ...currentRoundData,
      [key]: value,
    };
    setCurrentRoundData(currentData);
  };

  const scrollToError = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateData = async (tempData) => {
    let formErrors = {};
    if (tempData.course?.length < 1 || tempData.course?.length > 50) {
      formErrors.course = true;
    } else if (
      parseInt(tempData?.strokes) < 9 ||
      parseInt(tempData?.strokes) > 200 ||
      tempData?.strokes == ""
    ) {
      formErrors.strokes = true;
    } else if (
      parseInt(tempData.minutes) < 10 ||
      parseInt(tempData.minutes) > 400 ||
      tempData?.minutes == ""
    ) {
      formErrors.minutes = true;
    } else if (
      parseInt(tempData.seconds) < 0 ||
      parseInt(tempData.seconds) > 59 ||
      tempData?.seconds == ""
    ) {
      formErrors.seconds = true;
    } else if (
      tempData?.distance == "" ||
      parseFloat(tempData.distance) < 0.01 ||
      parseFloat(tempData.distance) > (distanceUnitKms ? 100 : 62)
    ) {
      formErrors.distance = true;
    } else if (tempData.notes > 500) {
      formErrors.strokes = true;
    }
    if (Object?.keys(formErrors)?.length > 0) {
      setErrors(formErrors);
      scrollToError();
      return false;
    }
    return true;
  };

  const submitData = async (e) => {
    e.preventDefault();
    setErrors({});
    let tmp = await validateData(currentRoundData);
    if (tmp) {
      currentRoundData["SGS"] =
        parseInt(currentRoundData?.minutes) +
        parseInt(currentRoundData?.strokes) +
        ":" +
        currentRoundData?.seconds;
      currentRoundData["distance"] = distanceUnitKms
        ? parseFloat(currentRoundData.distance) * 3280.84
        : parseFloat(currentRoundData.distance) * 5280;
      const updatedDataRounds = state?.rounds?.map((item) => {
        if (currentRoundData.roundNum === item?.roundNum) {
          return currentRoundData;
        }
        return item;
      });
      await dispatch({ type: "UPDATE_ROUND", payload: updatedDataRounds });
      setUpdatedRound(true);
      setCurrentViewEditId(0);
    }
  };

  const distanceConverter = async (value) => {
    if (value != "") {
      if (distanceUnitKms) {
        await setData("distance", parseFloat(value) * 0.62);
        return;
      }
      await setData("distance", parseFloat(value) * 1.61290323);
    }
    return;
  };

  return (
    <div
      id="roundsModeDialog"
      className="mode-page-edit action-dialog "
      role="dialog"
      aria-modal="true"
      aria-labelledby="roundFormHeader"
      tabIndex="0"
    >
      {Object?.keys(errors)?.length > 0 ? (
        <>
          <p id="roundErrorBox" className="alert alert-danger centered ">
            {errors?.course ? (
              <a
                id="roundCourseError"
                href="#roundCourse"
                className="alert-link"
              >
                Please enter a course name having at most 50 characters
                <br />
              </a>
            ) : null}
            {errors?.strokes ? (
              <a
                id="roundStrokesError"
                href="#roundStrokes"
                className="alert-link"
              >
                Please enter strokes as an integer value between 9 and 200
                <br />
              </a>
            ) : null}
            {errors?.minutes ? (
              <a
                id="roundMinutesError"
                href="#roundMinutes"
                className="alert-link"
              >
                Please enter minutes as an integer value between 10 and 400
                <br />
              </a>
            ) : null}
            {errors?.seconds ? (
              <a
                id="roundSecondsError"
                href="#roundSeconds"
                className="alert-link"
              >
                Please enter seconds as an integer value beween 0 and 59
                <br />
              </a>
            ) : null}
            {errors?.distance ? (
              <a
                id="roundDistanceError"
                href="#roundDistance"
                className="alert-link"
              >
                Please enter a distance value beween 0.10 and 62 miles (100 km)
                <br />
              </a>
            ) : null}
            {errors?.notes ? (
              <a id="roundNotesError" href="#roundNotes" className="alert-link">
                Please enter notes having at most 500 characters
                <br />
              </a>
            ) : null}
          </p>
        </>
      ) : null}
      <h1 id="roundFormHeader" className="mode-page-header">
        Edit Round
      </h1>
      <form id="logRoundForm" className="centered" noValidate>
        <div className="mb-3">
          <label htmlFor="roundDate" className="form-label">
            Date:
            <input
              id="roundDate"
              className="form-control centered"
              type="date"
              aria-describedby="roundDateDescr"
              required
              value={currentRoundData?.date}
              onChange={(e) => setData("date", e.target.value)}
            />
          </label>
          <div id="roundDateDescr" className="form-text">
            Enter a valid date
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roundCourse" className="form-label">
            Course:
            <input
              id="roundCourse"
              className="form-control centered"
              type="text"
              aria-describedby="roundCourseDescr"
              size="50"
              maxLength="50"
              required
              value={currentRoundData?.course}
              onChange={(e) => setData("course", e.target.value)}
            />
          </label>
          <div id="roundCourseDescr" className="form-text">
            Enter a course name of at most 50 characters
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roundType">
            Type:
            <select
              name="roundType"
              id="roundType"
              className="form-control centered"
              defaultValue={currentRoundData?.type}
              onChange={(e) => setData("type", e.target.value)}
            >
              <option value="practice">Practice</option>
              <option value="tournament">Tournament</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="roundHoles">
            Holes:
            <select
              name="roundHoles"
              id="roundHoles"
              className="form-control centered"
              defaultValue={currentRoundData?.holes}
              onChange={(e) => setData("holes", e.target.value)}
            >
              <option value="9">9</option>
              <option value="18">18</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="roundStrokes">
            Strokes:
            <input
              id="roundStrokes"
              className="form-control centered"
              type="number"
              min="9"
              max="200"
              value={currentRoundData?.strokes}
              aria-describedby="roundStrokesDescr"
              onChange={(e) => setData("strokes", e.target.value)}
              required
            />
          </label>
          <div id="roundStrokesDescr" className="form-text">
            Enter a strokes value between 9 and 200
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roundTime">
            Time:
            <br />
            <input
              id="roundMinutes"
              type="number"
              size="3"
              aria-describedby="roundTimeDescr"
              min="10"
              max="400"
              value={currentRoundData?.minutes}
              //style="text-align: right"
              onChange={(e) => setData("minutes", e.target.value)}
              required
            />
            :
            <input
              id="roundSeconds"
              type="number"
              size="2"
              aria-describedby="roundTimeDescr"
              min="0"
              max="60"
              value={currentRoundData?.seconds}
              //onChange="changeSeconds()"
              onChange={(e) => setData("seconds", e.target.value)}
              required
            />
          </label>
          <div id="roundTimeDescr" className="form-text">
            Enter a minutes value between 10 and 400, and a seconds value
            between 0 and 59
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roundSGS">
            Speedgolf Score:
            <br />
            <input
              id="roundSGS"
              className="form-control centered"
              type="text"
              size="6"
              value={
                parseInt(currentRoundData?.minutes) +
                parseInt(currentRoundData?.strokes) +
                ":" +
                currentRoundData?.seconds
              }
              disabled
            />
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="roundDistance">
            Distance:
            <br />
            <input
              id="roundDistance"
              className="form-control centered"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={parseFloat(currentRoundData?.distance).toFixed(2)}
              onChange={(e) => setData("distance", e.target.value)}
              //style={{ width: "100px" }}
            />
          </label>
        </div>
        <div className="mb-3">
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Miles
            </label>
            <div
              className="form-check form-switch"
              style={{ marginLeft: "5px" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={distanceUnitKms}
                onChange={() => {
                  setDistanceUnitKms((prev) => !prev);
                  distanceConverter(currentRoundData?.distance);
                }}
              />
            </div>
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Kilometers
            </label>
          </div>

          <div id="roundDistanceDescr" className="form-text">
            Enter a distance value (in miles or km) between 0.01 and 62 miles
            (100 km)
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="roundNotes">
            Notes:
            <br />
            <textarea
              id="roundNotes"
              className="form-control"
              aria-describedby="roundNotesDescr"
              rows="6"
              cols="75"
              maxLength="500"
              onChange={(e) => setData("notes", e.target.value)}
              value={currentRoundData?.notes}
            ></textarea>
          </label>
          <div id="roundNotesDescr" className="form-text">
            Enter optional round notes of up to 500 characters
          </div>
        </div>
        <div className="mode-page-btn-container">
          <button
            id="roundFormSubmitBtn"
            className="mode-page-btn action-dialog action-button"
            type="submit"
            onClick={(e) => submitData(e)}
          >
            <span id="roundFormSubmitBtnIcon" className="fa fa-save"></span>
            <span id="roundFormSubmitBtnLabel">&nbsp;Edit Round</span>
          </button>
          <button
            id="roundsModeLogCancelBtn"
            className="mode-page-btn-cancel action-dialog cancel-button"
            type="button"
            onClick={() => setCurrentViewEditId(0)}
          >
            <span className="fa fa-window-close"></span>&nbsp;Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewEditRound;
