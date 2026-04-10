"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
type Editor = {
  _id: string;
  username: string;
  email: string;
};

export default function CreateWorkspace() {
  const [name, setName] = useState("");
  const [editors, setEditors] = useState<Editor[]>([]);
  const [filteredEditors, setFilteredEditors] = useState<Editor[]>([]);
  const [selectedEditor, setSelectedEditor] = useState<Editor | null>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchEditors = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/alleditor");
        const data = await res.json();
        
        if (data.success) {
          setEditors(data.data.editors);
          setFilteredEditors(data.data.editors);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEditors();
  }, []);

  useEffect(() => {
    const filtered = editors.filter((e) =>
      e.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEditors(filtered);
  }, [search, editors]);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  const handleSubmit = async () => {
    if (!name || !selectedEditor) return;

    await fetch("/api/workspace/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        editorid: selectedEditor._id,
      }),
    });

   
    setName("");
    setSelectedEditor(null);
    toast.success("the worspace is created")
    router.push("/workspace")
    
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-10">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-5xl font-semibold mb-6">Make workspace</h1>

          <p className="text-white/50 max-w-md mb-10">
            Designate a dedicated area for your creative collaborative efforts and asset management.
          </p>

          {/* NAME */}
          <div className="mb-10">
            <label className="text-xs text-white/40 tracking-widest mb-3 block">
              NAME OF WORKSPACE
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Q4 Marketing Campaign"
              className="w-full bg-black border-b border-white/10 py-3 text-lg focus:outline-none focus:border-white/30 placeholder:text-white/30"
            />
          </div>

          {/* DROPDOWN */}
          <div className="mb-14" ref={dropdownRef}>
            <label className="text-xs text-white/40 tracking-widest mb-3 block">
              ASSIGNING TO
            </label>

            {/* SELECT BOX */}
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 cursor-pointer hover:border-white/20 transition"
            >
              {selectedEditor ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    {selectedEditor.username[0].toUpperCase()}
                  </div>
                  <span>{selectedEditor.username}</span>
                </div>
              ) : (
                <span className="text-white/50 text-sm">
                  Select team or creators
                </span>
              )}

              <span className="text-white/40">⌄</span>
            </div>

            {/* DROPDOWN PANEL */}
            {open && (
              <div className="mt-2 bg-black border border-white/10 rounded-lg shadow-lg overflow-hidden">

                {/* SEARCH */}
                <div className="p-3 border-b border-white/10">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search editors..."
                    className="w-full bg-black text-sm outline-none placeholder:text-white/30"
                  />
                </div>

                {/* LIST */}
                <div className="max-h-56 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 flex justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : filteredEditors.length > 0 ? (
                    filteredEditors.map((editor) => (
                      <div
                        key={editor._id}
                        onClick={() => {
                          setSelectedEditor(editor);
                          setOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-white/5 cursor-pointer flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">
                          {editor.username[0].toUpperCase()}
                        </div>
                        <span>{editor.username}</span>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-white/40">
                      No editors found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="flex items-center gap-4 text-lg font-medium group"
          >
            <span>Make workspace</span>

            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-1 transition">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="hidden md:flex justify-center">
          <div className="w-[320px] h-[420px] bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.05)]" />
        </div>
      </div>
    </div>
  );
}