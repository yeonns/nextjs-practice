import { useRouter } from "next/router"
import { Fragment } from "react"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import { getFilteredEvents } from "../../helpers/api-util"

function FilteredEventsPage(props) {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <p className='center'>Loading...</p>
  }

  if (props.hasError) {
    return (
      <Fragment>        
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>  
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = props.events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>        
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>  
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  } 

  const date = new Date(props.data.year, props.data.month - 1)

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const { params } = context

  const filterData = params.slug
  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) || 
    isNaN(numMonth) || 
    numYear > 2030 || 
    numYear < 2021 || 
    numMonth < 1 || 
    numMonth > 12
  ) {
    return {
      props: { 
        hasError: true,
      },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth, 
  })

  return {
    props: {
      events: filteredEvents,
      data: {
        year: numYear,
        month: numMonth,
      }
    }
  }
}

export default FilteredEventsPage