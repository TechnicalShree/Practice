import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [noOfEntries, setNoOfEntries] = useState(50);
  const [currPage, setCurrPage] = useState(1);

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

  function prevHandler() {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  }

  function nextHandler() {
    if (currPage < noOfTotalPages) {
      setCurrPage(currPage + 1);
    }
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
      </div>
      <table>
        <tbody>
          {entries.map((entry) => {
            if (entry.id < idxOfLastEntry) {
              return idxOfFirstEntry <= entry.id ? (
                <tr key={entry.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => editEnabled(e, entry)}
                    />
                  </td>
                  <td
                    contentEditable={entry.isEditable}
                    onInput={(e) => changeHandler(e.target.innerText, entry.id)}
                  >
                    {entry.Description}
                  </td>
                </tr>
              ) : null;
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <div className="pages">
        <span onClick={prevHandler}>Prev - </span>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => {
              setCurrPage(page);
            }}
            className={currPage === page ? "active" : ""}
          >{`${page} - `}</span>
        ))}
        <span onClick={nextHandler}>Next</span>
      </div>
    </>
  );
}

export default App;
