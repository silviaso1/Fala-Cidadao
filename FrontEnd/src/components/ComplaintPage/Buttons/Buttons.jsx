
import { FaPlus } from 'react-icons/fa';
import './Buttons.scss'

function Buttons({ openModal }) {
  return (
    <div className="floating-buttons">
      <div className="fab" onClick={openModal}>
        <FaPlus />
      </div>
    </div>
  );
}

export default Buttons;