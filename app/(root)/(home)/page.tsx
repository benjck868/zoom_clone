import MeetingTypeList from "@/components/MeetingTypeList"

export default function HomePage() {
  const now = new Date()
  const date = (new Intl.DateTimeFormat('en-US', {dateStyle:'full'})).format(now)
  const time = now.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal ">Upcoming Meeting at: 12:30 PM</h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-7xl font-extrabold">
              {time}
            </h1>
            <p className="text-lg lg:text-2xl font-medium text-sky-1">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}
