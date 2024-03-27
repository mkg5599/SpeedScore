import React, { useEffect, useState } from "react";
import { useRoundsContext } from "../context/RoundsContext";
import ViewEditRound from "../components/ViewEditRound";
import "../index.css";

function RoundsListing() {
  const { state, dispatch } = useRoundsContext();
  const [currentViewEditId, setCurrentViewEditId] = useState(0);
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
        />
      ) : (
        <div>
          <h1 class="mode-page-header">Rounds</h1>
          <div
            id="roundUpdated"
            class="toast-container hidden"
            role="alert"
            aria-atomic="true"
            aria-live="assertive"
          >
            <div id="roundUpdatedMsg" class="toast-text">
              New round was logged
            </div>
            <button
              id="roundUpdatedClose"
              type="button"
              class="btn-close toast-close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <table id="roundsTable" class="table table-hover">
            <caption id="roundsTableCaption" aria-live="polite">
              Rounds Table
            </caption>
            <thead class="table-light">
              <th
                scope="col"
                role="columnheader"
                class="sortable-header cell-align-middle"
                aria-sort="none"
              >
                <button
                  class="btn bg-transparent table-sort-btn"
                  aria-label="Sort ascending by date"
                >
                  <span class="fas fa-sort sort-icon"></span>
                </button>
                Date
              </th>
              <th
                scope="col"
                role="columnheader"
                class="sortable-header cell-align-middle"
                aria-sort="none"
              >
                <button
                  class="btn bg-transparent table-sort-btn"
                  aria-label="Sort ascending by course"
                >
                  <span class="fas fa-sort sort-icon"></span>
                </button>
                Course
              </th>
              <th
                scope="col"
                role="columnheader"
                class="sortable-header cell-align-middle"
                aria-sort="none"
              >
                <button
                  class="btn bg-transparent table-sort-btn"
                  aria-label="Sort ascending by score"
                >
                  <span class="fas fa-sort sort-icon"></span>
                </button>
                Score
              </th>
              <th scope="col" class="cell-align-middle">
                View/Edit...
              </th>
              <th scope="col" class="cell-align-middle">
                Delete
              </th>
            </thead>
            <tbody>
              {state?.rounds.length > 0 &&
                state?.rounds?.map((item) => (
                  <tr>
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
                        <span class="fas fa-eye"> </span>&nbsp;
                        <span class="fas fa-edit"></span>
                      </button>
                    </td>
                    <td>
                      <button aria-label="Delete Round">
                        <span class="fas fa-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button id="roundsModeActionBtn" type="button" class="float-btn">
            <span class="fas fa-calendar-plus fa-fw" aria-hidden="true"></span>
            New Round
          </button>
        </div>
      )}
    </>
  );
}

export default RoundsListing;
