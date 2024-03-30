import React, { useEffect, useState } from "react";
import { useRoundsContext } from "../context/RoundsContext";
import ViewEditRound from "../components/ViewEditRound";
import "../index.css";
import AddRound from "../components/AddRound";
var arraySort = require("array-sort");

function RoundsListing() {
  const { state, dispatch } = useRoundsContext();
  const [roundsData, setRoundsData] = useState();
  const [currentViewEditId, setCurrentViewEditId] = useState(0);
  const [newRound, setNewRound] = useState(false);
  const [updatedRound, setUpdatedRound] = useState(false);
  const [addedRound, setAddedRound] = useState(false);
  const [currentSortKey, setCurrentSortKey] = useState({});
  const [deleteId, setDeleteId] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setRoundsData(state?.rounds);
  }, [currentViewEditId, state?.rounds]);

  useEffect(() => {}, [roundsData]);

  useEffect(() => {
    let tempData = searchAllData(searchValue);
    if (tempData && tempData?.length > 0) setRoundsData([...tempData]);
  }, [searchValue]);

  const sortData = async (key) => {
    currentSortKey[key] = currentSortKey[key] == "asc" ? "desc" : "asc";
    setCurrentSortKey({ ...currentSortKey });
    let sortedData = await arraySort(roundsData, key);
    if (currentSortKey[key] == "asc") {
      await setRoundsData([...sortedData]);
    } else if (currentSortKey[key] == "desc") {
      await setRoundsData([...sortedData.reverse()]);
    }
  };

  const deleteRound = async () => {
    const tempData = roundsData.filter((x) => x.roundNum != deleteId);
    await setRoundsData([...tempData]);
    dispatch({ type: "SET_ROUNDS", payload: tempData });
  };

  const searchAllData = (query) => {
    const searchTerm = query.toLowerCase();
    const results = state?.rounds?.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      );
    });
    return results;
  };

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
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  margin: "1%",
                }}
              >
                <label htmlFor="searchBox" style={{ alignSelf: "center" }}>
                  Search/Filter:
                </label>
                <input
                  id="searchInputRounds"
                  className="form-control centered"
                  type="text"
                  size="6"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ maxWidth: "25%", marginLeft: "2%" }}
                />
              </div>
              <table id="roundsTable" className="table table-hover">
                <caption id="roundsTableCaption" aria-live="polite">
                  {"Total " + `${roundsData?.length}` + " rounds"}
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
                        onClick={() => sortData("date")}
                      >
                        <span
                          className={
                            currentSortKey["date"] == "asc"
                              ? "fas fa-sort-amount-down-alt"
                              : currentSortKey["date"] == "desc"
                              ? "fas fa-sort-amount-down"
                              : "fas fa-sort"
                          }
                        ></span>
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
                        onClick={() => sortData("course")}
                      >
                        <span
                          className={
                            currentSortKey["course"] == "asc"
                              ? "fas fa-sort-amount-down-alt"
                              : currentSortKey["course"] == "desc"
                              ? "fas fa-sort-amount-down"
                              : "fas fa-sort"
                          }
                        ></span>
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
                        onClick={() => sortData("SGS")}
                      >
                        <span
                          className={
                            currentSortKey["SGS"] == "asc"
                              ? "fas fa-sort-amount-down-alt"
                              : currentSortKey["SGS"] == "desc"
                              ? "fas fa-sort-amount-down"
                              : "fas fa-sort"
                          }
                        ></span>
                      </button>
                      Score
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
                        onClick={() => sortData("distance")}
                      >
                        <span
                          className={
                            currentSortKey["distance"] == "asc"
                              ? "fas fa-sort-amount-down-alt"
                              : currentSortKey["distance"] == "desc"
                              ? "fas fa-sort-amount-down"
                              : "fas fa-sort"
                          }
                        ></span>
                      </button>
                      Distance
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
                  {roundsData?.length > 0 &&
                    roundsData?.map((item) => (
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
                          {item.distance && item.distance != ""
                            ? parseFloat(item.distance).toFixed(2)
                            : 0}
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
                          <button
                            aria-label="Delete Round"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => setDeleteId(item.roundNum)}
                          >
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

              <div class="modal" tabindex="-1" id="exampleModal">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Delete Round?</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <p>Do you really want to delete that round?</p>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        No, Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={() => deleteRound()}
                      >
                        Yes, Delete Round
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
