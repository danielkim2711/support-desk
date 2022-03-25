import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.tickets
  );
  const { _id, product, description, status, createdAt } = ticket;

  const { ticketId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: ${_id}
          <span className={`status status-${status}`}>{status}</span>
        </h2>
        <h3>Date Submitted: {new Date(createdAt).toLocaleString('en-NZ')}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{description}</p>
        </div>
      </header>
    </div>
  );
};

export default Ticket;
