import React from "react";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const NotificationForm = ({ isOpen, type }) => {

    React.useEffect(() => {
        const modal = document.getElementById('NotiForm');
        if (modal) {
            if (isOpen) {
                modal.showModal();
            } else {
                modal.close();
            }
        }
    }, [isOpen]);

    return (
        <dialog id="NotiForm">
            <div className="card-body bg-white w-80 h-32 flex justify-center items-center gap-2">
                {type !== 'fail' ? <div className="flex flex-col justify-center items-center">
                    <BsCheckCircleFill size={30} color={'green'} />
                    <div style={{ fontSize: 15, color: "green", fontWeight: 'bold' }}>
                        Success
                    </div>
                </div> :
                    <div className="flex flex-col justify-center items-center">
                        <BsFillXCircleFill size={30} color={'red'} />
                        <div style={{ fontSize: 15, color: 'red', fontWeight: 'bold' }}>
                            Fail
                        </div>
                    </div>
                }
            </div>
        </dialog>
    );
};

export default NotificationForm;
