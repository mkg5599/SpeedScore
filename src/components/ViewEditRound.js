import React, { useEffect, useState } from "react";
import "../index.css";
import { useRoundsContext } from "../context/RoundsContext";

function ViewEditRound({ currentViewEditId, setCurrentViewEditId }) {
  const { state, dispatch } = useRoundsContext();
  const [currentRoundData, setCurrentRoundData] = useState(null);

  useEffect(() => {
    let currentRound = state?.rounds?.filter(
      (x) => x.roundNum == currentViewEditId
    );
    console.log("current round", currentRound);
    setCurrentRoundData(currentRound[0]);
  }, []);

  useEffect(() => {}, [currentRoundData]);

  const setData = (key, value) => {
    console.log("hhdjs", key, value);
    let currentData = {
      ...currentRoundData,
      [key]: value,
    };
    console.log(currentData);
    setCurrentRoundData(currentData);
  };

  const submitData = () => {
    const updatedData = state?.rounds?.map((item) => {
      if (currentRoundData.roundNum === item?.roundNum) {
        return currentRoundData;
      }
      return item;
    });
    console.log("current round", updatedData);
    dispatch({ type: "UPDATE_ROUND", payload: updatedData });
  };
  return (
    <div
      id="roundsModeDialog"
      class="mode-page-edit action-dialog "
      role="dialog"
      aria-modal="true"
      aria-labelledby="roundFormHeader"
      tabIndex="0"
    >
      <h1 id="roundFormHeader" class="mode-page-header">
        Edit Round
      </h1>
      <p id="roundErrorBox" class="alert alert-danger centered hidden">
        <a id="roundDateError" href="#roundDate" class="alert-link">
          Please enter a valid date
          <br />
        </a>
        <a id="roundCourseError" href="#roundCourse" class="alert-link">
          Please enter a course name having at most 50 characters
          <br />
        </a>
        <a id="roundStrokesError" href="#roundStrokes" class="alert-link">
          Please enter strokes as an integer value between 9 and 200
          <br />
        </a>
        <a id="roundMinutesError" href="#roundMinutes" class="alert-link">
          Please enter minutes as an integer value between 10 and 400
          <br />
        </a>
        <a id="roundSecondsError" href="#roundSeconds" class="alert-link">
          Please enter seconds as an integer value beween 0 and 59
          <br />
        </a>
        <a id="roundNotesError" href="#roundNotes" class="alert-link">
          Please enter notes having at most 500 characters
          <br />
        </a>
      </p>
      <form id="logRoundForm" class="centered">
        <div class="mb-3">
          <label htmlFor="roundDate" class="form-label">
            Date:
            <input
              id="roundDate"
              class="form-control centered"
              type="date"
              aria-describedby="roundDateDescr"
              required
              value={currentRoundData?.date}
              onChange={(e) => setData("date", e.target.value)}
            />
          </label>
          <div id="roundDateDescr" class="form-text">
            Enter a valid date
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="roundCourse" class="form-label">
            Course:
            <input
              id="roundCourse"
              class="form-control centered"
              type="text"
              aria-describedby="roundCourseDescr"
              size="50"
              maxLength="50"
              required
              value={currentRoundData?.course}
              onChange={(e) => setData("course", e.target.value)}
            />
          </label>
          <div id="roundCourseDescr" class="form-text">
            Enter a course name of at most 50 characters
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="roundType">
            Type:
            <select
              name="roundType"
              id="roundType"
              class="form-control centered"
              defaultValue={currentRoundData?.type}
              onChange={(e) => setData("type", e.target.value)}
            >
              <option value="practice">Practice</option>
              <option value="tournament">Tournament</option>
            </select>
          </label>
        </div>
        <div class="mb-3">
          <label htmlFor="roundHoles">
            Holes:
            <select
              name="roundHoles"
              id="roundHoles"
              class="form-control centered"
              defaultValue={currentRoundData?.holes}
              onChange={(e) => setData("holes", e.target.value)}
            >
              <option value="9">9</option>
              <option value="18">18</option>
            </select>
          </label>
        </div>
        <div class="mb-3">
          <label htmlFor="roundStrokes">
            Strokes:
            <input
              id="roundStrokes"
              class="form-control centered"
              type="number"
              min="9"
              max="200"
              value={currentRoundData?.strokes}
              aria-describedby="roundStrokesDescr"
              onChange={(e) => setData("strokes", e.target.value)}
              required
            />
          </label>
          <div id="roundStrokesDescr" class="form-text">
            Enter a strokes value between 9 and 200
          </div>
        </div>
        <div class="mb-3">
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
          <div id="roundTimeDescr" class="form-text">
            Enter a minutes value between 10 and 400, and a seconds value
            between 0 and 59
          </div>
        </div>
        <div class="mb-3">
          <label htmlFor="roundSGS">
            Speedgolf Score:
            <br />
            <input
              id="roundSGS"
              class="form-control centered"
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
        <div class="mb-3">
          <label htmlFor="roundNotes">
            Notes:
            <br />
            <textarea
              id="roundNotes"
              class="form-control"
              aria-describedby="roundNotesDescr"
              rows="6"
              cols="75"
              maxLength="500"
              onChange={(e) => setData("notes", e.target.value)}
              value={currentRoundData?.notes}
            ></textarea>
          </label>
          <div id="roundNotesDescr" class="form-text">
            Enter optional round notes of up to 500 characters
          </div>
        </div>
        <div class="mode-page-btn-container">
          <button
            id="roundFormSubmitBtn"
            class="mode-page-btn action-dialog action-button"
            type="submit"
            onClick={() => submitData()}
          >
            <span id="roundFormSubmitBtnIcon" class="fa fa-save"></span>
            <span id="roundFormSubmitBtnLabel">&nbsp;Edit Round</span>
          </button>
          <button
            id="roundsModeLogCancelBtn"
            class="mode-page-btn-cancel action-dialog cancel-button"
            type="button"
            onClick={() => setCurrentViewEditId(0)}
          >
            <span class="fa fa-window-close"></span>&nbsp;Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ViewEditRound;
