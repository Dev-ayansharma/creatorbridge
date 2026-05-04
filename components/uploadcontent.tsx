"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  X,

  Tag,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

type Props = {
  workspaceId: string;
  mode?: "create" | "edit";
  initialData?: any;
  videoId?: string;
};

export default function UploadContent({
  workspaceId,
  mode = "create",
  initialData,
  videoId,
}: Props) {
  const [privacy, setPrivacy] = useState("public");
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || "");
      setPrivacy(initialData.privacy || "public");
      setTags(initialData.tags || []);
    }
  }, [mode, initialData]);

  const categories = [
    { id: "1", name: "Film & Animation" },
    { id: "10", name: "Music" },
    { id: "17", name: "Sports" },
    { id: "20", name: "Gaming" },
    { id: "22", name: "People & Blogs" },
    { id: "24", name: "Entertainment" },
    { id: "27", name: "Education" },
    { id: "28", name: "Science & Technology" },
  ];

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPrivacy("public");
    setTags([]);
    setInputTag("");
    setVideoFile(null);
    setThumbnailFile(null);
    router.back();
  };

const addTag = () => {
  const trimmed = inputTag.trim();

  if (!trimmed) return;

  if (tags.includes(trimmed)) return;

  setTags((prev) => [...prev, trimmed]);
  setInputTag("");
};

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (mode === "create" && !videoFile) {
      toast.error("Please upload a video");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      if (videoFile) formData.append("video", videoFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (category) formData.append("category", category);

      formData.append("workspace_id", workspaceId);
      formData.append("privacy", privacy);
      formData.append("tags", JSON.stringify(tags));

      if (mode === "edit") {
        const res = await axios.patch(`/api/video/update/${videoId}`,
          formData,
        );
       

        if (res.data.success) {
          toast.success("Video updated successfully");
          router.push("/edashboard");
        } else {
          toast.error(res.data.message || "Update failed");
        }
      } else {
        const res = await axios.post("/api/video/create", 
          formData
        );
      

        if (res.data.success) {
          toast.success("Uploaded successfully");
          router.push("/edashboard");
        } else {
          toast.error(res.data.message || "Upload failed");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .upload-cards-grid {
            grid-template-columns: 1fr !important;
          }

          .cat-privacy-grid {
            grid-template-columns: 1fr !important;
          }

       

        
        }
      `}</style>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Upload Content
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          Share your video with optimized metadata.
        </p>

        {/* Upload cards */}
        <div className="upload-cards-grid grid grid-cols-2 gap-4 mb-6">
          {/* Video */}
          <label className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center cursor-pointer">
            <Upload className="mx-auto mb-3 opacity-60" />
            <p className="text-sm font-medium">Upload Video</p>
            <p className="text-xs text-zinc-500">
              {videoFile ? videoFile.name : "MP4, MOV"}
            </p>
            <input
              type="file"
              hidden
              onChange={(e) =>
                setVideoFile(e.target.files?.[0] || null)
              }
            />
          </label>

          {/* Thumbnail */}
          <label className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center cursor-pointer">
            <ImageIcon className="mx-auto mb-3 opacity-60" />
            <p className="text-sm font-medium">Upload Thumbnail</p>
            <p className="text-xs text-zinc-500">
              {thumbnailFile ? thumbnailFile.name : "JPG, PNG"}
            </p>
            <input
              type="file"
              hidden
              onChange={(e) =>
                setThumbnailFile(e.target.files?.[0] || null)
              }
            />
          </label>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
          />

          {/* Category + Privacy */}
          <div className="cat-privacy-grid grid grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
            >
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              {["public", "private"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrivacy(p)}
                  className={`flex-1 p-3 rounded-lg border ${
                    privacy === p
                      ? "bg-zinc-800 border-zinc-600"
                      : "border-zinc-800"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <div className="flex gap-2">
              <input
             
  value={inputTag}
  onChange={(e) => setInputTag(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      addTag();
    }
  }}
 
                className="flex-1 p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
                placeholder="Add tag"
              />
            <button
  type="button"
  onClick={addTag}
  className="px-2 py-1 text-xs bg-white/10 rounded-md"
>
  Add
</button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-800 rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <X size={12} onClick={() => removeTag(tag)} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-4 flex justify-center gap-3">
        <button
          onClick={resetForm}
          className="px-5 py-2 border border-zinc-700 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-white text-black rounded-lg flex items-center gap-2 cursor-pointer"
        >
          {loading && <LoaderCircle className="animate-spin" size={14} />}
          {mode === "edit" ? "Update" : "Upload"}
        </button>
      </div>
    </div>
  );
}