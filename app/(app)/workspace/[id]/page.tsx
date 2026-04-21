"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UploadContent from "@/components/uploadcontent";

export default function CheckVideo() {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<any>(null);

  const fetchVideo = async () => {
    try {
      const res = await axios.get("/api/video/read", {
        params: { workspaceid: params.id },
      });

      console.log(res.data.data)

      if (res.data.success) {
        setVideo(res.data.data);
      } else {
        setVideo(null);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);


  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }


  if (user?.role === "EDITOR") {
    return video ? (
      <div className="text-center mt-10">
        <p className="text-green-600 font-semibold">
          Video already uploaded ✅
        </p>
      </div>
    ) : (
      <UploadContent workspaceId={params.id} />
    );
  }

  // 🧑‍💼 OWNER VIEW
  if (user?.role === "OWNER") {
    return video ? (
      <div className="text-center mt-10">
        <p className="font-semibold text-blue-600">
          Review the uploaded video
        </p>
        {/* You can add buttons here */}
        <div className="mt-4 flex justify-center gap-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded">
            Accept
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Reject
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center mt-10 text-gray-500">
        No video uploaded yet. Waiting for editor...
      </p>
    );
  }
  return (
    <p className="text-center mt-10 text-red-500">
      Unauthorized or unknown role
    </p>
  );
}







// import { useState } from "react";
// import { Upload, Image as ImageIcon, X } from "lucide-react";

// export default function UploadContent() {
//   const [privacy, setPrivacy] = useState("public");
//   const [tags, setTags] = useState<string[]>([]);
//   const [inputTag, setInputTag] = useState("");
//   const [title,setTitle] = useState("")
//   const [description,setDescription] = useState("")
//   const [video,setVideo] = useState("")
//   const [thumbnail,setthumbnail] = useState("")
//   const addTag = () => {
//     if (inputTag.trim() && !tags.includes(inputTag)) {
//       setTags([...tags, inputTag.trim()]);
//       setInputTag("");
//     }
//   };

//   const removeTag = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };



//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white px-4 py-8 flex justify-center">
//       <div className="w-full max-w-3xl">

//         {/* HEADER */}
//         <div className="mb-8 text-center sm:text-left">
//           <h1 className="text-2xl sm:text-3xl font-semibold">
//             Upload Content
//           </h1>
//           <p className="text-gray-400 mt-2 text-sm">
//             Share your content and optimize it for reach.
//           </p>
//         </div>

//         {/* UPLOAD BOXES */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

//           <div className="group bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 text-center hover:border-zinc-600 hover:bg-zinc-900 transition cursor-pointer">
//             <Upload className="mx-auto mb-2 text-gray-400 group-hover:text-white transition" />
//             <p className="text-sm font-medium">Upload Video</p>
//             <span className="text-xs text-gray-500">
//               MP4, MOV up to 10GB
//             </span>
//           </div>

//           <div className="group bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 text-center hover:border-zinc-600 hover:bg-zinc-900 transition cursor-pointer">
//             <ImageIcon className="mx-auto mb-2 text-gray-400 group-hover:text-white transition" />
//             <p className="text-sm font-medium">Upload Thumbnail</p>
//             <span className="text-xs text-gray-500">
//               JPG, PNG up to 5MB
//             </span>
//           </div>
//         </div>

//         {/* FORM */}
//         <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-5 sm:p-6 space-y-6">

//           {/* TITLE */}
//           <div>
//             <label className="text-xs text-gray-400">TITLE</label>
//             <input
//               className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
//               placeholder="Give your video a compelling name"
//             />
//           </div>

//           {/* DESCRIPTION */}
//           <div>
//             <label className="text-xs text-gray-400">DESCRIPTION</label>
//             <textarea
//               rows={4}
//               className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
//               placeholder="Tell viewers what your video is about..."
//             />
//           </div>

//           {/* CATEGORY + PRIVACY */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//             <div>
//               <label className="text-xs text-gray-400">CATEGORY</label>
//               <input className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-sm"/>
                
              
//             </div>

//             <div>
//               <label className="text-xs text-gray-400">PRIVACY</label>

//               <div className="flex mt-2 bg-zinc-800 p-1 rounded-lg">
//                 <button
//                   onClick={() => setPrivacy("public")}
//                   className={`flex-1 py-2 rounded-md text-sm transition ${
//                     privacy === "public"
//                       ? "bg-white text-black"
//                       : "text-gray-400 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Public
//                 </button>

//                 <button
//                   onClick={() => setPrivacy("private")}
//                   className={`flex-1 py-2 rounded-md text-sm transition ${
//                     privacy === "private"
//                       ? "bg-white text-black"
//                       : "text-gray-400 hover:bg-zinc-700"
//                   }`}
//                 >
//                   Private
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* TAGS */}
//           <div>
//             <label className="text-xs text-gray-400">TAGS</label>

//             <div className="flex flex-col sm:flex-row gap-2 mt-2">
//               <input
//                 value={inputTag}
//                 onChange={(e) => setInputTag(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && addTag()}
//                 className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-sm"
//                 placeholder="Add tags (e.g., tech, vlog)"
//               />

//               <button
//                 onClick={addTag}
//                 className="px-4 py-2 bg-white text-black rounded-lg text-sm hover:opacity-90 transition"
//               >
//                 Add
//               </button>
//             </div>

//             <div className="flex flex-wrap gap-2 mt-3">
//               {tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-3 py-1 bg-zinc-800 rounded-full text-xs sm:text-sm flex items-center gap-1 max-w-full"
//                 >
//                   <span className="break-all">#{tag}</span>
//                   <button
//                     onClick={() => removeTag(tag)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <X size={12} />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
//           <button className="w-full sm:w-auto px-5 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition text-sm">
//             Cancel
//           </button>

//           <button className="w-full sm:w-auto px-5 py-2 bg-white text-black rounded-lg hover:opacity-90 transition text-sm font-medium">
//             Save & Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }