import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function handleShare(paste) {
    const shareData = {
      title: paste.title,
      text: paste.content,
    }

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Sharing cancelled"))
    } else {
      navigator.clipboard.writeText(paste.content)
      toast.success("Content copied for sharing")
    }
  }

  return (
    <div>
      {/* Search */}
      <input
        className="p-2 rounded-2xl w-[900px] mt-5 border-4"
        type="search"
        placeholder="search your paste here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Paste Cards */}
      <div className="flex flex-col gap-5 mt-5">
        {filterData.length > 0 && filterData.map((paste) => {
          return (
            <div
              key={paste?._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 p-5"
            >
              {/* Title */}
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {paste.title}
              </div>

              {/* Content */}
              <div className="text-gray-600 text-sm bg-gray-50 rounded-xl p-3 max-h-32 overflow-auto mb-4">
                {paste.content}
              </div>

              {/* Actions */}
              <div className="flex flex-row gap-3 justify-between flex-wrap mb-3">
                <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                  <a href={`/?pasteId=${paste?._id}`}>
                    Edit
                  </a>
                </button>

                <Link to={`/pastes/${paste?._id}`}>
                  <button className="px-3 py-1 text-sm rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                    View
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Delete
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("copied to Clipboard")
                  }}
                  className="px-3 py-1 text-sm rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200"
                >
                  Copy
                </button>

                <button
                  onClick={() => handleShare(paste)}
                  className="px-3 py-1 text-sm rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                >
                  Share
                </button>
              </div>

              {/* Date */}
              <div className="text-xs text-gray-400 text-right">
                {paste.createdAt}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Paste
