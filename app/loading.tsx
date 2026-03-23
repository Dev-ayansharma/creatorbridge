
import { LoaderOne } from "@/components/ui/loader";


export default function Loading() {
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
  
        <LoaderOne/>
      </div>
    </div>
  );

}
