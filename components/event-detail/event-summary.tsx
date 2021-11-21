import classes from './event-summary.module.css';

type Props = {
  title: string
}

function EventSummary({title}: Props) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;