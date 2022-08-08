import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Description from "./Description";
import NavigateToPage from "./NavigateToPage";

function App() {
  const [entries, setEntries] = useState([]);
  const [noOfEntries, setNoOfEntries] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      let data = await axios.get("https://api.publicapis.org/entries");
      let entries = data.data.entries.map((entry, idx) => {
        return {
          Description: entry.Description,
          isEditable: false,
          id: idx + 1,
        };
      });
      setEntries(entries);
    })();
  }, []);

  const noOfTotalPages = Math.ceil(entries.length / noOfEntries);
  const pages = [...Array(noOfTotalPages + 1).keys()].slice(1);

  const idxOfLastEntry = currPage * noOfEntries;
  const idxOfFirstEntry = idxOfLastEntry - noOfEntries;

  function editEnabled(e, entry) {
    let modifiedEntries = [];
    if (e.target.checked) {
      modifiedEntries = entries.map((entryOne) => {
        if (entryOne.id === entry.id) {
          return {
            Description: entry.Description,
            isEditable: true,
            id: entryOne.id,
          };
        } else {
          return {
            Description: entryOne.Description,
            isEditable: false,
            id: entryOne.id,
          };
        }
      });
    } else {
      modifiedEntries = entries.map((entryOne) => {
        return {
          Description: entryOne.Description,
          isEditable: false,
          id: entryOne.id,
        };
      });
    }
    setEntries([...modifiedEntries]);
  }

  function changeHandler(text, id) {
    entries.forEach((entry) => {
      if (entry.id === id) {
        entry.Description = text;
      }
    });
  }

  return (
    <>
      <h1>Discription</h1>
      <div className="setPage">
        <select
          name="setPage"
          id="setPage"
          onChange={(e) => {
            setNoOfEntries(e.target.value);
            setCurrPage(1);
          }}
        >
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
        </select>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <table>
        <tbody>
          {search === ""
            ? entries.map((entry) => {
                if (entry.id < idxOfLastEntry) {
                  return idxOfFirstEntry <= entry.id ? (
                    <Description
                      key={entry.id}
                      entry={entry}
                      editEnabled={editEnabled}
                      changeHandler={changeHandler}
                    />
                  ) : null;
                } else {
                  return null;
                }
              })
            : entries
                .filter((entry) => {
                  return entry.Description.indexOf(search) !== -1;
                })
                .map((entry) => (
                  <Description
                    key={entry.id}
                    entry={entry}
                    editEnabled={editEnabled}
                    changeHandler={changeHandler}
                  />
                ))}
        </tbody>
      </table>
      {search === "" ? (
        <NavigateToPage
          pages={pages}
          currPage={currPage}
          noOfTotalPages={noOfTotalPages}
          setCurrPage={setCurrPage}
        />
      ) : null}
    </>
  );
}

export default App;
