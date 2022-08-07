import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    (async () => {
      let data = await axios.get("https://api.publicapis.org/entries");
      let entries = data.data.entries.map((entry) => {
        return { Description: entry.Description, isEditable: false };
      });
      setEntries(entries);
      console.log(entries.length);
    })();
  }, []);

  function editEnabled(e, entry) {
    if (e.target.checked) {
      entries.forEach((entryOne) => {
        if (entryOne.Description === entry.Description) {
          entryOne.isEditable = true;
        }
      });
    } else {
      entries.forEach((entryOne) => {
        if (entryOne.Description === entry.Description) {
          entryOne.isEditable = false;
        }
      });
    }
    setEntries([...entries]);
  }

  return (
    <>
      <h1>Discription</h1>
      <table>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => editEnabled(e, entry)}
                />
              </td>
              <td contentEditable={entry.isEditable}>{entry.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
