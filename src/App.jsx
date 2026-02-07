import React, { useEffect, useState } from 'react'
import { supabase } from './supabase/supabase.js'
import './App.css'

export default function App() {
  const [newTask, setnewTask] = useState({ title: "", description: "" })
  const [showData, setshowData] = useState([]);
  const [showtextArea, setshowtextArea] = useState(false);
  const [newDescription, setnewDescription] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, data } = await supabase.from("task_manager").insert([newTask]).select().single()
    if (error) {
      console.log("error in inserting data", error.message);
    } else {
      setnewTask({ title: "", description: "" })
      setshowData(prev => [...prev, data])
      console.log(data + " is entered")
    }
  }



  const updateTask = async (id) => {

    const { error } = await supabase.from("task_manager").update({ description: newDescription }).eq("id", id)
    if (error) {
      console.log("error in updating data", error.message);
    } else {
      setshowData(prev => prev.map(li => li.id === id ? { ...li, description: newDescription } : li))
      console.log("Successfully updated the data")
    }
  }
  const deleteTask = async (id) => {

    const { error, data } = await supabase.from("task_manager").delete().eq("id", id)
    if (error) {
      console.log("error in deleting data", error.message);
    } else {
      setnewTask({ title: "", description: "" })
      setshowData(prev => prev.filter(task => task.id !== id))
      console.log(data + " is deleted")
    }
  }


  useEffect(() => {

    const fetchData = async () => {
      const { error, data } = await supabase.from("task_manager").select('*');
      if (error) {
        console.log("error while fetching the data", error.message)

      } else {
        setshowData(data)
      }
    }

    fetchData()
    // updateTask()

  }, [])


  return (
    <div>
      <h1>
        <b>
          REACT TASK MANAGER
        </b>
      </h1>
      <form action="" onSubmit={handleSubmit}>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            value={newTask.title}
            onSubmit={handleSubmit}
            type="text"
            id="title"
            placeholder='Enter title'
            onChange={(e) =>
              setnewTask((prev) => (
                { ...prev, title: e.target.value }
              ))
            }
          />
        </div>

        <div>
          <label htmlFor="desc">Description: </label>
          <input
            value={newTask.description}
            onSubmit={handleSubmit}
            type="text"
            id="desc"
            placeholder='Enter description'
            onChange={(e) =>
              setnewTask((prev) => (
                { ...prev, description: e.target.value }
              ))
            }
          />
        </div>


        <button type='submit'>Submit</button>
      </form>

      <div>

        <h1>All Tasks</h1>
        <table border={1}>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Actions</td>

          </tr>
          {
            showData.map(
              (keys) => (<tr key={keys.id}>
                <td>{keys.title}</td>
                <td>{keys.description}</td>
                <td>
                  <button onClick={() => { setshowtextArea(true) }}>Edit</button>
                  {showtextArea &&
                    <>
                      <textarea
                        placeholder="edit the description"
                        onChange={(e) => setnewDescription(e.target.value)}
                      />
                      <button onClick={() => updateTask(keys.id) && setshowtextArea(false)}>Update</button>

                    </>
                  }
                  <button onClick={() => deleteTask(keys.id)}>Delete</button>
                </td>

              </tr>)
            )

          }
        </table>
      </div>


    </div>
  )
}