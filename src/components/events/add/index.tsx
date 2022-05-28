import React, { useState } from "react";

interface props {
  showEvent: any;
  date: any;
  update: any;
}

export const Add: React.FC<props> = ({ showEvent, date, update }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    // input validation
    if (title && description) {
      setError(false);
      //if local storage data is not present then data = []
      const eventList = JSON.parse(localStorage.getItem("custom-event")) || [];
      //object create from input
      const customEvent = {
        title: title,
        description: description,
        date: date.date + " " + date.month + ", " + date.year,
      };
      //store object to localstorage array
      localStorage.setItem(
        "custom-event",
        JSON.stringify([...eventList, customEvent])
      );

      showEvent();
      //reset input field
      setTitle("");
      setDescription("");
      update();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='block p-2 rounded-md border w-full outline-none'
            placeholder='Enter title here'
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            className='block p-2 rounded-md border w-full outline-none'
            placeholder='Enter description here'
            required
          />
        </div>
        {error && (
          <div className='text-center text-red-500'>
            Enter title and description
          </div>
        )}
      </div>

      <div className='grid mt-4 grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <button
            onClick={showEvent}
            className=' bg-red-500 w-full text-center py-2 text-white rounded-lg '
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className=' bg-blue-500 w-full text-center py-2 text-white rounded-lg '
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
