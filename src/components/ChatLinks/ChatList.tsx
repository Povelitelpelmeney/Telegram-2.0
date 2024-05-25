import "./ChatList.scss"
import{
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
    useLocation
} from "react-router-dom";

let url = ""
type ChatProps= {
    chatId: string;
    img: string;
    lastMessage: string;
    chatName: string;
}
export default function ChatLink(props:ChatProps){
    return(
        // ...

        <Router>
            <div className="chats">
                <div className='chat-name'>
                    {props.lastMessage}
                </div>
                <NavLink to={url} >
                </NavLink>
            </div>
        </Router>
    )
}