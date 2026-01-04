
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ViewPaste = () => {

  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];

  return (
    <div>
       <div className='flex flex-row gap-7 place-content-between'>
        <input
          type="text"
          placeholder="Enter your Title here..."
          className="p-2 rounded-2xl mt-3 w-[900px] border-4 pl-4"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button className="p-2 rounded-2xl mt-3" onClick={createPaste}>
          {
            pasteId ? "update my paste" : "create my paste"
          }

        </button> */}
      </div>
      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 min-w-[900px] p-4 border-4'
          value={paste.content}
          placeholder='enter content.....'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        />
      </div>
    </div>
  )
}

export default ViewPaste
