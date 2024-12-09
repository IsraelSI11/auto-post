import Calendar from "@/components/calendar/Calendar";

export default function CreatePostPage(){
    return (
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-4">My Calendar</h1>
          <Calendar />
        </div>
      )
}