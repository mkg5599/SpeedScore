import React, { useEffect, useState } from "react";
import { useRoundsContext } from "../context/RoundsContext";
import ViewEditRound from "../components/ViewEditRound";
import "../index.css";
import AddRound from "../components/AddRound";

function RoundsListing() {
  const { state, dispatch } = useRoundsContext();
  const [currentViewEditId, setCurrentViewEditId] = useState(0);
  const [newRound, setNewRound] = useState(false);
  const [updatedRound, setUpdatedRound] = useState(false);
  const [addedRound, setAddedRound] = useState(false);

  console.log("rounds listing page", state);
  useEffect(() => {
    console.log("Inside Use Effect at line 10", currentViewEditId);
  }, [currentViewEditId]);
  return (
    <>
      {currentViewEditId && currentViewEditId > 0 ? (
        <ViewEditRound
          currentViewEditId={currentViewEditId}
          setCurrentViewEditId={setCurrentViewEditId}
          setUpdatedRound={setUpdatedRound}
        />
      ) : (
        <>
          {!newRound ? (
            <div>
              <h1 className="mode-page-header">Rounds</h1>
              {updatedRound || addedRound ? (
                <div
                  id="roundUpdated"
                  className="toast-container "
                  role="alert"
                  aria-atomic="true"
                  aria-live="assertive"
                >
                  <div id="roundUpdatedMsg" className="toast-text">
                    {updatedRound ? "Round Updated" : "Added Round"}
                  </div>
                  <button
                    id="roundUpdatedClose"
                    type="button"
                    className="btn-close toast-close"
                    aria-label="Close"
                    onClick={() => {
                      updatedRound
                        ? setUpdatedRound(false)
                        : setAddedRound(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              ) : null}
              <table id="roundsTable" className="table table-hover">
                <caption id="roundsTableCaption" aria-live="polite">
                  Rounds Table
                </caption>
                <thead className="table-light">
                  <tr>
                    <th
                      scope="col"
                      role="columnheader"
                      className="sortable-header cell-align-middle"
                      aria-sort="none"
                    >
                      <button
                        className="btn bg-transparent table-sort-btn"
                        aria-label="Sort ascending by date"
                      >
                        <span className="fas fa-sort sort-icon"></span>
                      </button>
                      Date
                    </th>
                    <th
                      scope="col"
                      role="columnheader"
                      className="sortable-header cell-align-middle"
                      aria-sort="none"
                    >
                      <button
                        className="btn bg-transparent table-sort-btn"
                        aria-label="Sort ascending by course"
                      >
                        <span className="fas fa-sort sort-icon"></span>
                      </button>
                      Course
                    </th>
                    <th
                      scope="col"
                      role="columnheader"
                      className="sortable-header cell-align-middle"
                      aria-sort="none"
                    >
                      <button
                        className="btn bg-transparent table-sort-btn"
                        aria-label="Sort ascending by score"
                      >
                        <span className="fas fa-sort sort-icon"></span>
                      </button>
                      Score
                    </th>
                    <th scope="col" className="cell-align-middle">
                      View/Edit...
                    </th>
                    <th scope="col" className="cell-align-middle">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state?.rounds.length > 0 &&
                    state?.rounds?.map((item) => (
                      <tr key={item.roundNum}>
                        <td>{item.date}</td>
                        <td>{item.course}</td>
                        <td>
                          {item.SGS +
                            " (" +
                            item.strokes +
                            " in " +
                            item.minutes +
                            ":" +
                            item.seconds +
                            ")"}
                        </td>
                        <td>
                          <button
                            aria-label="View and Edit Round"
                            onClick={() => setCurrentViewEditId(item.roundNum)}
                          >
                            <span className="fas fa-eye"> </span>&nbsp;
                            <span className="fas fa-edit"></span>
                          </button>
                        </td>
                        <td>
                          <button aria-label="Delete Round">
                            <span className="fas fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button
                id="roundsModeActionBtn"
                type="button"
                className="float-btn"
                onClick={() => setNewRound(true)}
              >
                <span
                  className="fas fa-calendar-plus fa-fw"
                  aria-hidden="true"
                ></span>
                New Round
              </button>
            </div>
          ) : (
            <AddRound setNewRound={setNewRound} setAddedRound={setAddedRound} />
          )}
        </>
      )}
    </>
  );
}

export default RoundsListing;
