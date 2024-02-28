import { BsGear, BsChevronRight, BsPerson, BsDatabase, BsTools, BsInfoCircle, BsGlobe } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

export default function DropdownSetting({ handleOpenModal }) {
    const navigation = useNavigate();

    const navigateHomePage = () => {
        navigation('/authentication');
    }

    return (
        <>
            <div className=""
                style={{
                    marginBottom: 350, marginLeft: 200,
                    position: 'absolute',
                }}>
                <div tabIndex={0} role="button">
                    <ul tabIndex={0} className="dropdown-content z-[1] menu bg-white drop-shadow-lg border" style={{ width: 250, marginBottom: 2, borderRadius: 5, gap: 10, color: 'black', display: "block" }}>
                        <li>
                            <a ><BsPerson size={20} /> <div onClick={() => handleOpenModal()}>Account information</div></a>
                        </li>
                        <li>
                            <a ><BsGear size={20} /> Settings</a>
                        </li>
                        <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-right">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} tabIndex={0} role="button">
                                    <div style={{ display: 'flex', gap: 10, marginRight: 123 }}>
                                        <BsDatabase size={20} />
                                        Data
                                    </div>
                                    <div>
                                        <BsChevronRight size={15} color={"black"} />
                                        <div tabIndex={0} className="dropdown-content z-[1] shadow-md" style={{ backgroundColor: 'white', padding: 10, gap: 10 }}>
                                            <ul>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>Manage files</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-right">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} tabIndex={0} role="button">
                                    <div style={{ display: 'flex', gap: 10, marginRight: 120 }}>
                                        <BsTools size={20} />
                                        Tools
                                    </div>
                                    <div>
                                        <BsChevronRight size={15} color={"black"} />
                                        <div tabIndex={0} className="dropdown-content z-[1] shadow-md p-2" style={{ backgroundColor: 'white', padding: 10, gap: 10 }}>
                                            <ul>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>Send log files</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-right">
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}
                                    className="" tabIndex={0} role="button">
                                    <div style={{ display: 'flex', gap: 10, marginRight: 90 }}>
                                        <BsGlobe size={20} />
                                        Language
                                    </div>
                                    <div>
                                        <BsChevronRight size={15} color={"black"} />
                                        <div tabIndex={0} className="dropdown-content z-[1] shadow-md" style={{ backgroundColor: 'white', padding: 10, gap: 10 }}>
                                            <ul>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>Tiếng Việt</div>
                                                </li>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>English</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="dropdown dropdown-hover dropdown-right">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }} tabIndex={0} role="button">
                                    <div style={{ display: 'flex', gap: 10, width: 100, marginRight: 81 }}>
                                        <BsInfoCircle size={20} />
                                        About Zalo
                                    </div>
                                    <div>
                                        <BsChevronRight size={15} color={"black"} />
                                        <div tabIndex={0} className="dropdown-content z-[1] shadow-md" style={{ backgroundColor: 'white', padding: 10, gap: 10 }}>
                                            <ul>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>Version</div>
                                                </li>
                                                <li>
                                                    <div style={{ width: 140, height: 40 }}>Hepper Center</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <div style={{ width: "100%", borderBottomWidth: 0.5 }}></div>
                        <li>
                            <a style={{ color: 'red' }} onClick={navigateHomePage}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}