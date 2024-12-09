interface CalendarHeaderProps {
    weekDates: Date[]
  }

export function CalendarHeader({ weekDates }: CalendarHeaderProps) {
    const daysOfWeek = [ 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab','Dom']

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 bg-muted">
      <div className="py-2 text-center text-sm font-medium border-r"></div>
      {weekDates.map((date, index) => (
        <div key={index} className="py-2 text-center text-sm font-semibold border-r last:border-r-0">
          <div>{daysOfWeek[date.getDay()]}</div>
          <div>{date.getDate()}</div>
        </div>
      ))}
    </div>
  )
  }
  
  