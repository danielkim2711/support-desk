import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { FaArrowCircleLeft } from 'react-icons/fa';

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { name, email } = user;
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      product,
      description,
    };

    dispatch(createTicket(ticketData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Link to='/' className='btn btn-reverse btn-back'>
        <FaArrowCircleLeft />
      </Link>
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='email' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option>
              <option value='Macbook'>Macbook</option>
              <option value='Airpods'>Airpods</option>
              <option value='Apple TV'>Apple TV</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
