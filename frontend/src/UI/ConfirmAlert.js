import React, { useRef, useLayoutEffect } from 'react';
import { Modal } from 'bootstrap';

// This Component is no longer in used. It is here only for future refernce

function ConformAlert({ showModalFlag }) {
    const displayClass = showModalFlag ? 'show' : 'hide';
   // const [toggleModal, setToggleModal] = useState(true);

   const modalRef = useRef();
    
    const showModal = () => {
        const modalEle = modalRef.current;
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        });
        bsModal.show();
    };
    
    const hideModal = () => {
        const modalEle = modalRef.current;
         modalRef.current = 'hide';
        const bsModal = Modal.getInstance(modalEle);
        bsModal.hide();
    };

    useLayoutEffect(() => {
         showModal();
    }, [showModalFlag]);

    // useLayoutEffect(() => {
    //     showModal();
    //     console.log('Hello');
    // }, []);
    
    return (
      <div className="confirmBoxModal">
        <div className={`modal fade ${displayClass}`} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" className="btn-close" onClick={hideModal} aria-label="Close" />
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                <button type="button" className="btn btn-primary">Understood</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ConformAlert;
