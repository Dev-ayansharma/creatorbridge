import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
 const data = [
  {
    title: "Step 1",
    number: 1,
    images: [
      "/upload-1.png",
   
    ],
    content: (images: string[]) => (
      <div>
        <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          The editor uploads the edited video directly to the platform along with
          title, description, tags, and thumbnail — no need to send files manually.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="video upload"
              className="h-20 w-full rounded-lg object-cover shadow md:h-44 lg:h-60"
            />
          ))}
        </div>
      </div>
    ),
  },

  {
    title: "Step 2",
    number: 2,
    images: [
      "/review-1.png",
      
    ],
    content: (images: string[]) => (
      <div>
        <p className="mb-8 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          The owner receives a notification and reviews the video inside the platform.
          They can check details, preview content, and decide whether to approve or reject it.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="video review"
              className="h-20 w-full rounded-lg object-cover shadow md:h-44 lg:h-60"
            />
          ))}
        </div>
      </div>
    ),
  },

  {
    title: "Step 3",
    number: 3,
    images: [
      "/publish-1.png",
    
    ],
    content: (images: string[]) => (
      <div>
        <p className="mb-4 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
          Once approved, the platform uploads the video directly to the owner's YouTube
          channel — securely and instantly.
        </p>

        <div className="mb-6 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
          <div>✅ No need to download/upload again</div>
          <div>✅ No sharing YouTube credentials</div>
          <div>✅ Faster and secure workflow</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="youtube publish"
              className="h-20 w-full rounded-lg object-cover shadow md:h-44 lg:h-60"
            />
          ))}
        </div>
      </div>
    ),
  },
];

  return (
    <div className="relative w-full overflow-clip" id="Howitworks">
      <Timeline
        data={data.map((item) => ({
          title: item.title,
          number: item.number,
          content: item.content(item.images),
        }))}
      />
    </div>
  );
}