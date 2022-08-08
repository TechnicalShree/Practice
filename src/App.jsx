import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Description from "./Description";
import NavigateToPage from "./NavigateToPage";

function App() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [noOfEntries, setNoOfEntries] = useState(50);

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

  const editEnabled = (e, entry) => {
    if (e.target.checked) {
      entries.forEach((entryOne) => {
        if (entryOne.id === entry.id) {
          entryOne.Description = entry.Description;
          entryOne.isEditable = true;
        }
      });
    } else {
      entries.forEach((entryOne) => {
        if (entryOne.id === entry.id) {
          entryOne.isEditable = false;
        }
      });
    }
    setEntries([...entries]);
  };

  const changeHandler = (text, id) => {
    entries.forEach((entry) => {
      if (entry.id === id) {
        entry.Description = text;
      }
    });
  };

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
                if (idxOfFirstEntry <= entry.id && entry.id < idxOfLastEntry) {
                  return (
                    <Description
                      key={entry.id}
                      entry={entry}
                      editEnabled={editEnabled}
                      changeHandler={changeHandler}
                    />
                  );
                }
                return null;
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
