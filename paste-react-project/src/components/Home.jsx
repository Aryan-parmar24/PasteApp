import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPaste, updatePaste } from '../redux/pasteSlice.js';
import { set } from 'react-hook-form';

const Home = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch=useDispatch();
  const allPastes=useSelector((state)=>state.paste.pastes);

  useEffect(() => {
      if (pasteId) {
        const pasteToEdit = allPastes.find((p) => p._id === pasteId);
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }, [pasteId]);

  function createPaste() {
    const paste={
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }
    if(pasteId){
      //update
      dispatch(updatePaste(paste));
    }
    else{
      //create
      dispatch(addToPaste(paste));

    }
    //after create or update
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    
    <div>
      <div className='flex flex-row gap-7 place-content-between w-[900px]'>
        <input
          type="text"
          placeholder="Enter your Title here..."
          className="p-2 rounded-2xl mt-3 w-[68%] border-4 pl-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="p-2 rounded-2xl mt-3" onClick={createPaste}>
          {
            pasteId ? "update my paste" : "create my paste"
          }

        </button>
      </div>
      
      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 min-w-[900px] p-4 border-4'
          value={value}
          placeholder='enter content.....'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home
