"use client";

import { useEffect, useState } from "react";
import { Upload, Image as ImageIcon, X, Globe, Lock, Tag, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
    { id: "2", name: "Autos & Vehicles" },
    { id: "10", name: "Music" },
    { id: "15", name: "Pets & Animals" },
    { id: "17", name: "Sports" },
    { id: "20", name: "Gaming" },
    { id: "22", name: "People & Blogs" },
    { id: "23", name: "Comedy" },
    { id: "24", name: "Entertainment" },
    { id: "25", name: "News & Politics" },
    { id: "26", name: "Howto & Style" },
    { id: "27", name: "Education" },
    { id: "28", name: "Science & Technology" },
    { id: "29", name: "Nonprofits & Activism" },
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

    router.back()
  };

  const addTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputTag("");
    }
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

      // Only append if exists (IMPORTANT for PATCH)
      if (videoFile) formData.append("video", videoFile);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (category) formData.append("category", category);

      formData.append("workspace_id", workspaceId);
      formData.append("privacy", privacy);
      formData.append("tags", JSON.stringify(tags));

      if (mode === "edit") {

            const res = await fetch(`/api/video/update/${videoId}`, {
              method: "PATCH",
              body: formData,
            });
       

        const data = await res.json();

        if (data.success) {
          toast.success("Video updated successfully");
          router.push("/edashboard");
        } else {
          toast.error(data.message || "Update failed");
        }
      } else {
        const res = await fetch("/api/video/create", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          toast.success("Uploaded successfully");
           router.push("/edashboard");
        } else {
          toast.error(data.message || "Upload failed");
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "#18191b",
    border: "1px solid #262729",
    borderRadius: 10,
    color: "#f0f0f0",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    color: "#555",
    letterSpacing: "0.08em",
    marginBottom: 8,
    textTransform: "uppercase",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        color: "#f0f0f0",
        fontFamily: "'Geist', 'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .upload-cards-grid { grid-template-columns: 1fr !important; }
          .cat-privacy-grid  { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: #444; }
        input:focus, textarea:focus, select:focus { border-color: #444 !important; }
        .upload-card:hover { border-color: #3a3b3d !important; }
        .privacy-btn:hover { opacity: 0.85; }
        .tag-remove:hover { color: #aaa !important; }
        .cancel-btn:hover { border-color: #3a3b3d !important; color: #ccc !important; }
        .submit-btn:hover:not(:disabled) { background: #ffffff !important; }
        .add-tag-btn:hover { color: #bbb !important; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.75s linear infinite; }
      `}</style>

      {/* Page Content */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "clamp(24px, 4vw, 48px) clamp(16px, 4vw, 32px) 120px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 700,
              color: "#f0f0f0",
              margin: 0,
              letterSpacing: "-0.8px",
            }}
          >
            Upload Content
          </h1>
          <p style={{ color: "#666", marginTop: 10, fontSize: 13, lineHeight: 1.6 }}>
            Distribute your latest creations to your audience. Ensure your metadata is
            optimized for discovery across the Bridge network.
          </p>
        </div>

        {/* Upload Cards */}
        <div
          className="upload-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 36,
          }}
        >
          {/* Video Upload */}
          <label
            className="upload-card"
            style={{
              cursor: "pointer",
              background: "#18191b",
              border: "1px solid #262729",
              borderRadius: 14,
              padding: "40px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              minHeight: 180,
              transition: "border-color 0.15s",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#242527",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Upload size={22} color="#aaa" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e8e8", marginBottom: 4 }}>
                Upload Video
              </div>
              {videoFile ? (
                <div style={{ fontSize: 12, color: "#4ade80", wordBreak: "break-all", padding: "0 8px" }}>
                  {videoFile.name}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "#555" }}>MP4, MOV up to 10GB</div>
              )}
            </div>
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Thumbnail Upload */}
          <label
            className="upload-card"
            style={{
              cursor: "pointer",
              background: "#18191b",
              border: "1px solid #262729",
              borderRadius: 14,
              padding: "40px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              minHeight: 180,
              transition: "border-color 0.15s",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#242527",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ImageIcon size={22} color="#aaa" />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e8e8", marginBottom: 4 }}>
                Upload Thumbnail
              </div>
              {thumbnailFile ? (
                <div style={{ fontSize: 12, color: "#4ade80", wordBreak: "break-all", padding: "0 8px" }}>
                  {thumbnailFile.name}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "#555" }}>JPG, PNG up to 5MB</div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Title */}
          <div>
            <label style={labelStyle}>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your video a compelling name"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell your viewers what your video is about..."
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Category + Privacy */}
          <div
            className="cat-privacy-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              alignItems: "end",
            }}
          >
            {/* Category */}
            <div>
              <label style={labelStyle}>Category</label>
              <div style={{ position: "relative" }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    ...inputStyle,
                    padding: "14px 40px 14px 16px",
                    appearance: "none",
                    cursor: "pointer",
                    color: category ? "#f0f0f0" : "#555",
                  }}
                >
                  <option value="" disabled>Select a Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} style={{ background: "#18191b", color: "#f0f0f0" }}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    color: "#555",
                    fontSize: 12,
                  }}
                >
                  ▾
                </span>
              </div>
            </div>

            {/* Privacy */}
            <div>
              <label style={labelStyle}>Privacy Status</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["public", "private"] as const).map((opt) => (
                  <button
                    key={opt}
                    className="privacy-btn"
                    onClick={() => setPrivacy(opt)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: privacy === opt ? "1px solid #444" : "1px solid #262729",
                      background: privacy === opt ? "#242527" : "#18191b",
                      color: privacy === opt ? "#f0f0f0" : "#666",
                      fontSize: 13,
                      fontWeight: privacy === opt ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {opt === "public" ? <Globe size={14} /> : <Lock size={14} />}
                    {opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label style={labelStyle}>Tags</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#18191b",
                border: "1px solid #262729",
                borderRadius: 10,
                padding: "10px 14px",
                gap: 8,
                transition: "border-color 0.15s",
              }}
            >
              <input
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Add tags to help discovery (e.g., tech, vlog, cinematic)"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "#f0f0f0",
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                className="add-tag-btn"
                onClick={addTag}
                style={{
                  background: "#242527",
                  border: "none",
                  borderRadius: 6,
                  padding: "5px 8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "#888",
                  transition: "color 0.15s",
                }}
              >
                <Tag size={14} />
              </button>
            </div>

            {tags.length > 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: "#1e1f21",
                      border: "1px solid #2e2f31",
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 12,
                      color: "#bbb",
                      fontWeight: 500,
                    }}
                  >
                    #{tag}
                    <button
                      className="tag-remove"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        color: "#666",
                        display: "flex",
                        padding: 0,
                        lineHeight: 1,
                        transition: "color 0.15s",
                      }}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#000000",
          borderTop: "1px solid #1e1f21",
          padding: "14px clamp(16px, 4vw, 32px)",
          paddingLeft: "max(64px, clamp(16px, 4vw, 32px))",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 10,
          zIndex: 10,
        }}
      >

        <button
          className="cancel-btn"
          onClick={resetForm}
          disabled={loading}
          style={{
            padding: "11px 24px",
            borderRadius: 8,
            border: "1px solid #2a2b2d",
            background: "transparent",
            color: "#aaa",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          Cancel
        </button>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}

          style={{
            padding: "11px 28px",
            borderRadius: 8,
            border: "none",
            background: "#f0f0f0",
            color: "#111",
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            minWidth: 160,
            justifyContent: "center",
            transition: "all 0.15s",
          }}
        >
        {loading ? (
  <>
    <LoaderCircle size={15} className="spin" />
    {mode === "edit" ? "Updating..." : "Uploading..."}
  </>
) : mode === "edit" ? (
  "Update Video"
) : (
  "Save and Continue"
)}
        </button>
      </div>
    </div>
  );
}